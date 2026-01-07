document.addEventListener("DOMContentLoaded", () => {
    // --- Copy Email Logic ---
    const copyBtn = document.getElementById("copy-email-btn");
    const copyStatus = document.getElementById("copy-status");

    if (copyBtn) {
        copyBtn.addEventListener("click", () => {
            navigator.clipboard.writeText("jppfeitosa@gmail.com")
                .then(() => {
                    if (copyStatus) {
                        copyStatus.style.display = "inline";
                        setTimeout(() => {
                            copyStatus.style.display = "none";
                        }, 1400);
                    }
                })
                .catch(err => console.error('Failed to copy text: ', err));
        });
    }

    // --- Experience Details Toggle ---
    const expButtons = document.querySelectorAll(".exp-toggle-btn");

    expButtons.forEach(btn => {
        // Set initial ARIA state
        btn.setAttribute("aria-expanded", "false");

        btn.addEventListener("click", () => {
            const targetId = btn.dataset.target;
            const target = document.getElementById(targetId);

            if (target) {
                const isOpen = target.style.display === "block";
                target.style.display = isOpen ? "none" : "block";
                btn.textContent = isOpen ? "+" : "-";
                // Update ARIA state
                btn.setAttribute("aria-expanded", !isOpen);
            }
        });
    });

    // --- Theme Toggle Logic ---
    const themeToggle = document.getElementById("theme-toggle");

    const setTheme = (theme) => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    };

    const initTheme = () => {
        const saved = localStorage.getItem("theme");
        if (saved) {
            setTheme(saved);
        } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            setTheme("dark");
        }
    };

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const current = document.documentElement.getAttribute("data-theme") || "light";
            setTheme(current === "dark" ? "light" : "dark");
        });
    }

    initTheme();

    // --- Shortcut Modal Keyboard Listener ---
    const shortcutModal = document.getElementById('shortcut-modal');
    const closeShortcutModal = document.getElementById('close-shortcut-modal');

    const toggleModal = (show) => {
        if (shortcutModal) {
            shortcutModal.style.display = show ? 'flex' : 'none';
            if (show && closeShortcutModal) {
                closeShortcutModal.focus();
            }
        }
    };

    document.addEventListener('keydown', (e) => {
        // '?' key
        if (e.key === '?' && !e.ctrlKey && !e.altKey && !e.metaKey && !e.shiftKey) {
            if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
                toggleModal(true);
                e.preventDefault();
            }
        }
        // Shift + ? or / (standard help shortcut)
        if ((e.key === '?' && e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey) || (e.key === '/' && e.shiftKey)) {
            toggleModal(true);
            e.preventDefault();
        }
        // Escape to close
        if (e.key === 'Escape') {
            toggleModal(false);
        }
    });

    if (closeShortcutModal) {
        closeShortcutModal.addEventListener('click', () => toggleModal(false));
    }

    // --- Scroll-to-Top Button Logic ---
    const scrollBtn = document.getElementById("scroll-top-btn");

    window.addEventListener("scroll", () => {
        if (!scrollBtn) return;
        if (window.scrollY > 180) {
            scrollBtn.style.display = "flex";
        } else {
            scrollBtn.style.display = "none";
        }
    });

    if (scrollBtn) {
        scrollBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
    // --- TERMINAL LOGIC ---
    const terminalOverlay = document.getElementById('terminal-overlay');
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');
    const closeTerminalBtn = document.getElementById('close-terminal');

    // Toggle Terminal visibility
    const toggleTerminal = (show) => {
        if (!terminalOverlay) return;
        terminalOverlay.style.display = show ? 'flex' : 'none';
        if (show) {
            terminalInput.value = '';
            terminalInput.focus();
        }
    };

    // Close on button click
    if (closeTerminalBtn) {
        closeTerminalBtn.addEventListener('click', () => toggleTerminal(false));
    }

    // Close on outside click (optional, maybe keep it modal-like)
    if (terminalOverlay) {
        terminalOverlay.addEventListener('click', (e) => {
            if (e.target === terminalOverlay) {
                toggleTerminal(false);
            }
        });
    }

    // Keyboard shortcut to open (Backtick ` or Ctrl+K)
    document.addEventListener('keydown', (e) => {
        // Toggle with Backtick (`)
        if (e.key === '`' && !e.ctrlKey && !e.altKey && !e.metaKey) {
            e.preventDefault();
            const isVisible = terminalOverlay.style.display === 'flex';
            toggleTerminal(!isVisible);
        }
        // Toggle with Ctrl+K
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const isVisible = terminalOverlay.style.display === 'flex';
            toggleTerminal(!isVisible);
        }
    });

    // Command Processing
    const commands = {
        help: {
            desc: 'List available commands',
            exec: () => {
                let output = 'Available commands:\n';
                for (const [cmd, details] of Object.entries(commands)) {
                    output += `  - ${cmd.padEnd(10)} : ${details.desc}\n`;
                }
                return output;
            }
        },
        whoami: {
            desc: 'Display user info',
            exec: () => "User: Visitor\nRole: Guest\nAccess Level: Read-Only\n\nBio: Full Stack Software Engineer & LLM Trainer. Specialized in React, Node.js, and AI."
        },
        skills: {
            desc: 'List technical skills',
            exec: () => `
[FRONTEND]
- React, TypeScript, Tailwind, Preact, HTML/CSS
[BACKEND]
- Node.js, PostgreSQL, MongoDB, AWS (Lambda, S3)
[AI/ML]
- LLM Training (RLHF), Prompt Engineering, Data Analysis
[OTHER]
- Scrum Master, QA, E-commerce (Deco, VTEX)
            `.trim()
        },
        projects: {
            desc: 'List featured projects',
            exec: () => `
1. <a href="#" target="_blank">AmeoPet</a> - Pet Care Management (React/Mongo)
2. <a href="#" target="_blank">MCPWeather</a> - Custom Data Protocol (TS/Node)
3. <a href="#" target="_blank">Chess Engine</a> - Ruby Object-Oriented Design
            `.trim()
        },
        contact: {
            desc: 'Display contact info',
            exec: () => `
Email: <a href="mailto:jppfeitosa@gmail.com">jppfeitosa@gmail.com</a>
LinkedIn: <a href="https://www.linkedin.com/in/pedroffeitosa/" target="_blank">in/pedroffeitosa</a>
GitHub: <a href="https://github.com/pedroffeitosa" target="_blank">pedroffeitosa</a>
            `.trim()
        },
        clear: {
            desc: 'Clear terminal output',
            exec: () => {
                terminalOutput.innerHTML = '';
                return null; // Return null to prevent printing anything
            }
        },
        date: {
            desc: 'Show current date/time',
            exec: () => new Date().toString()
        },
        exit: {
            desc: 'Close terminal',
            exec: () => {
                toggleTerminal(false);
                return 'Session closed...';
            }
        }
    };

    const processCommand = (cmdStr) => {
        const cleanCmd = cmdStr.trim().toLowerCase();
        if (!cleanCmd) return;

        // Create log entry
        const logEntry = document.createElement('div');
        logEntry.className = 'cmd-logs';

        const cmdLine = document.createElement('div');
        cmdLine.className = 'cmd-command';
        cmdLine.textContent = `visitor@pedroffeitosa:~$ ${cmdStr}`; // Keep original case for display
        logEntry.appendChild(cmdLine);

        // Process command
        if (commands[cleanCmd]) {
            const response = commands[cleanCmd].exec();
            if (response !== null) {
                const respLine = document.createElement('div');
                respLine.className = 'cmd-response';
                respLine.innerHTML = response.replace(/\n/g, '<br>'); // Simple formatting
                logEntry.appendChild(respLine);
            }
        } else {
            const errorLine = document.createElement('div');
            errorLine.className = 'cmd-response cmd-error';
            errorLine.textContent = `Command not found: ${cleanCmd}. Type 'help' for options.`;
            logEntry.appendChild(errorLine);
        }

        terminalOutput.appendChild(logEntry);
        // Scroll to bottom
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    };

    if (terminalInput) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                processCommand(terminalInput.value);
                terminalInput.value = '';
            }
        });
    }

    // --- System Status & Uptime Logic ---
    const uptimeElement = document.getElementById('uptime-counter');
    const commitDateElement = document.getElementById('commit-date');
    const startTime = Date.now();

    const updateUptime = () => {
        if (!uptimeElement) return;
        const now = Date.now();
        const diff = now - startTime;

        const seconds = Math.floor((diff / 1000) % 60).toString().padStart(2, '0');
        const minutes = Math.floor((diff / (1000 * 60)) % 60).toString().padStart(2, '0');
        const hours = Math.floor((diff / (1000 * 60 * 60))).toString().padStart(2, '0');

        uptimeElement.textContent = `UPTIME: ${hours}:${minutes}:${seconds}`;
    };

    setInterval(updateUptime, 1000);
    updateUptime(); // Initial call

    // --- Fetch Last Commit Date ---
    const fetchLastCommit = async () => {
        if (!commitDateElement) return;

        try {
            // Check localStorage first to avoid rate limits
            const cachedCommit = localStorage.getItem('last_commit_date');
            const cachedTimestamp = localStorage.getItem('last_commit_timestamp');
            const now = Date.now();

            // Use cache if less than 1 hour old
            if (cachedCommit && cachedTimestamp && (now - parseInt(cachedTimestamp) < 1000 * 60 * 60)) {
                commitDateElement.textContent = cachedCommit;
                return;
            }

            const repo = 'pedroffeitosa/pedroffeitosa.github.io';
            const response = await fetch(`https://api.github.com/repos/${repo}/commits?per_page=1`);

            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();
            if (data && data.length > 0) {
                const date = new Date(data[0].commit.author.date);
                // Format: YYYY-MM-DD HH:MM
                const formattedDate = date.getFullYear() + '-' +
                    (date.getMonth() + 1).toString().padStart(2, '0') + '-' +
                    date.getDate().toString().padStart(2, '0') + ' ' +
                    date.getHours().toString().padStart(2, '0') + ':' +
                    date.getMinutes().toString().padStart(2, '0');

                commitDateElement.textContent = formattedDate;

                // Cache the result
                localStorage.setItem('last_commit_date', formattedDate);
                localStorage.setItem('last_commit_timestamp', now.toString());
            }
        } catch (error) {
            console.error('Error fetching commit:', error);
            commitDateElement.textContent = 'OFFLINE_MODE';
            commitDateElement.style.opacity = '0.5';
        }
    };

    fetchLastCommit();

    // --- Konami Code & Matrix Easter Egg ---
    const konamiCode = [
        "arrowup", "arrowup",
        "arrowdown", "arrowdown",
        "arrowleft", "arrowright",
        "arrowleft", "arrowright",
        "b", "a"
    ];
    let konamiIndex = 0;

    // Matrix Variables
    const canvas = document.getElementById("matrix-canvas");
    let ctx = null;
    let matrixInterval = null;

    // Matrix Characters (Katakana + Latin + nums)
    const chars = "अआइईउऊऋएऐओऔकखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    // Using Devanagari/Latin mix looks cool too, or standard Katakana:
    const katakana = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポ";
    const matrixChars = (katakana + chars).split("");

    let fontSize = 16;
    let drops = [];

    const startMatrix = () => {
        if (!canvas) return;
        console.log("Matrix Easter Egg Triggered!");

        ctx = canvas.getContext("2d");
        canvas.style.display = "block";
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const columns = canvas.width / fontSize;
        drops = [];
        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }

        // Draw loop
        const draw = () => {
            // Translucent black background for trail effect
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "#0F0"; // Green text
            ctx.font = fontSize + "px monospace";

            for (let i = 0; i < drops.length; i++) {
                const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                // Random reset of drop
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                drops[i]++;
            }
        };

        if (matrixInterval) clearInterval(matrixInterval);
        matrixInterval = setInterval(draw, 33);

        // Hide other overlay elements if needed
        document.body.style.overflow = "hidden";
    };

    const stopMatrix = () => {
        if (!canvas) return;
        clearInterval(matrixInterval);
        canvas.style.display = "none";
        document.body.style.overflow = "";
        konamiIndex = 0; // Reset code
    };

    document.addEventListener("keydown", (e) => {
        // Check for Escape to close Matrix
        if (e.key === "Escape" && canvas && canvas.style.display === "block") {
            stopMatrix();
            return;
        }

        const key = e.key.toLowerCase();

        // Konami Logic
        if (key === konamiCode[konamiIndex]) {
            konamiIndex++;
            console.log(`Konami Progress: ${konamiIndex}/${konamiCode.length}`);
            if (konamiIndex === konamiCode.length) {
                startMatrix();
                konamiIndex = 0;
            }
        } else {
            // Only reset if it's NOT the start of a new sequence (ArrowUp)
            // But usually just resetting to 0 is safer standard behavior
            konamiIndex = (key === "arrowup") ? 1 : 0;
            if (konamiIndex === 1) console.log("Konami Restarted");
        }
    });
});
