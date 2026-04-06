document.addEventListener("DOMContentLoaded", () => {
    const pageLoadTime = Date.now();

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
            contact_cancelled: "Contact flow cancelled.",
            pwa_install_title: "Install App",
            pwa_install_desc: "Add to home screen for quick access.",
            pwa_cancel: "Not now",
            pwa_install_btn: "Install",
            pwa_ios_msg: "Tap the 'Share' icon and then 'Add to Home Screen'.",
            ai_chat_title: "João's AI Assistant",
            ai_chat_placeholder: "Ask something...",
            ai_chat_welcome: "Hi! I'm João's virtual assistant. Ask me about his skills, experience, projects, or even his chess rating!",
            ai_chat_error: "I'm not sure I understand. Could you try asking about his 'experience', 'skills', or 'projects'?",
            ai_chat_thinking: "Thinking...",
            stack_algorithms: "Algorithms Solving",
            fortune_quotes: [
                "Programs must be written for people to read, and only incidentally for machines to execute. — Abelson & Sussman",
                "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. — Martin Fowler",
                "First, solve the problem. Then, write the code. — John Johnson",
                "The best error message is the one that never shows up. — Thomas Fuchs",
                "There are only two hard things in Computer Science: cache invalidation and naming things. — Phil Karlton",
                "Talk is cheap. Show me the code. — Linus Torvalds",
                "The cake is a lie.",
                "There is no spoon.",
                "Don't panic.",
                "Hello world!",
                "My other computer is a Commodore 64."
            ]
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
            contact_cancelled: "Envio de contato cancelado.",
            pwa_install_title: "Instalar App",
            pwa_install_desc: "Adicione à tela de início para acesso rápido.",
            pwa_cancel: "Agora não",
            pwa_install_btn: "Instalar",
            pwa_ios_msg: "Toque no ícone de 'Compartilhar' e depois em 'Adicionar à Tela de Início'.",
            ai_chat_title: "Assistente IA do João",
            ai_chat_placeholder: "Pergunte algo...",
            ai_chat_welcome: "Olá! Sou o assistente virtual do João. Pergunte-me sobre suas habilidades, experiência, projetos ou até seu rating de xadrez!",
            ai_chat_error: "Não tenho certeza se entendi. Tente perguntar sobre 'experiência', 'habilidades' ou 'projetos'!",
            ai_chat_thinking: "Pensando...",
            stack_algorithms: "Resolução de Algoritmos",
            fortune_quotes: [
                "Programas devem ser escritos para que pessoas leiam, e apenas de passagem para máquinas executarem. — Abelson & Sussman",
                "Qualquer tolo consegue escrever código que um computador entenda. Bons programadores escrevem código que humanos entendam. — Martin Fowler",
                "Primeiro, resolva o problema. Depois, escreva o código. — John Johnson",
                "A melhor mensagem de erro é aquela que nunca aparece. — Thomas Fuchs",
                "Só existem duas coisas difíceis na Ciência da Computação: invalidação de cache e nomear coisas. — Phil Karlton",
                "Falar é fácil. Mostre-me o código. — Linus Torvalds",
                "O bolo é uma mentira.",
                "Não existe colher.",
                "Não entre em pânico.",
                "Olá mundo!",
                "Meu outro computador é um Commodore 64."
            ]
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

    // --- Window Manager ---
    class WindowManager {
        constructor() {
            this.windows = [];
            this.activeWindow = null;
            this.zIndexBase = 9000;
            this.isDragging = false;
            this.isResizing = false;
        }

        initWindow(elId) {
            const el = document.getElementById(elId);
            if (!el) return;

            const header = el.querySelector('.window-header');
            const resizer = el.querySelector('.resize-handle');
            const closeBtn = el.querySelector('.close');
            const minimizeBtn = el.querySelector('.minimize');
            const maximizeBtn = el.querySelector('.maximize');

            this.windows.push(el);

            // Bring to front on click
            el.addEventListener('mousedown', () => this.bringToFront(el));

            // Dragging
            if (header) {
                header.addEventListener('mousedown', (e) => {
                    if (e.target.closest('.window-controls')) return;
                    if (window.innerWidth <= 600) return; // Disable drag on mobile
                    this.startDrag(e, el);
                });
            }

            // Resizing
            if (resizer) {
                resizer.addEventListener('mousedown', (e) => {
                    if (window.innerWidth <= 600) return; // Disable resize on mobile
                    this.startResize(e, el);
                });
            }

            // Controls
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    el.style.display = 'none';
                    if (elId === 'terminal-window') {
                        document.getElementById('terminal-overlay').style.display = 'none';
                    }
                    if (typeof sound !== 'undefined') sound.playToggle();
                });
            }

            if (maximizeBtn) {
                maximizeBtn.addEventListener('click', () => {
                    if (window.innerWidth <= 600) return;
                    this.toggleMaximize(el);
                    if (typeof sound !== 'undefined') sound.playToggle();
                });
            }

            if (minimizeBtn) {
                minimizeBtn.addEventListener('click', () => {
                    el.style.display = 'none';
                    if (typeof sound !== 'undefined') sound.playToggle();
                });
            }
        }

        bringToFront(el) {
            if (this.activeWindow === el) return;
            this.windows.forEach(w => w.classList.remove('focused'));
            el.classList.add('focused');
            this.activeWindow = el;
            
            this.zIndexBase += 2;
            el.style.zIndex = this.zIndexBase;
        }

        startDrag(e, el) {
            if (el.dataset.maximized === 'true') return;
            this.isDragging = true;
            this.bringToFront(el);

            const startX = e.clientX;
            const startY = e.clientY;
            const startLeft = el.offsetLeft;
            const startTop = el.offsetTop;

            const onMouseMove = (e) => {
                if (!this.isDragging) return;
                const dx = e.clientX - startX;
                const dy = e.clientY - startY;
                el.style.left = `${startLeft + dx}px`;
                el.style.top = `${startTop + dy}px`;
                el.style.right = 'auto';
                el.style.bottom = 'auto';
            };

            const onMouseUp = () => {
                this.isDragging = false;
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            };

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        }

        startResize(e, el) {
            if (el.dataset.maximized === 'true') return;
            this.isResizing = true;
            this.bringToFront(el);
            e.preventDefault();

            const startWidth = el.offsetWidth;
            const startHeight = el.offsetHeight;
            const startX = e.clientX;
            const startY = e.clientY;

            const onMouseMove = (e) => {
                if (!this.isResizing) return;
                const dw = e.clientX - startX;
                const dh = e.clientY - startY;
                el.style.width = `${startWidth + dw}px`;
                el.style.height = `${startHeight + dh}px`;
            };

            const onMouseUp = () => {
                this.isResizing = false;
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            };

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        }

        toggleMaximize(el) {
            if (el.dataset.maximized === 'true') {
                el.style.top = el.dataset.prevTop || '100px';
                el.style.left = el.dataset.prevLeft || '50px';
                el.style.width = el.dataset.prevWidth || '600px';
                el.style.height = el.dataset.prevHeight || '400px';
                el.dataset.maximized = 'false';
            } else {
                el.dataset.prevTop = el.style.top;
                el.dataset.prevLeft = el.style.left;
                el.dataset.prevWidth = el.style.width;
                el.dataset.prevHeight = el.style.height;
                
                el.style.top = '0';
                el.style.left = '0';
                el.style.width = '100vw';
                el.style.height = '100vh';
                el.dataset.maximized = 'true';
            }
        }
    }

    const winMgr = new WindowManager();
    winMgr.initWindow('terminal-window');
    winMgr.initWindow('ai-chat-window');

    const terminalOverlay = document.getElementById('terminal-overlay');
    const terminalWindow = document.getElementById('terminal-window');
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');

    const toggleTerminal = (show) => {
        if (!terminalOverlay || !terminalWindow) return;
        const shouldShow = (typeof show === 'boolean') ? show : (terminalWindow.style.display !== 'flex');
        
        terminalOverlay.style.display = shouldShow ? 'block' : 'none';
        terminalWindow.style.display = shouldShow ? 'flex' : 'none';

        if (shouldShow) {
            winMgr.bringToFront(terminalWindow);
            terminalInput.value = '';
            terminalInput.focus();
            
            // Show a random fortune on open if output is empty
            if (terminalOutput.children.length === 0) {
                const quote = getFortune();
                const logEntry = document.createElement('div');
                logEntry.className = 'cmd-logs';
                logEntry.innerHTML = `<div class="cmd-response"><i>${quote}</i></div>`;
                terminalOutput.appendChild(logEntry);
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
            }
        }
    };

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
    let commandHistory = [];
    let historyIndex = -1;
    let tempDraft = '';

    const resetContactFlow = () => {
        contactFlow.active = false;
        contactFlow.step = 0;
        contactFlow.data = { name: '', email: '', message: '' };
    };

    const startSnake = () => {
        const existing = document.getElementById('snake-overlay');
        if (existing) existing.remove();

        const CELL = 20, COLS = 20, ROWS = 20;
        const W = COLS * CELL, H = ROWS * CELL;

        const overlay = document.createElement('div');
        overlay.id = 'snake-overlay';
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.92);z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;';

        const titleEl = document.createElement('div');
        titleEl.style.cssText = 'color:#27c93f;font-family:monospace;font-size:18px;font-weight:bold;margin-bottom:8px;letter-spacing:3px;';
        titleEl.textContent = 'S N A K E';

        const scoreEl = document.createElement('div');
        scoreEl.style.cssText = 'color:#0f0;font-family:monospace;font-size:13px;margin-bottom:8px;';
        scoreEl.textContent = 'Score: 0';

        const canvas = document.createElement('canvas');
        canvas.width = W;
        canvas.height = H;
        canvas.style.cssText = 'border:2px solid #27c93f;box-shadow:0 0 20px rgba(39,201,63,0.3);';

        const hintEl = document.createElement('div');
        hintEl.style.cssText = 'color:#444;font-family:monospace;font-size:11px;margin-top:8px;';
        hintEl.textContent = '↑ ↓ ← →  move  |  Q / Esc  quit';

        overlay.appendChild(titleEl);
        overlay.appendChild(scoreEl);
        overlay.appendChild(canvas);
        overlay.appendChild(hintEl);
        document.body.appendChild(overlay);

        const ctx = canvas.getContext('2d');
        let snake, dir, nextDir, food, score, gameOver, started, loop;

        const spawnFood = () => {
            let pos;
            do { pos = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) }; }
            while (snake.some(s => s.x === pos.x && s.y === pos.y));
            return pos;
        };

        const init = () => {
            snake = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
            dir = { x: 1, y: 0 };
            nextDir = { x: 1, y: 0 };
            food = spawnFood();
            score = 0;
            gameOver = false;
            started = false;
        };

        const update = () => {
            if (!started || gameOver) return;
            dir = nextDir;
            const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };
            if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS || snake.some(s => s.x === head.x && s.y === head.y)) {
                gameOver = true;
                const hs = Math.max(score, parseInt(localStorage.getItem('snakeHighScore') || '0'));
                localStorage.setItem('snakeHighScore', hs);
                sound.playError();
                draw();
                return;
            }
            snake.unshift(head);
            if (head.x === food.x && head.y === food.y) {
                score++;
                food = spawnFood();
                sound.playBeep();
            } else {
                snake.pop();
            }
            const hs = parseInt(localStorage.getItem('snakeHighScore') || '0');
            scoreEl.textContent = `Score: ${score}  |  Best: ${Math.max(score, hs)}`;
            draw();
        };

        const draw = () => {
            ctx.fillStyle = '#0a0a0a';
            ctx.fillRect(0, 0, W, H);
            ctx.strokeStyle = '#111';
            ctx.lineWidth = 0.5;
            for (let x = 0; x <= COLS; x++) { ctx.beginPath(); ctx.moveTo(x * CELL, 0); ctx.lineTo(x * CELL, H); ctx.stroke(); }
            for (let y = 0; y <= ROWS; y++) { ctx.beginPath(); ctx.moveTo(0, y * CELL); ctx.lineTo(W, y * CELL); ctx.stroke(); }

            ctx.fillStyle = '#ff4444';
            ctx.shadowColor = '#ff4444';
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(food.x * CELL + CELL / 2, food.y * CELL + CELL / 2, CELL / 2 - 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;

            snake.forEach((s, i) => {
                const ratio = i / Math.max(snake.length - 1, 1);
                ctx.fillStyle = i === 0 ? '#00ff41' : `hsl(120, 100%, ${50 - ratio * 20}%)`;
                ctx.shadowColor = i < 3 ? '#00ff41' : 'transparent';
                ctx.shadowBlur = i < 3 ? 6 : 0;
                ctx.fillRect(s.x * CELL + 1, s.y * CELL + 1, CELL - 2, CELL - 2);
            });
            ctx.shadowBlur = 0;

            if (!started) {
                ctx.fillStyle = 'rgba(0,0,0,0.55)';
                ctx.fillRect(0, 0, W, H);
                ctx.fillStyle = '#27c93f';
                ctx.font = 'bold 15px monospace';
                ctx.textAlign = 'center';
                ctx.fillText('Press any arrow key to start', W / 2, H / 2);
            }

            if (gameOver) {
                ctx.fillStyle = 'rgba(0,0,0,0.75)';
                ctx.fillRect(0, 0, W, H);
                ctx.fillStyle = '#ff4444';
                ctx.font = 'bold 22px monospace';
                ctx.textAlign = 'center';
                ctx.fillText('GAME OVER', W / 2, H / 2 - 28);
                ctx.fillStyle = '#27c93f';
                ctx.font = '14px monospace';
                ctx.fillText(`Score: ${score}`, W / 2, H / 2 + 2);
                const hs = parseInt(localStorage.getItem('snakeHighScore') || '0');
                if (score > 0 && score >= hs) {
                    ctx.fillStyle = '#ffbd2e';
                    ctx.font = '13px monospace';
                    ctx.fillText('New High Score!', W / 2, H / 2 + 24);
                }
                ctx.fillStyle = '#555';
                ctx.font = '11px monospace';
                ctx.fillText('Arrow key to restart  |  Q / Esc to quit', W / 2, H / 2 + 52);
            }
        };

        const quit = () => {
            if (loop) clearInterval(loop);
            document.removeEventListener('keydown', snakeKeyHandler);
            overlay.remove();
        };

        const snakeKeyHandler = (e) => {
            const key = e.key;
            if (key === 'q' || key === 'Q' || key === 'Escape') { quit(); return; }
            if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) return;
            e.preventDefault();
            e.stopPropagation();

            if (!started || gameOver) {
                if (loop) clearInterval(loop);
                init();
                started = true;
                loop = setInterval(update, 130);
                return;
            }

            if (key === 'ArrowUp' && dir.y !== 1) nextDir = { x: 0, y: -1 };
            else if (key === 'ArrowDown' && dir.y !== -1) nextDir = { x: 0, y: 1 };
            else if (key === 'ArrowLeft' && dir.x !== 1) nextDir = { x: -1, y: 0 };
            else if (key === 'ArrowRight' && dir.x !== -1) nextDir = { x: 1, y: 0 };
        };

        document.addEventListener('keydown', snakeKeyHandler);

        let touchStartX, touchStartY;
        canvas.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; touchStartY = e.touches[0].clientY; });
        canvas.addEventListener('touchend', (e) => {
            const dx = e.changedTouches[0].clientX - touchStartX;
            const dy = e.changedTouches[0].clientY - touchStartY;
            if (!started || gameOver) { if (loop) clearInterval(loop); init(); started = true; loop = setInterval(update, 130); return; }
            if (Math.abs(dx) > Math.abs(dy)) {
                if (dx > 20 && dir.x !== -1) nextDir = { x: 1, y: 0 };
                else if (dx < -20 && dir.x !== 1) nextDir = { x: -1, y: 0 };
            } else {
                if (dy > 20 && dir.y !== -1) nextDir = { x: 0, y: 1 };
                else if (dy < -20 && dir.y !== 1) nextDir = { x: 0, y: -1 };
            }
        });

        init();
        draw();
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
                return `[FRONTEND]\n- React, TypeScript, Tailwind, Preact, HTML/CSS\n[BACKEND]\n- Node.js, PostgreSQL, MongoDB, AWS (Lambda, S3)\n[AI/ML]\n- LLM Training (RLHF), Prompt Engineering, Data Analysis\n[ALGORITHMS]\n- Problem Solving, Data Structures, Optimizing Complexity\n[OTHER]\n- Scrum Master, QA, E-commerce (Deco, VTEX)`;
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
        cursor: {
            desc: 'Set cursor style: default, crosshair, fancy',
            exec: (args) => {
                if (!window.matchMedia('(pointer: fine)').matches)
                    return currentLang === 'pt' ? 'Cursor customizado não disponível em dispositivos touch.' : 'Custom cursor not available on touch devices.';
                const modes = ['default', 'crosshair', 'fancy'];
                const current = document.documentElement.getAttribute('data-cursor') || 'default';
                if (!args || args.length === 0)
                    return `${currentLang === 'pt' ? 'Cursor atual' : 'Current'}: <b>${current}</b>\n${currentLang === 'pt' ? 'Disponíveis' : 'Available'}: ${modes.join(', ')}\nUsage: cursor &lt;mode&gt;`;
                const mode = args[0].toLowerCase();
                if (!modes.includes(mode)) return `Invalid mode. Try: ${modes.join(', ')}`;
                document.documentElement.setAttribute('data-cursor', mode);
                localStorage.setItem('cursorMode', mode);
                sound.playToggle();
                return `Cursor set to: <b>${mode}</b>`;
            }
        },
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
            desc: 'Display system information',
            exec: () => {
                const theme = document.documentElement.getAttribute('data-theme') || 'light';
                const uptimeSec = Math.floor((Date.now() - pageLoadTime) / 1000);
                const uptimeStr = uptimeSec < 60 ? `${uptimeSec}s` : `${Math.floor(uptimeSec / 60)}m ${uptimeSec % 60}s`;
                const ua = navigator.userAgent;
                const browser = ua.includes('Firefox') ? 'Firefox' : ua.includes('Edg') ? 'Edge' : ua.includes('Chrome') ? 'Chrome' : ua.includes('Safari') ? 'Safari' : 'Unknown';
                const resolution = `${window.screen.width}x${window.screen.height}`;
                const lbl = 'color:var(--link);font-weight:bold;';
                const palette = ['#ff5f56','#ffbd2e','#27c93f','#2196f3','#9c27b0','#ff9800','#00bcd4','#607d8b'];
                const blocks = palette.map(c => `<span style="background:${c};color:${c};border-radius:2px;"> ██ </span>`).join('');

                const artLines = [
                    '     .------.',
                    '    / o    o \\',
                    '   |   \\__/  |',
                    '    \\        /',
                    "     '------'",
                    '     |      |',
                    '    /        \\',
                ].join('\n');

                const infoLines = [
                    `<span style="${lbl}">visitor</span>@<span style="${lbl}">pedroffeitosa</span>`,
                    '─────────────────────────────',
                    `<span style="${lbl}">OS</span>:         PortfolioOS v2.0`,
                    `<span style="${lbl}">Host</span>:       pedroffeitosa.github.io`,
                    `<span style="${lbl}">Uptime</span>:     ${uptimeStr}`,
                    `<span style="${lbl}">Theme</span>:      ${theme}`,
                    `<span style="${lbl}">Language</span>:   ${currentLang === 'pt' ? 'Português' : 'English'}`,
                    `<span style="${lbl}">Browser</span>:    ${browser}`,
                    `<span style="${lbl}">Resolution</span>: ${resolution}`,
                    `<span style="${lbl}">Stack</span>:      React · TS · Node · AI`,
                    '',
                    blocks,
                ].join('\n');

                return [
                    '<div style="display:flex;gap:20px;align-items:flex-start;font-size:12px;">',
                    `<pre style="color:#27c93f;line-height:1.6;margin:0;">${artLines}</pre>`,
                    `<div style="white-space:pre-wrap;line-height:1.6;">${infoLines}</div>`,
                    '</div>'
                ].join('');
            }
        },
        ask: {
            desc: 'Ask the AI Assistant a question',
            exec: (args) => {
                if (!args || args.length === 0) return 'Usage: ask <your question>';
                const question = args.join(' ');
                if (typeof AIChat !== 'undefined') {
                    const response = AIChat.generateResponse(question);
                    return `<b>AI Assistant:</b> ${response}`;
                }
                return 'AI Assistant is initializing...';
            }
        },
        fortune: {
            desc: 'Display a random technical quote or easter egg',
            exec: () => `<i>${getFortune()}</i>`
        },
        snake: {
            desc: 'Play Snake game (arrow keys to move, Q/Esc to quit)',
            exec: () => { startSnake(); return null; }
        },
        history: {
            desc: 'Show command history',
            exec: () => {
                if (commandHistory.length === 0) return currentLang === 'pt' ? 'Nenhum comando no histórico.' : 'No commands in history.';
                return commandHistory.map((cmd, i) => `  ${String(i + 1).padStart(3)}  ${cmd}`).join('\n');
            }
        }
    };

    const getFortune = () => {
        const quotes = translations[currentLang].fortune_quotes;
        return quotes[Math.floor(Math.random() * quotes.length)];
    };

    const processCommand = (cmdStr) => {
        const trimmed = cmdStr.trim();
        if (!trimmed && !contactFlow.active) return;
        if (contactFlow.active) { handleContactFlow(trimmed); return; }

        if (trimmed) {
            if (commandHistory.length === 0 || commandHistory[commandHistory.length - 1] !== trimmed) {
                commandHistory.push(trimmed);
            }
            historyIndex = -1;
            tempDraft = '';
        }

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
            
            if (e.key === 'Enter') {
                processCommand(terminalInput.value);
                terminalInput.value = '';
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (commandHistory.length > 0) {
                    if (historyIndex === -1) {
                        tempDraft = terminalInput.value;
                        historyIndex = commandHistory.length - 1;
                    } else if (historyIndex > 0) {
                        historyIndex--;
                    }
                    terminalInput.value = commandHistory[historyIndex];
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (historyIndex !== -1) {
                    if (historyIndex < commandHistory.length - 1) {
                        historyIndex++;
                        terminalInput.value = commandHistory[historyIndex];
                    } else {
                        historyIndex = -1;
                        terminalInput.value = tempDraft;
                    }
                }
            } else if (e.key === 'Tab') {
                e.preventDefault();
                const partial = terminalInput.value.split(' ')[0].toLowerCase();
                if (!partial) return;
                const matches = Object.keys(commands).filter(cmd => cmd.startsWith(partial));
                if (matches.length === 1) {
                    terminalInput.value = matches[0];
                } else if (matches.length > 1) {
                    const logEntry = document.createElement('div');
                    logEntry.className = 'cmd-logs';
                    const respLine = document.createElement('div');
                    respLine.className = 'cmd-response';
                    respLine.textContent = matches.join('   ');
                    logEntry.appendChild(respLine);
                    terminalOutput.appendChild(logEntry);
                    terminalOutput.scrollTop = terminalOutput.scrollHeight;
                }
            }
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

// --- PWA Install Logic ---
let deferredPrompt;
const pwaPrompt = document.getElementById('pwa-install-prompt');
const pwaInstallBtn = document.getElementById('pwa-install');
const pwaCancelBtn = document.getElementById('pwa-cancel');
const pwaMessage = document.getElementById('pwa-prompt-message');

const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;

if (!isStandalone) {
    if (isIOS) {
        // Show iOS instructions after 3 seconds
        setTimeout(() => {
            const hasDismissed = localStorage.getItem('pwaPromptDismissed');
            if (!hasDismissed && pwaPrompt && pwaMessage) {
                pwaMessage.innerText = translations[currentLang].pwa_ios_msg;
                if (pwaInstallBtn) pwaInstallBtn.style.display = 'none';
                pwaPrompt.classList.remove('pwa-prompt-hidden');
            }
        }, 3000);
    }

    window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
        // Stash the event so it can be triggered later.
        deferredPrompt = e;
        
        const hasDismissed = localStorage.getItem('pwaPromptDismissed');
        if (!hasDismissed && pwaPrompt) {
            pwaPrompt.classList.remove('pwa-prompt-hidden');
        }
    });
}

if (pwaInstallBtn) {
    pwaInstallBtn.addEventListener('click', async () => {
        if (!deferredPrompt) return;
        pwaPrompt.classList.add('pwa-prompt-hidden');
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response to the install prompt: ${outcome}`);
        deferredPrompt = null;
    });
}

if (pwaCancelBtn) {
    pwaCancelBtn.addEventListener('click', () => {
        if (pwaPrompt) pwaPrompt.classList.add('pwa-prompt-hidden');
        localStorage.setItem('pwaPromptDismissed', 'true');
    });
}

// --- Service Worker Registration ---
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('SW Registered!', reg))
            .catch(err => console.log('SW Registration failed:', err));
    });
}

// --- AI Chatbot Implementation ---
const AIChat = {
    kb: {
        en: {
            who: "João is a Software Engineer & LLM Trainer specialized in React, Node.js, and AI. He's currently at Revelo.",
            skills: "João excels in React, TypeScript, Node.js, Tailwind, Algorithms Solving, AWS, and AI/LLM Training (RLHF).",
            experience: "João has worked at companies like Revelo, Turing, Dilis Studio, IH Store, and AbInBev. He's an expert in e-commerce and AI-driven platforms.",
            projects: "Notable projects include AmeoPet (Pet Care), MCPWeather (Custom Protocol), and a Ruby Chess Engine.",
            chess: "João is a chess enthusiast! His Lichess blitz rating is around 1900+ (check the widget for the live value!).",
            contact: "You can reach João via email at jppfeitosa@gmail.com or on LinkedIn at /in/pedroffeitosa.",
            hobbies: "Besides coding and chess, João enjoy exploring AI tech and contributing to open-source.",
            default: "I'm not exactly sure about that. Try asking about 'experience', 'skills', or 'projects'!"
        },
        pt: {
            who: "João é um Engenheiro de Software e Treinador de LLM especializado em React, Node.js e IA. Atualmente está na Revelo.",
            skills: "João domina React, TypeScript, Node.js, Tailwind, Resolução de Algoritmos, AWS e Treinamento de AI/LLM (RLHF).",
            experience: "João trabalhou em empresas como Revelo, Turing, Dilis Studio, IH Store e AbInBev. É especialista em e-commerce e plataformas baseadas em IA.",
            projects: "Projetos de destaque incluem AmeoPet (Pet Care), MCPWeather (Protocolo Customizado) e um Motor de Xadrez em Ruby.",
            chess: "João adora xadrez! O rating blitz dele no Lichess é 1900+ (veja o valor atualizado no widget!).",
            contact: "Você pode falar com o João pelo e-mail jppfeitosa@gmail.com ou pelo LinkedIn em /in/pedroffeitosa.",
            hobbies: "Além de programar e jogar xadrez, o João gosta de explorar tecnologias de IA e contribuir para open-source.",
            default: "Não tenho certeza sobre isso. Tente perguntar sobre 'experiência', 'habilidades' ou 'projetos'!"
        }
    },

    generateResponse: function(input) {
        const text = input.toLowerCase();
        const lang = (typeof currentLang !== 'undefined') ? currentLang : 'en';
        const data = this.kb[lang];

        if (text.includes("quem") || text.includes("who") || text.includes("joao") || text.includes("joão")) return data.who;
        if (text.includes("skill") || text.includes("habilidade") || text.includes("stack") || text.includes("tecnologi")) return data.skills;
        if (text.includes("exp") || text.includes("carreira") || text.includes("trabalho") || text.includes("work") || text.includes("career")) return data.experience;
        if (text.includes("proj") || text.includes("feito")) return data.projects;
        if (text.includes("chess") || text.includes("xadrez") || text.includes("rating")) return data.chess;
        if (text.includes("contato") || text.includes("contact") || text.includes("email") || text.includes("falar")) return data.contact;
        if (text.includes("hobby") || text.includes("gosta")) return data.hobbies;

        return data.default;
    },

    init: function() {
        const trigger = document.getElementById('ai-chat-trigger');
        const windowEl = document.getElementById('ai-chat-window');
        const closeBtn = document.getElementById('close-chat');
        const chatForm = document.getElementById('chat-form');
        const chatInput = document.getElementById('chat-input');
        const messagesContainer = document.getElementById('chat-messages');
        const typingIndicator = document.querySelector('.typing-wrapper');

        if (!trigger || !windowEl) return;

        const addMessage = (text, sender) => {
            const msgEl = document.createElement('div');
            msgEl.className = `message ${sender}`;
            msgEl.innerText = text;
            messagesContainer.appendChild(msgEl);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        };

        const showBotResponse = (question) => {
            typingIndicator.style.display = 'block';
            messagesContainer.scrollTop = messagesContainer.scrollHeight;

            setTimeout(() => {
                typingIndicator.style.display = 'none';
                const response = this.generateResponse(question);
                addMessage(response, 'bot');
                if (typeof sound !== 'undefined') sound.playBeep();
            }, 800 + Math.random() * 1000);
        };

        trigger.addEventListener('click', () => {
            const isOpening = windowEl.style.display !== 'flex';
            windowEl.style.display = isOpening ? 'flex' : 'none';
            if (isOpening) {
                winMgr.bringToFront(windowEl);
                if (messagesContainer.children.length === 0) {
                    const welcome = (typeof translations !== 'undefined' && translations[currentLang]) ? translations[currentLang].ai_chat_welcome : "Hi!";
                    addMessage(welcome, 'bot');
                }
                chatInput.focus();
            }
            if (typeof sound !== 'undefined') sound.playToggle();
        });

        closeBtn.addEventListener('click', () => {
            windowEl.style.display = 'none';
            if (typeof sound !== 'undefined') sound.playToggle();
        });

        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = chatInput.value.trim();
            if (!text) return;

            addMessage(text, 'user');
            chatInput.value = '';
            if (typeof sound !== 'undefined') sound.playKeystroke();

            showBotResponse(text);
        });
    }
};

// --- Custom Cursor ---
if (window.matchMedia('(pointer: fine)').matches) {
    const curDot = document.createElement('div');
    curDot.className = 'cursor-dot';
    const curRing = document.createElement('div');
    curRing.className = 'cursor-ring';
    document.body.appendChild(curDot);
    document.body.appendChild(curRing);

    let mx = -100, my = -100, rx = -100, ry = -100;

    document.addEventListener('mousemove', (e) => {
        mx = e.clientX;
        my = e.clientY;
        curDot.style.left = mx + 'px';
        curDot.style.top = my + 'px';
    });

    (function animRing() {
        rx += (mx - rx) * 0.12;
        ry += (my - ry) * 0.12;
        curRing.style.left = rx + 'px';
        curRing.style.top = ry + 'px';
        requestAnimationFrame(animRing);
    })();

    document.addEventListener('mouseleave', () => { curDot.classList.add('cur-hidden'); curRing.classList.add('cur-hidden'); });
    document.addEventListener('mouseenter', () => { curDot.classList.remove('cur-hidden'); curRing.classList.remove('cur-hidden'); });

    const addCursorHover = (selector) => {
        document.querySelectorAll(selector).forEach(el => {
            el.addEventListener('mouseenter', () => { curDot.classList.add('cur-hover'); curRing.classList.add('cur-hover'); });
            el.addEventListener('mouseleave', () => { curDot.classList.remove('cur-hover'); curRing.classList.remove('cur-hover'); });
        });
    };

    addCursorHover('a, button, [role="button"], .stack-item, .lang-option, .exp-toggle-btn');

    const savedCursor = localStorage.getItem('cursorMode') || 'default';
    document.documentElement.setAttribute('data-cursor', savedCursor);
}

// Initialize the Chatbot
AIChat.init();
});
