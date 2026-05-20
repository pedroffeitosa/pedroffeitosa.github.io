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
