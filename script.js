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
});
