const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('--- Starting Build Pipeline ---');

const cssSrc = path.join(__dirname, 'style.css');
const cssDest = path.join(__dirname, 'style.min.css');
const jsSrc = path.join(__dirname, 'script.js');
const jsDest = path.join(__dirname, 'script.min.js');

try {
  // 1. Minify CSS using clean-css-cli
  console.log('Minifying CSS (style.css -> style.min.css)...');
  execSync(`npx -y clean-css-cli "${cssSrc}" -o "${cssDest}"`, { stdio: 'inherit' });
  console.log('CSS Minification Completed!');

  // 2. Minify JS using terser
  console.log('Minifying JavaScript (script.js -> script.min.js)...');
  execSync(`npx -y terser "${jsSrc}" -o "${jsDest}" --compress --mangle`, { stdio: 'inherit' });
  console.log('JS Minification Completed!');

  // 3. Inline CSS in index.html
  console.log('Inlining minified CSS into index.html...');
  const htmlPath = path.join(__dirname, 'index.html');
  let htmlContent = fs.readFileSync(htmlPath, 'utf8');
  
  const cssContent = fs.readFileSync(cssDest, 'utf8');
  const styleTag = `<!-- STYLE_PLACEHOLDER --><style id="main-style">${cssContent}</style><!-- /STYLE_PLACEHOLDER -->`;
  
  const placeholderRegex = /<!-- STYLE_PLACEHOLDER -->[\s\S]*?<!-- \/STYLE_PLACEHOLDER -->/;
  if (placeholderRegex.test(htmlContent)) {
    htmlContent = htmlContent.replace(placeholderRegex, styleTag);
    fs.writeFileSync(htmlPath, htmlContent, 'utf8');
    console.log('CSS successfully inlined!');
  } else {
    console.warn('Warning: STYLE_PLACEHOLDER comment not found in index.html. CSS not inlined.');
  }

  console.log('--- Build Pipeline Completed Successfully! ---');
  
  // Print sizes
  const cssSrcSize = fs.statSync(cssSrc).size;
  const cssDestSize = fs.statSync(cssDest).size;
  const jsSrcSize = fs.statSync(jsSrc).size;
  const jsDestSize = fs.statSync(jsDest).size;
  
  console.log(`\nSize Summary:`);
  console.log(`- CSS: ${cssSrcSize} bytes -> ${cssDestSize} bytes (reduced by ${Math.round((1 - cssDestSize / cssSrcSize) * 100)}%)`);
  console.log(`- JS:  ${jsSrcSize} bytes -> ${jsDestSize} bytes (reduced by ${Math.round((1 - jsDestSize / jsSrcSize) * 100)}%)`);

} catch (error) {
  console.error('\nBuild Pipeline Failed!');
  console.error(error.message);
  process.exit(1);
}
