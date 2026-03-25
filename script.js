document.addEventListener("DOMContentLoaded", () => {
    // --- Sound Engine ---
    class SoundEngine {
        constructor() {
            this.audioCtx = null;
            this.enabled = false;
        }

        init() {
            if (!this.audioCtx) {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                if (AudioContext) {
                    this.audioCtx = new AudioContext();
                }
            }
            if (this.audioCtx && this.audioCtx.state === 'suspended') {
                this.audioCtx.resume();
            }
        }

        playTone(freq, type, duration, vol) {
            if (!this.enabled || !this.audioCtx) return;
            const oscillator = this.audioCtx.createOscillator();
            const gainNode = this.audioCtx.createGain();

            oscillator.type = type;
            oscillator.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

            gainNode.gain.setValueAtTime(vol, this.audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + duration);

            oscillator.connect(gainNode);
            gainNode.connect(this.audioCtx.destination);

            oscillator.start();
            oscillator.stop(this.audioCtx.currentTime + duration);
        }

        playKeystroke() {
            this.playTone(150 + Math.random() * 50, 'square', 0.05, 0.05);
        }

        playToggle() {
            this.playTone(600, 'sine', 0.1, 0.08);
            setTimeout(() => this.playTone(800, 'sine', 0.15, 0.08), 80);
        }

        playBeep() {
            this.playTone(500, 'sine', 0.15, 0.1);
        }

        playError() {
            this.playTone(150, 'sawtooth', 0.2, 0.1);
        }
    }

    const sound = new SoundEngine();

    const soundToggleBtn = document.getElementById("sound-toggle");
    const soundIconOn = document.getElementById("sound-icon-on");
    const soundIconOff = document.getElementById("sound-icon-off");

    const updateSoundUI = () => {
        if (sound.enabled) {
            if (soundIconOn) soundIconOn.style.display = "block";
            if (soundIconOff) soundIconOff.style.display = "none";
            if (soundToggleBtn) {
                soundToggleBtn.style.opacity = "1";
                soundToggleBtn.style.color = "var(--sound-active)";
            }
        } else {
            if (soundIconOn) soundIconOn.style.display = "none";
            if (soundIconOff) soundIconOff.style.display = "block";
            if (soundToggleBtn) {
                soundToggleBtn.style.opacity = "0.6";
                soundToggleBtn.style.color = "inherit";
            }
        }
    };

    if (soundToggleBtn) {
        soundToggleBtn.addEventListener("click", () => {
            sound.init();
            sound.enabled = !sound.enabled;
            localStorage.setItem("soundEnabled", sound.enabled);
            updateSoundUI();
            if (sound.enabled) sound.playToggle();
        });
    }

    const savedSoundSetting = localStorage.getItem("soundEnabled");
    if (savedSoundSetting === "true") {
        sound.enabled = true;
        updateSoundUI();
    }

    const initAudioOnInteract = () => {
        if (sound.enabled && !sound.audioCtx) {
            sound.init();
        }
        document.removeEventListener("click", initAudioOnInteract);
        document.removeEventListener("keydown", initAudioOnInteract);
    };
    document.addEventListener("click", initAudioOnInteract);
    document.addEventListener("keydown", initAudioOnInteract);

    // --- Localization Logic ---
    const btnEn = document.getElementById("btn-en");
    const btnPt = document.getElementById("btn-pt");
    let currentLang = localStorage.getItem("lang") || (navigator.language.startsWith("pt") ? "pt" : "en");

    const translations = {
        en: {
            meta_description: "Portfolio of João Pedro Feitosa - Software Engineer & LLM Trainer. Specialized in React, Node.js, and AI.",
            system_status: "SYSTEM_ACTIVE",            role_main: "Software Engineer & LLM Trainer",
            check_projects: "Check some projects",
            terminal_tooltip: "Open Terminal (Ctrl+B / `)",
            career_title: "// Career",
            career_text: "Software Engineer with extensive experience in high-performance commerce and enterprise software. Adept at leading complex projects, from architecting scalable storefronts to integrating custom AWS backends and enterprise systems (ERP/CRM). Currently focused on applying AI/LLMs expertise at Turing.",
            stack_title: "// Main Stack & Expertise",
            experience_title: "// Experience",
            projects_title: "// Featured Projects",
            connect_title: "// Connect & Status",
            exp_turing_role_main: "LLM Trainer",
            exp_turing_location: ", Palo Alto, CA, Remote",
            exp_turing_date: "Sep 2025 - Mar 2026",
            exp_turing_1: "Developed and executed RLHF frameworks for LLM evaluation and enhancement.",
            exp_turing_2: "Generated/scored 'gold standard' data for technical fine-tuning.",
            exp_turing_3: "Conducted deep error analysis to optimize prompts and data collection.",
            exp_turing_4: "Applied advanced analytics for data quality and structuring.",
            exp_revelo_role_main: "LLM Trainer",
            exp_revelo_location: ", Miami, FL, Remote",
            exp_revelo_date: "Mar 2026 - Present",
            exp_revelo_1: "Contributing to the training and fine-tuning of Large Language Models (LLMs).",
            exp_pave_role_main: "Full Stack Engineer",
            exp_pave_location: ", Campina Grande, PB, Remote",
            exp_pave_date: "Jun 2024 - Sep 2025",
            exp_pave_1: "Integrated frontend with AWS backend, enabling seamless data flow and auth.",
            exp_pave_2: "Designed system: auth, uploads, event creation, data management.",
            exp_pave_3: "Built a full event platform for brand campaign engagement/registration.",
            exp_pave_4: "Collaborated with design for responsive performance across all devices.",
            exp_pave_5: "Provided continual UX/UI improvements and bugfixes.",
            chess_rating: "Chess Blitz Rating",
            chess_pawn: "♟",
            exp_inside_role_main: "Full Stack Engineer",
            exp_inside_location: ", Campina Grande, PB, Remote",
            exp_inside_date: "Jun 2024 - Present",
            exp_inside_1: "Led team to build e-commerce platform using Deco, boosting performance.",
            exp_inside_2: "Integrated ERP, CRM, Ads, cashback with real-time campaign tracking.",
            exp_inside_3: "Delivered a scalable storefront & high-speed feature launches.",
            exp_inside_4: "Drove technical decisions and agile processes for quality and UX.",
            exp_wave_role_main: "Front-End Dev",
            exp_wave_location: ", Belo Horizonte, MG, Remote",
            exp_wave_date: "Feb 2024 - May 2024",
            exp_wave_1: "Turned Figma designs into pixel-perfect, accessible Preact components.",
            exp_wave_2: "Owned call center section: navigation, forms, A11y, SEO.",
            exp_wave_3: "Shipped fast, reusable pages with high PageSpeed & CMS integration.",
            exp_integralys_role_main: "Lead SWE",
            exp_integralys_location: ", São Paulo, SP, Remote",
            exp_integralys_date: "Nov 2023 - Jan 2024",
            exp_integralys_1: "Delivered all features from high-fi Figma to production React code.",
            exp_integralys_2: "Modernized stack: refactored legacy PHP to React+TypeScript.",
            exp_integralys_3: "Worked cross-team for accuracy, performance & maintainability.",
            exp_tec4u_role_main: "Full Stack Eng",
            exp_tec4u_location: ", São Paulo, SP, Remote",
            exp_tec4u_date: "Aug 2023 - Oct 2023",
            exp_tec4u_1: "Built key e-commerce modules for Deco : PDP, PLP, landing pages.",
            exp_tec4u_2: "Integrated custom CMS for flexible, editable content.",
            exp_tec4u_3: "Shipped high-quality, reusable and performant code.",
            exp_triilha_role_main: "Full Stack Eng",
            exp_triilha_location: ", João Pessoa, PB",
            exp_triilha_date: "Apr 2022 - Jul 2023",
            exp_triilha_1: "Built React/Postgres/Node.js Scrum productivity suite from scratch.",
            exp_triilha_2: "Product manager & Scrum Master for improved team delivery.",
            exp_abinbev_role_main: "Full Stack Eng",
            exp_abinbev_location: ", Campina Grande, PB",
            exp_abinbev_date: "Jan 2020 - Apr 2021",
            exp_abinbev_1: "Built real-time dashboards & charts with JS/Node.",
            exp_abinbev_2: "Streamlined reporting & performance flows.",
            exp_abinbev_3: "Resolved backend/frontend issues & shipped new features.",
            proj_ameo_title: "1. AmeoPet - Pet Care Management",
            proj_ameo_desc: "Full-stack web application with React, TypeScript, and MongoDB. Features real-time state management (React Query) and robust form validation (React Hook Form/Zod).",
            proj_mcp_title: "2. MCPWeather - Custom Data Protocol",
            proj_mcp_desc: "Client-server application implementing a custom protocol for weather data services. Built with TypeScript/Node.js using clean architecture, intelligent caching, and external API integration.",
            proj_chess_title: "3. Chess Game Engine (Ruby)",
            proj_chess_desc: "A robust engine demonstrating advanced object-oriented design, supporting all standard chess rules (castling, en passant, check/mate detection) with a modular architecture.",
            connect_current: "Currently at:",
            connect_current_val: "Revelo (LLM Trainer, Remote)",

            cv_link: "View / Download CV",
            copy_btn: "Copy",
            copied_msg: "Copied!",
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
            modal_footer: "For more features, use standard keyboard navigation and screen reader tips.",
            contact_start: "Initializing secure connection to contact service...",
            contact_usage: "Usage: contact --send (to send a message) or just contact to see email.",
            contact_step_name: "Please enter your Name: ",
            contact_step_email: "Please enter your Email: ",
            contact_step_msg: "Please enter your Message: ",
            contact_sending: "Sending message...",
            contact_success: "Message sent successfully! I'll get back to you soon.",
            contact_error: "Error sending message. Please try again or use direct email.",
            contact_cancelled: "Contact flow cancelled."
        },
        pt: {
            meta_description: "Portfólio de João Pedro Feitosa - Engenheiro de Software & Treinador de LLM. Especialista em React, Node.js e IA.",
            system_status: "SISTEMA_ATIVO",
            role_main: "Engenheiro de Software & Treinador de LLM",
            check_projects: "Ver alguns projetos",
            terminal_tooltip: "Abrir Terminal (Ctrl+B / `)",
            career_title: "// Carreira",
            career_text: "Engenheiro de Software com vasta experiência em comércio de alta performance e software empresarial. Hábil em liderar projetos complexos, desde arquitetura de lojas escaláveis até integração de backends AWS customizados e sistemas corporativos (ERP/CRM). Atualmente focado em aplicar expertise em IA/LLMs na Turing.",
            stack_title: "// Stack Principal & Expertise",
            experience_title: "// Experiência",
            projects_title: "// Projetos em Destaque",
            connect_title: "// Contato & Status",
            exp_turing_role_main: "Treinador de LLM",
            exp_turing_location: ", Palo Alto, CA, Remoto",
            exp_turing_date: "Set 2025 - Mar 2026",
            exp_turing_1: "Desenvolvi e executei frameworks RLHF para avaliação e melhoria de LLMs.",
            exp_turing_2: "Gerei/avaliei dados 'gold standard' para fine-tuning técnico.",
            exp_turing_3: "Conduzi análises profundas de erros para otimizar prompts e coleta de dados.",
            exp_turing_4: "Apliquei análises avançadas para estruturação e qualidade de dados.",
            exp_revelo_role_main: "Treinador de LLM",
            exp_revelo_location: ", Miami, FL, Remoto",
            exp_revelo_date: "Mar 2026 - Presente",
            exp_revelo_1: "Contribuindo para o treinamento e ajuste fino de Modelos de Linguagem de Grande Escala (LLMs).",
            exp_pave_role_main: "Engenheiro Full Stack",
            exp_pave_location: ", Campina Grande, PB, Remoto",
            exp_pave_date: "Jun 2024 - Set 2025",
            exp_pave_1: "Integrei frontend com backend AWS, permitindo fluxo de dados e autenticação.",
            exp_pave_2: "Projetei sistema: auth, uploads, criação de eventos, gestão de dados.",
            exp_pave_3: "Construí uma plataforma completa de eventos para engajamento de campanhas de marcas.",
            exp_pave_4: "Colaborei com design para performance responsiva em todos os dispositivos.",
            exp_pave_5: "Forneci melhorias contínuas de UX/UI e correções de bugs.",
            chess_rating: "Rating de Xadrez Blitz",
            chess_pawn: "♟",
            exp_inside_role_main: "Engenheiro Full Stack",
            exp_inside_location: ", Campina Grande, PB, Remoto",
            exp_inside_date: "Jun 2024 - Presente",
            exp_inside_1: "Liderei equipe na construção de plataforma e-commerce usando Deco, aumentando performance.",
            exp_inside_2: "Integrei ERP, CRM, Ads, cashback com rastreamento de campanhas em tempo real.",
            exp_inside_3: "Entreguei uma loja escalável e lançamentos de features em alta velocidade.",
            exp_inside_4: "Impulsionei decisões técnicas e processos ágeis para qualidade e UX.",
            exp_wave_role_main: "Dev Front-End",
            exp_wave_location: ", Belo Horizonte, MG, Remoto",
            exp_wave_date: "Fev 2024 - Mai 2024",
            exp_wave_1: "Transformei designs do Figma em componentes Preact acessíveis e pixel-perfect.",
            exp_wave_2: "Responsável pela seção de call center: navegação, formulários, A11y, SEO.",
            exp_wave_3: "Lancei páginas rápidas e reutilizáveis com alta pontuação de PageSpeed e integração CMS.",
            exp_integralys_role_main: "Engenheiro SWE Líder",
            exp_integralys_location: ", São Paulo, SP, Remoto",
            exp_integralys_date: "Nov 2023 - Jan 2024",
            exp_integralys_1: "Entreguei todas as features de Figma high-fi para código React em produção.",
            exp_integralys_2: "Modernizei stack: refatoração de legado PHP para React+TypeScript.",
            exp_integralys_3: "Trabalhei entre equipes para precisão, performance e manutenibilidade.",
            exp_tec4u_role_main: "Eng Full Stack",
            exp_tec4u_location: ", São Paulo, SP, Remoto",
            exp_tec4u_date: "Ago 2023 - Out 2023",
            exp_tec4u_1: "Construí módulos chave de e-commerce para Deco: PDP, PLP, landing pages.",
            exp_tec4u_2: "Integrei CMS customizado para conteúdo flexível e editável.",
            exp_tec4u_3: "Entreguei código de alta qualidade, reutilizável e performático.",
            exp_triilha_role_main: "Eng Full Stack",
            exp_triilha_location: ", João Pessoa, PB",
            exp_triilha_date: "Abr 2022 - Jul 2023",
            exp_triilha_1: "Construí suíte de produtividade Scrum React/Postgres/Node.js do zero.",
            exp_triilha_2: "Gerente de Produto & Scrum Master para melhor entrega da equipe.",
            exp_abinbev_role_main: "Eng Full Stack",
            exp_abinbev_location: ", Campina Grande, PB",
            exp_abinbev_date: "Jan 2020 - Abr 2021",
            exp_abinbev_1: "Construí dashboards e gráficos em tempo real com JS/Node.",
            exp_abinbev_2: "Otimizei fluxos de relatório e performance.",
            exp_abinbev_3: "Resolvi problemas de backend/frontend e entreguei novas features.",
            proj_ameo_title: "1. AmeoPet - Gestão de Cuidados Pet",
            proj_ameo_desc: "Aplicação web full-stack com React, TypeScript e MongoDB. Possui gerenciamento de estado em tempo real (React Query) e validação robusta de formulários (React Hook Form/Zod).",
            proj_mcp_title: "2. MCPWeather - Protocolo de Dados Customizado",
            proj_mcp_desc: "Aplicação cliente-servidor implementando protocolo customizado para serviços de clima. Construído com TypeScript/Node.js usando arquitetura limpa, cache inteligente e integração de API externa.",
            proj_chess_title: "3. Chess Game Engine (Ruby)",
            proj_chess_desc: "Um motor robusto demonstrando design orientado a objetos avançado, suportando todas as regras padrão de xadrez (roque, en passant, detecção de xeque/mate) com arquitetura modular.",
            connect_current: "Atualmente na:",
            connect_current_val: "Revelo (Treinador de LLM, Remoto)",

            cv_link: "Ver / Baixar CV",
            copy_btn: "Copiar",
            copied_msg: "Copiado!",
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
            modal_footer: "Para mais, use navegação de teclado padrão e dicas de leitor de tela.",
            contact_start: "Iniciando conexão segura com serviço de contato...",
            contact_usage: "Uso: contact --send (para enviar mensagem) ou contact para ver email.",
            contact_step_name: "Por favor, digite seu Nome: ",
            contact_step_email: "Por favor, digite seu E-mail: ",
            contact_step_msg: "Por favor, digite sua Mensagem: ",
            contact_sending: "Enviando mensagem...",
            contact_success: "Mensagem enviada com sucesso! Responderei em breve.",
            contact_error: "Erro ao enviar mensagem. Tente novamente ou use o e-mail direto.",
            contact_cancelled: "Envio de contato cancelado."
        }
    };

    const updateLanguage = (lang) => {
        currentLang = lang;
        localStorage.setItem("lang", lang);
        document.documentElement.lang = lang;

        const elements = document.querySelectorAll("[data-i18n]");
        elements.forEach(el => {
            const key = el.getAttribute("data-i18n");
            const text = translations[lang][key];
            if (text) {
                const targetAttribute = el.getAttribute("data-i18n-target");
                if (targetAttribute) {
                    el.setAttribute(targetAttribute, text);
                } else {
                    el.innerText = text;
                }
            }
        });

        if (btnEn && btnPt) {
            if (lang === "en") {
                btnEn.classList.add("active");
                btnPt.classList.remove("active");
            } else {
                btnEn.classList.remove("active");
                btnPt.classList.add("active");
            }
        }
    };

    if (btnEn) btnEn.addEventListener("click", () => {
        updateLanguage("en");
        sound.playToggle();
    });
    if (btnPt) btnPt.addEventListener("click", () => {
        updateLanguage("pt");
        sound.playToggle();
    });

    if (btnEn) {
        btnEn.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                updateLanguage("en");
                sound.playToggle();
            }
        });
    }
    if (btnPt) {
        btnPt.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                updateLanguage("pt");
                sound.playToggle();
            }
        });
    }

    updateLanguage(currentLang);

    const copyBtn = document.getElementById("copy-email-btn");
    const copyStatus = document.getElementById("copy-status");

    if (copyBtn) {
        copyBtn.addEventListener("click", () => {
            navigator.clipboard.writeText("jppfeitosa@gmail.com")
                .then(() => {
                    if (copyStatus) {
                        copyStatus.style.display = "inline";
                        setTimeout(() => copyStatus.style.display = "none", 1400);
                    }
                })
                .catch(err => console.error('Failed to copy text: ', err));
        });
    }

    const expButtons = document.querySelectorAll(".exp-toggle-btn");
    expButtons.forEach(btn => {
        btn.setAttribute("aria-expanded", "false");
        btn.addEventListener("click", () => {
            const targetId = btn.dataset.target;
            const target = document.getElementById(targetId);
            if (target) {
                target.classList.toggle("open");
                const isOpen = target.classList.contains("open");
                btn.textContent = isOpen ? "-" : "+";
                btn.setAttribute("aria-expanded", isOpen);
                sound.playToggle();
            }
        });
    });

    const themeToggle = document.getElementById("theme-toggle");
    const setTheme = (theme) => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    };

    const initTheme = () => {
        const saved = localStorage.getItem("theme");
        if (saved) setTheme(saved);
        else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) setTheme("dark");
    };

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const current = document.documentElement.getAttribute("data-theme") || "light";
            setTheme(current === "dark" ? "light" : "dark");
            sound.playToggle();
        });
    }
    initTheme();

    const shortcutModal = document.getElementById('shortcut-modal');
    const closeShortcutModal = document.getElementById('close-shortcut-modal');
    const toggleModal = (show) => {
        if (shortcutModal) {
            shortcutModal.style.display = show ? 'flex' : 'none';
            if (show && closeShortcutModal) closeShortcutModal.focus();
        }
    };

    document.addEventListener('keydown', (e) => {
        if (e.key === '?' && !e.ctrlKey && !e.altKey && !e.metaKey && !e.shiftKey) {
            if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
                toggleModal(true);
                e.preventDefault();
            }
        }
        if ((e.key === '?' && e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey) || (e.key === '/' && e.shiftKey)) {
            toggleModal(true);
            e.preventDefault();
        }
        if (e.key === 'Escape') toggleModal(false);
    });

    if (closeShortcutModal) closeShortcutModal.addEventListener('click', () => toggleModal(false));

    const scrollBtn = document.getElementById("scroll-top-btn");
    window.addEventListener("scroll", () => {
        if (!scrollBtn) return;
        scrollBtn.style.display = window.scrollY > 180 ? "flex" : "none";
    });

    if (scrollBtn) scrollBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

    const terminalOverlay = document.getElementById('terminal-overlay');
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');
    const closeTerminalBtn = document.getElementById('close-terminal');

    const toggleTerminal = (show) => {
        if (!terminalOverlay) return;
        const shouldShow = (typeof show === 'boolean') ? show : (terminalOverlay.style.display !== 'flex');
        terminalOverlay.style.display = shouldShow ? 'flex' : 'none';
        if (shouldShow) {
            terminalInput.value = '';
            terminalInput.focus();
        }
    };

    if (closeTerminalBtn) closeTerminalBtn.addEventListener('click', () => toggleTerminal(false));
    if (terminalOverlay) terminalOverlay.addEventListener('click', (e) => { if (e.target === terminalOverlay) toggleTerminal(false); });

    document.addEventListener('keydown', (e) => {
        const key = e.key.toLowerCase();
        if (key === '`' && !e.ctrlKey && !e.altKey && !e.metaKey) {
            if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
                e.preventDefault();
                toggleTerminal();
                sound.playToggle();
            }
        }
        if ((e.ctrlKey || e.metaKey) && key === 'b') {
            e.preventDefault();
            toggleTerminal();
            sound.playToggle();
        }
    });

    const terminalToggleBtn = document.getElementById('terminal-toggle');
    if (terminalToggleBtn) terminalToggleBtn.addEventListener('click', () => { toggleTerminal(); sound.playToggle(); });

    let contactFlow = { active: false, step: 0, data: { name: '', email: '', message: '' } };
    const resetContactFlow = () => {
        contactFlow.active = false;
        contactFlow.step = 0;
        contactFlow.data = { name: '', email: '', message: '' };
    };

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
                "Usuário: Visitante\nFunção: Convidado\nNível de Acesso: Leitura\n\nBio: Engenheiro de Software & Treinador de LLM. Especialista em React, Node.js e IA." :
                "User: Visitor\nRole: Guest\nAccess Level: Read-Only\n\nBio: Software Engineer & LLM Trainer. Specialized in React, Node.js, and AI."
        },
        skills: {
            desc: 'List technical skills (use --visual for chart)',
            exec: (args) => {
                const isVisual = args && args.includes('--visual');
                if (isVisual) {
                    const skillsData = [
                        { name: 'React', level: 90 }, { name: 'TypeScript', level: 85 },
                        { name: 'Node.js', level: 80 }, { name: 'Tailwind', level: 90 },
                        { name: 'AI/LLM', level: 75 }, { name: 'PostgreSQL', level: 70 }
                    ];
                    let output = currentLang === 'pt' ? '<b>Visualização de Skills:</b>\n\n' : '<b>Skills Visualization:</b>\n\n';
                    skillsData.forEach(s => {
                        const barLength = 20;
                        const filledLength = Math.round((s.level / 100) * barLength);
                        const bar = '█'.repeat(filledLength) + '░'.repeat(barLength - filledLength);
                        output += `${s.name.padEnd(12)} ${bar} ${s.level}%\n`;
                    });
                    return `<pre style="color: inherit; line-height: 1.2;">${output}</pre>`;
                }
                return `[FRONTEND]\n- React, TypeScript, Tailwind, Preact, HTML/CSS\n[BACKEND]\n- Node.js, PostgreSQL, MongoDB, AWS (Lambda, S3)\n[AI/ML]\n- LLM Training (RLHF), Prompt Engineering, Data Analysis\n[OTHER]\n- Scrum Master, QA, E-commerce (Deco, VTEX)`;
            }
        },
        projects: {
            desc: 'List featured projects',
            exec: () => currentLang === 'pt' ? `1. AmeoPet - Gestão de Cuidados Pet\n2. MCPWeather - Protocolo de Dados Customizado\n3. Chess Engine - Design Orientado a Objetos` : `1. AmeoPet - Pet Care Management\n2. MCPWeather - Custom Data Protocol\n3. Chess Engine - Ruby Object-Oriented Design`
        },
        contact: {
            desc: 'Display contact info or send message (--send)',
            exec: (args) => {
                if (args && args.includes('--send')) {
                    contactFlow.active = true;
                    contactFlow.step = 1;
                    return `<b>${translations[currentLang].contact_start}</b>\n${translations[currentLang].contact_step_name}`;
                }
                return `Email: jppfeitosa@gmail.com\nLinkedIn: in/pedroffeitosa\nGitHub: pedroffeitosa\n\n<i>Hint: type 'contact --send' for an interactive prompt.</i>`;
            }
        },
        clear: { desc: 'Clear terminal output', exec: () => { terminalOutput.innerHTML = ''; return null; } },
        date: { desc: 'Show current date/time', exec: () => new Date().toString() },
        exit: { desc: 'Close terminal', exec: () => { toggleTerminal(false); return 'Session closed...'; } },
        theme: {
            desc: 'Switch theme (light, dark, matrix, cyberpunk, amber)',
            exec: (args) => {
                if (!args || args.length === 0) return 'Usage: theme <name>\nAvailable: light, dark, matrix, cyberpunk, amber';
                const themeName = args[0].toLowerCase();
                const validThemes = ['light', 'dark', 'matrix', 'cyberpunk', 'amber'];
                if (validThemes.includes(themeName)) { setTheme(themeName); return `Theme set to: ${themeName}`; }
                return `Invalid theme. Try: ${validThemes.join(', ')}`;
            }
        },
        themes: { desc: 'List available themes', exec: () => 'Available themes: light, dark, matrix, cyberpunk, amber' },
        cat: {
            desc: 'Spawn a cat walker',
            exec: () => {
                const cat = document.getElementById('cat-walker');
                if (!cat) return 'Error: Cat not found.';
                cat.style.display = cat.style.display === 'none' ? 'block' : 'none';
                return cat.style.display === 'block' ? '🐈 Meow!' : 'Cat hidden.';
            }
        },
        neofetch: {
            desc: 'Display system information summary',
            exec: () => {
                const role = translations[currentLang]?.role_main || "Software Engineer";
                const langLine = currentLang === 'pt' ? 'Língua: Português' : 'Language: English';
                return `<pre style="color: var(--link); line-height: 1.2; font-size: 11px;">\n       .---.\n      /     \\\n      |() ()|   <b>João Pedro Feitosa</b>\n       \\  ^  /    -------------------\n        |||||     <b>OS</b>: PortfolioOS v2.0\n        |||||     <b>Role</b>: ${role}\n                  <b>Stack</b>: React, TS, Node, AI\n                  <b>${langLine}</b>\n                  <b>Location</b>: Brazil (Remote)\n</pre>`.trim();
            }
        }
    };

    const processCommand = (cmdStr) => {
        const trimmed = cmdStr.trim();
        if (!trimmed && !contactFlow.active) return;
        if (contactFlow.active) { handleContactFlow(trimmed); return; }
        const parts = trimmed.split(' ');
        const cmdName = parts[0].toLowerCase();
        const logEntry = document.createElement('div');
        logEntry.className = 'cmd-logs';
        const cmdLine = document.createElement('div');
        cmdLine.className = 'cmd-command';
        cmdLine.innerHTML = `<span class="prompt"><span class="prompt-user">visitor</span><span class="prompt-host">@pedroffeitosa</span>:~$ </span><span>${trimmed}</span>`;
        logEntry.appendChild(cmdLine);
        if (commands[cmdName]) {
            const response = commands[cmdName].exec(parts.slice(1));
            if (response !== null) {
                const respLine = document.createElement('div');
                respLine.className = 'cmd-response';
                respLine.innerHTML = response.replace(/\n/g, '<br>');
                logEntry.appendChild(respLine);
            }
            sound.playBeep();
        } else {
            const errorLine = document.createElement('div');
            errorLine.className = 'cmd-response cmd-error';
            errorLine.textContent = `Command not found: ${cmdName}. Type 'help' for options.`;
            logEntry.appendChild(errorLine);
            sound.playError();
        }
        terminalOutput.appendChild(logEntry);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    };

    const handleContactFlow = async (text) => {
        const logEntry = document.createElement('div');
        logEntry.className = 'cmd-logs';
        const userLine = document.createElement('div');
        userLine.className = 'cmd-command';
        userLine.innerHTML = `<span class="prompt">> </span><span>${text}</span>`;
        logEntry.appendChild(userLine);
        terminalOutput.appendChild(logEntry);
        if (text.toLowerCase() === 'exit' || text.toLowerCase() === 'cancel') {
            const cancelLine = document.createElement('div');
            cancelLine.className = 'cmd-response';
            cancelLine.textContent = translations[currentLang].contact_cancelled;
            logEntry.appendChild(cancelLine);
            resetContactFlow();
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
            return;
        }
        const respLine = document.createElement('div');
        respLine.className = 'cmd-response';
        switch (contactFlow.step) {
            case 1:
                contactFlow.data.name = text || 'Anonymous';
                contactFlow.step = 2;
                respLine.textContent = translations[currentLang].contact_step_email;
                break;
            case 2:
                contactFlow.data.email = text || 'no-email@provided.com';
                contactFlow.step = 3;
                respLine.textContent = translations[currentLang].contact_step_msg;
                break;
            case 3:
                contactFlow.data.message = text || '(Empty Message)';
                respLine.textContent = translations[currentLang].contact_sending;
                logEntry.appendChild(respLine);
                try {
                    const response = await fetch('https://formspree.io/f/mojnzlnq', {
                        method: 'POST',
                        body: JSON.stringify(contactFlow.data),
                        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
                    });
                    if (response.ok) {
                        respLine.innerHTML = `<span style="color: #4caf50;">${translations[currentLang].contact_success}</span>`;
                        sound.playToggle();
                    } else throw new Error();
                } catch (e) {
                    respLine.innerHTML = `<span style="color: #ff5f56;">${translations[currentLang].contact_error}</span>`;
                    sound.playError();
                }
                resetContactFlow();
                break;
        }
        if (contactFlow.active) logEntry.appendChild(respLine);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    };

    if (terminalInput) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key.length === 1 || e.key === 'Backspace' || e.key === 'Delete') sound.playKeystroke();
            if (e.key === 'Enter') { processCommand(terminalInput.value); terminalInput.value = ''; }
        });
    }

    const konamiCode = ["arrowup", "arrowup", "arrowdown", "arrowdown", "arrowleft", "arrowright", "arrowleft", "arrowright", "b", "a"];
    let konamiIndex = 0;
    const canvas = document.getElementById("matrix-canvas");
    let ctx = null, matrixInterval = null;
    const katakana = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポ";
    const chars = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const matrixChars = (katakana + chars).split("");
    let fontSize = 16, drops = [];

    const startMatrix = () => {
        if (!canvas) return;
        ctx = canvas.getContext("2d");
        canvas.style.display = "block";
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const columns = canvas.width / fontSize;
        drops = Array(Math.floor(columns)).fill(1);
        const draw = () => {
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#0F0";
            ctx.font = fontSize + "px monospace";
            for (let i = 0; i < drops.length; i++) {
                const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
                drops[i]++;
            }
        };
        if (matrixInterval) clearInterval(matrixInterval);
        matrixInterval = setInterval(draw, 33);
        document.body.style.overflow = "hidden";
    };

    const stopMatrix = () => {
        if (!canvas) return;
        clearInterval(matrixInterval);
        canvas.style.display = "none";
        document.body.style.overflow = "";
        konamiIndex = 0;
    };

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && canvas && canvas.style.display === "block") { stopMatrix(); return; }
        const key = e.key.toLowerCase();
        if (key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) { startMatrix(); konamiIndex = 0; }
        } else konamiIndex = (key === "arrowup") ? 1 : 0;
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal-visible");
                entry.target.classList.remove("reveal-hidden");
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll(".section").forEach(section => {
        section.classList.add("reveal-hidden");
        revealObserver.observe(section);
    });

    // --- Chess Rating Logic ---
    const CHESS_CACHE_KEY = "lichess_rating_data";
    const CHESS_CACHE_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7 days

    const updateChessUI = (rating) => {
        const ratingEl = document.getElementById("chess-rating-val");
        if (ratingEl) {
            ratingEl.textContent = rating;
            const container = document.getElementById("chess-widget");
            if (container) container.style.display = "flex";
        }
    };

    const fetchLichessRating = async () => {
        const cached = localStorage.getItem(CHESS_CACHE_KEY);
        if (cached) {
            const { rating, timestamp } = JSON.parse(cached);
            if (Date.now() - timestamp < CHESS_CACHE_EXPIRY) {
                updateChessUI(rating);
                return;
            }
        }

        try {
            const response = await fetch("https://lichess.org/api/user/Pedxr0");
            if (response.ok) {
                const data = await response.json();
                const rating = data.perfs.blitz.rating;
                localStorage.setItem(CHESS_CACHE_KEY, JSON.stringify({ rating, timestamp: Date.now() }));
                updateChessUI(rating);
            }
        } catch (error) {
            console.error("Error fetching Lichess rating:", error);
        }
    };

    fetchLichessRating();
});

// --- Service Worker Registration ---
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('SW Registered!', reg))
            .catch(err => console.log('SW Registration failed:', err));
    });
}
