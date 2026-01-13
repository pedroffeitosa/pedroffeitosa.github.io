document.addEventListener("DOMContentLoaded", () => {
    // --- Localization Logic ---
    const langToggle = document.getElementById("lang-toggle");
    let currentLang = localStorage.getItem("lang") || (navigator.language.startsWith("pt") ? "pt" : "en");

    const translations = {
        en: {
            // Meta
            meta_description: "Portfolio of João Feitosa - Full Stack Software Engineer & LLM Trainer. Specialized in React, Node.js, and AI.",
            // Header
            system_status: "SYSTEM_ACTIVE",
            uptime_label: "UPTIME: ",
            last_update: "LAST_UPDATE:",
            role_main: "Full Stack Software Engineer & LLM Trainer",
            check_projects: "Check some projects",
            // Sections
            career_title: "// Career",
            career_text: "Full Stack Engineer with extensive experience in high-performance commerce and enterprise software. Adept at leading complex projects, from architecting scalable storefronts to integrating custom AWS backends and enterprise systems (ERP/CRM). Currently focused on applying AI/LLMs expertise at Turing.",
            stack_title: "// Main Stack & Expertise",
            experience_title: "// Experience",
            projects_title: "// Featured Projects",
            connect_title: "// Connect & Status",
            // Experience - Turing
            exp_turing_role: "Business Analyst & LLM Trainer, Palo Alto, CA",
            exp_turing_date: "Sep 2025 - Present",
            exp_turing_1: "Developed and executed RLHF frameworks for LLM evaluation and enhancement.",
            exp_turing_2: "Generated/scored 'gold standard' data for technical fine-tuning.",
            exp_turing_3: "Conducted deep error analysis to optimize prompts and data collection.",
            exp_turing_4: "Applied advanced analytics for data quality and structuring.",
            // Experience - Pave
            exp_pave_role: "Full Stack Engineer, Remote",
            exp_pave_date: "Jun 2024 - Sep 2025",
            exp_pave_1: "Integrated frontend with AWS backend, enabling seamless data flow and auth.",
            exp_pave_2: "Designed system: auth, uploads, event creation, data management.",
            exp_pave_3: "Built a full event platform for brand campaign engagement/registration.",
            exp_pave_4: "Collaborated with design for responsive performance across all devices.",
            exp_pave_5: "Provided continual UX/UI improvements and bugfixes.",
            // Experience - InsideHome
            exp_inside_role: "Full Stack Engineer, Remote",
            exp_inside_date: "Jun 2024 - Present",
            exp_inside_1: "Led team to build e-commerce platform using Deco, boosting performance.",
            exp_inside_2: "Integrated ERP, CRM, Ads, cashback with real-time campaign tracking.",
            exp_inside_3: "Delivered a scalable storefront & high-speed feature launches.",
            exp_inside_4: "Drove technical decisions and agile processes for quality and UX.",
            // Experience - Wave
            exp_wave_role: "Front-End Dev, Remote",
            exp_wave_date: "Feb 2024 - May 2024",
            exp_wave_1: "Turned Figma designs into pixel-perfect, accessible Preact components.",
            exp_wave_2: "Owned call center section: navigation, forms, A11y, SEO.",
            exp_wave_3: "Shipped fast, reusable pages with high PageSpeed & CMS integration.",
            // Experience - Integralys
            exp_integralys_role: "Lead SWE, Remote",
            exp_integralys_date: "Nov 2023 - Jan 2024",
            exp_integralys_1: "Delivered all features from high-fi Figma to production React code.",
            exp_integralys_2: "Modernized stack: refactored legacy PHP to React+TypeScript.",
            exp_integralys_3: "Worked cross-team for accuracy, performance & maintainability.",
            // Experience - TEC4U
            exp_tec4u_role: "Full Stack Eng, Remote",
            exp_tec4u_date: "Aug 2023 - Oct 2023",
            exp_tec4u_1: "Built key e-commerce modules for Deco : PDP, PLP, landing pages.",
            exp_tec4u_2: "Integrated custom CMS for flexible, editable content.",
            exp_tec4u_3: "Shipped high-quality, reusable and performant code.",
            // Experience - Triilha
            exp_triilha_role: "Full Stack Eng, Campina Grande",
            exp_triilha_date: "Apr 2022 - Jul 2023",
            exp_triilha_1: "Built React/Postgres/Node.js Scrum productivity suite from scratch.",
            exp_triilha_2: "Product manager & Scrum Master for improved team delivery.",
            // Experience - AbInBev
            exp_abinbev_role: "Full Stack Eng, Campina Grande",
            exp_abinbev_date: "Jan 2020 - Apr 2021",
            exp_abinbev_1: "Built real-time dashboards & charts with JS/Node.",
            exp_abinbev_2: "Streamlined reporting & performance flows.",
            exp_abinbev_3: "Resolved backend/frontend issues & shipped new features.",
            // Projects
            proj_ameo_title: "1. AmeoPet - Pet Care Management",
            proj_ameo_desc: "Full-stack web application with React, TypeScript, and MongoDB. Features real-time state management (React Query) and robust form validation (React Hook Form/Zod).",
            proj_mcp_title: "2. MCPWeather - Custom Data Protocol",
            proj_mcp_desc: "Client-server application implementing a custom protocol for weather data services. Built with TypeScript/Node.js using clean architecture, intelligent caching, and external API integration.",
            proj_chess_title: "3. Chess Game Engine (Ruby)",
            proj_chess_desc: "A robust engine demonstrating advanced object-oriented design, supporting all standard chess rules (castling, en passant, check/mate detection) with a modular architecture.",
            // Connect
            connect_current: "Currently at:",
            connect_current_val: "Turing (Business Analyst & LLM Trainer)",
            connect_location: "Location:",
            connect_location_val: "Campina Grande, PB, Brazil (Remote)",
            copy_btn: "Copy",
            copied_msg: "Copied!",
            // Modal
            modal_title: "Keyboard Shortcuts & Tips",
            modal_help_key: "?",
            modal_help_desc: "Show this help",
            modal_esc_key: "Esc",
            modal_esc_desc: "Close this help",
            modal_tab_key: "Tab",
            modal_tab_desc: "Standard web navigation",
            modal_scroll_key: "Scroll to Top",
            modal_scroll_desc: "Use the ⬆️ button or Home key",
            modal_theme_key: "Switch Theme",
            modal_theme_desc: "Navigate to Theme Button and hit Enter",
            modal_exp_key: "Expand Experience",
            modal_exp_desc: "Tab to Experience [+] and Enter",
            modal_copy_key: "Copy Email",
            modal_copy_desc: "Tab to Email Copy and Enter",
            modal_footer: "For more features, use standard keyboard navigation and screen reader tips."
        },
        pt: {
            // Meta
            meta_description: "Portfólio de João Feitosa - Engenheiro de Software Full Stack & Treinador de LLM. Especialista em React, Node.js e IA.",
            // Header
            system_status: "SISTEMA_ATIVO",
            uptime_label: "LIGADO: ",
            last_update: "ULT_ATUALIZACAO:",
            role_main: "Engenheiro de Software Full Stack & Treinador de LLM",
            check_projects: "Ver alguns projetos",
            // Sections
            career_title: "// Carreira",
            career_text: "Engenheiro Full Stack com vasta experiência em comércio de alta performance e software empresarial. Hábil em liderar projetos complexos, desde arquitetura de lojas escaláveis até integração de backends AWS customizados e sistemas corporativos (ERP/CRM). Atualmente focado em aplicar expertise em IA/LLMs na Turing.",
            stack_title: "// Stack Principal & Expertise",
            experience_title: "// Experiência",
            projects_title: "// Projetos em Destaque",
            connect_title: "// Contato & Status",
            // Experience - Turing
            exp_turing_role: "Analista de Negócios & Treinador de LLM, Palo Alto, CA",
            exp_turing_date: "Set 2025 - Presente",
            exp_turing_1: "Desenvolvi e executei frameworks RLHF para avaliação e melhoria de LLMs.",
            exp_turing_2: "Gerei/avaliei dados 'gold standard' para fine-tuning técnico.",
            exp_turing_3: "Conduzi análises profundas de erros para otimizar prompts e coleta de dados.",
            exp_turing_4: "Apliquei análises avançadas para estruturação e qualidade de dados.",
            // Experience - Pave
            exp_pave_role: "Engenheiro Full Stack, Remoto",
            exp_pave_date: "Jun 2024 - Set 2025",
            exp_pave_1: "Integrei frontend com backend AWS, permitindo fluxo de dados e autenticação.",
            exp_pave_2: "Projetei sistema: auth, uploads, criação de eventos, gestão de dados.",
            exp_pave_3: "Construí uma plataforma completa de eventos para engajamento de campanhas de marcas.",
            exp_pave_4: "Colaborei com design para performance responsiva em todos os dispositivos.",
            exp_pave_5: "Forneci melhorias contínuas de UX/UI e correções de bugs.",
            // Experience - InsideHome
            exp_inside_role: "Engenheiro Full Stack, Remoto",
            exp_inside_date: "Jun 2024 - Presente",
            exp_inside_1: "Liderei equipe na construção de plataforma e-commerce usando Deco, aumentando performance.",
            exp_inside_2: "Integrei ERP, CRM, Ads, cashback com rastreamento de campanhas em tempo real.",
            exp_inside_3: "Entreguei uma loja escalável e lançamentos de features em alta velocidade.",
            exp_inside_4: "Impulsionei decisões técnicas e processos ágeis para qualidade e UX.",
            // Experience - Wave
            exp_wave_role: "Dev Front-End, Remoto",
            exp_wave_date: "Fev 2024 - Mai 2024",
            exp_wave_1: "Transformei designs do Figma em componentes Preact acessíveis e pixel-perfect.",
            exp_wave_2: "Responsável pela seção de call center: navegação, formulários, A11y, SEO.",
            exp_wave_3: "Lancei páginas rápidas e reutilizáveis com alta pontuação de PageSpeed e integração CMS.",
            // Experience - Integralys
            exp_integralys_role: "Engenheiro SWE Líder, Remoto",
            exp_integralys_date: "Nov 2023 - Jan 2024",
            exp_integralys_1: "Entreguei todas as features de Figma high-fi para código React em produção.",
            exp_integralys_2: "Modernizei stack: refatoração de legado PHP para React+TypeScript.",
            exp_integralys_3: "Trabalhei entre equipes para precisão, performance e manutenibilidade.",
            // Experience - TEC4U
            exp_tec4u_role: "Eng Full Stack, Remoto",
            exp_tec4u_date: "Ago 2023 - Out 2023",
            exp_tec4u_1: "Construí módulos chave de e-commerce para Deco: PDP, PLP, landing pages.",
            exp_tec4u_2: "Integrei CMS customizado para conteúdo flexível e editável.",
            exp_tec4u_3: "Entreguei código de alta qualidade, reutilizável e performático.",
            // Experience - Triilha
            exp_triilha_role: "Eng Full Stack, Campina Grande",
            exp_triilha_date: "Abr 2022 - Jul 2023",
            exp_triilha_1: "Construí suíte de produtividade Scrum React/Postgres/Node.js do zero.",
            exp_triilha_2: "Gerente de Produto & Scrum Master para melhor entrega da equipe.",
            // Experience - AbInBev
            exp_abinbev_role: "Eng Full Stack, Campina Grande",
            exp_abinbev_date: "Jan 2020 - Abr 2021",
            exp_abinbev_1: "Construí dashboards e gráficos em tempo real com JS/Node.",
            exp_abinbev_2: "Otimizei fluxos de relatório e performance.",
            exp_abinbev_3: "Resolvi problemas de backend/frontend e entreguei novas features.",
            // Projects
            proj_ameo_title: "1. AmeoPet - Gestão de Cuidados Pet",
            proj_ameo_desc: "Aplicação web full-stack com React, TypeScript e MongoDB. Possui gerenciamento de estado em tempo real (React Query) e validação robusta de formulários (React Hook Form/Zod).",
            proj_mcp_title: "2. MCPWeather - Protocolo de Dados Customizado",
            proj_mcp_desc: "Aplicação cliente-servidor implementando protocolo customizado para serviços de clima. Construído com TypeScript/Node.js usando arquitetura limpa, cache inteligente e integração de API externa.",
            proj_chess_title: "3. Chess Game Engine (Ruby)",
            proj_chess_desc: "Um motor robusto demonstrando design orientado a objetos avançado, suportando todas as regras padrão de xadrez (roque, en passant, detecção de xeque/mate) com arquitetura modular.",
            // Connect
            connect_current: "Atualmente na:",
            connect_current_val: "Turing (Analista de Negócios & Treinador de LLM)",
            connect_location: "Localização:",
            connect_location_val: "Campina Grande, PB, Brasil (Remoto)",
            copy_btn: "Copiar",
            copied_msg: "Copiado!",
            // Modal
            modal_title: "Atalhos de Teclado & Dicas",
            modal_help_key: "?",
            modal_help_desc: "Mostrar esta ajuda",
            modal_esc_key: "Esc",
            modal_esc_desc: "Fechar esta ajuda",
            modal_tab_key: "Tab",
            modal_tab_desc: "Navegação web padrão",
            modal_scroll_key: "Rolar ao Topo",
            modal_scroll_desc: "Use o botão ⬆️ ou tecla Home",
            modal_theme_key: "Mudar Tema",
            modal_theme_desc: "Vá ao Botão de Tema e aperte Enter",
            modal_exp_key: "Expandir Experiência",
            modal_exp_desc: "Tab até a Experiência [+] e Enter",
            modal_copy_key: "Copiar Email",
            modal_copy_desc: "Tab até Copiar Email e Enter",
            modal_footer: "Para mais, use navegação de teclado padrão e dicas de leitor de tela."
        }
    };

    const updateLanguage = (lang) => {
        // Update state
        currentLang = lang;
        localStorage.setItem("lang", lang);
        document.documentElement.lang = lang; // Accessibility

        // Update UI
        const elements = document.querySelectorAll("[data-i18n]");
        elements.forEach(el => {
            const key = el.getAttribute("data-i18n");
            const target = el.getAttribute("data-i18n-target");
            const text = translations[lang][key];

            if (text) {
                if (target === "content") {
                    el.content = text; // for meta tags
                } else if (target === "prepend") {
                    // Be careful not to wipe out the live uptime counter
                    // The uptime logic updates textContent completely, so we need to
                    // update the template prefix used by the interval or just let it be.
                    // Wait! The uptime function just sets property directly:
                    // uptimeElement.textContent = `UPTIME: ...`;
                    // So just changing the inner text here once won't persist.
                    // I need to update the uptime function itself to use the translation.
                    // For now, let's just update the static label if possible.
                    // Actually, simpler: I will update the uptime function to read from translations.
                } else {
                    el.innerText = text;
                }
            }
        });

        // Update Toggle Button Text
        if (langToggle) {
            langToggle.textContent = lang === "en" ? "EN" : "PT";
        }
    };

    if (langToggle) {
        langToggle.addEventListener("click", () => {
            const newLang = currentLang === "en" ? "pt" : "en";
            updateLanguage(newLang);
        });
    }

    // Initialize with current language (default or saved)
    updateLanguage(currentLang);

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

    // Keyboard shortcut to open (Backtick ` or Ctrl+B)
    document.addEventListener('keydown', (e) => {
        // Toggle with Backtick (`)
        if (e.key === '`' && !e.ctrlKey && !e.altKey && !e.metaKey) {
            e.preventDefault();
            const isVisible = terminalOverlay.style.display === 'flex';
            toggleTerminal(!isVisible);
        }
        // Toggle with Ctrl+B (Alternative safe shortcut)
        if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
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
            exec: () => currentLang === 'pt' ?
                "Usuário: Visitante\nFunção: Convidado\nNível de Acesso: Leitura\n\nBio: Engenheiro de Software Full Stack & Treinador de LLM. Especialista em React, Node.js e IA." :
                "User: Visitor\nRole: Guest\nAccess Level: Read-Only\n\nBio: Full Stack Software Engineer & LLM Trainer. Specialized in React, Node.js, and AI."
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
            exec: () => currentLang === 'pt' ? `
1. <a href="#" target="_blank">AmeoPet</a> - Gestão de Cuidados Pet (React/Mongo)
2. <a href="#" target="_blank">MCPWeather</a> - Protocolo de Dados Customizado (TS/Node)
3. <a href="#" target="_blank">Chess Engine</a> - Design Orientado a Objetos em Ruby
            `.trim() : `
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
        },
        theme: {
            desc: 'Switch theme (light, dark, matrix, cyberpunk, amber)',
            exec: () => {
                const args = terminalInput.value.trim().split(' ');
                if (args.length < 2) return 'Usage: theme <name>\nAvailable: light, dark, matrix, cyberpunk, amber';

                const themeName = args[1].toLowerCase();
                const validThemes = ['light', 'dark', 'matrix', 'cyberpunk', 'amber'];

                if (validThemes.includes(themeName)) {
                    setTheme(themeName);
                    return `Theme set to: ${themeName}`;
                } else {
                    return `Invalid theme. Try: ${validThemes.join(', ')}`;
                }
            }
        },
        themes: {
            desc: 'List available themes',
            exec: () => 'Available themes:\n- light\n- dark\n- matrix\n- cyberpunk\n- amber'
        },
        cat: {
            desc: 'Spawn a cat walker',
            exec: () => {
                const cat = document.getElementById('cat-walker');
                if (!cat) return 'Error: Cat not found.';

                if (cat.style.display === 'none') {
                    cat.style.display = 'block';
                    return '🐈 Meow! The cat is now walking.';
                } else {
                    cat.style.display = 'none';
                    return 'Cat has been tucked away.';
                }
            }
        }
    };

    const processCommand = (cmdStr) => {
        const trimmed = cmdStr.trim();
        if (!trimmed) return;

        const parts = trimmed.split(' ');
        const cmdName = parts[0].toLowerCase();

        // Create log entry
        const logEntry = document.createElement('div');
        logEntry.className = 'cmd-logs';

        const cmdLine = document.createElement('div');
        cmdLine.className = 'cmd-command';
        cmdLine.textContent = `visitor@pedroffeitosa:~$ ${trimmed}`; // Keep original case for display
        logEntry.appendChild(cmdLine);

        // Process command
        if (commands[cmdName]) {
            // Pass the full original string or args if needed, 
            // but our theme command reads from terminalInput.value or we can pass args
            const response = commands[cmdName].exec(parts.slice(1));
            if (response !== null) {
                const respLine = document.createElement('div');
                respLine.className = 'cmd-response';
                respLine.innerHTML = response.replace(/\n/g, '<br>'); // Simple formatting
                logEntry.appendChild(respLine);
            }
        } else {
            const errorLine = document.createElement('div');
            errorLine.className = 'cmd-response cmd-error';
            errorLine.textContent = `Command not found: ${cmdName}. Type 'help' for options.`;
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

        const label = translations[currentLang]?.uptime_label || "UPTIME: ";
        uptimeElement.textContent = `${label}${hours}:${minutes}:${seconds}`;
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

                // Update LAST_UPDATE label dynamically if needed, 
                // but handled by setLanguage() generally.

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
