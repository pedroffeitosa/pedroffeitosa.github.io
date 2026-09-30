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
    let roleFirstLoad = true;

    const translations = {
        en: {
            lang_en_label: "Switch language to English",
            lang_pt_label: "Switch language to Portuguese",
            meta_description: "Portfolio of João Pedro Feitosa - Full Stack Software Engineer. TypeScript, React, Node.js, Python, and AI products.",
            system_status: "SYSTEM_ACTIVE", role_main: "Full Stack Software Engineer",
            check_projects: "Projects",
            terminal_tooltip: "Open Terminal (Ctrl+B / `)",
            career_title: "// Career",
            career_text: "Full stack software engineer with 5+ years building production web applications in TypeScript, React, Node.js, and Python. At Turing I build the frontend of a human-in-the-loop platform that produces LLM training data, and I build and run Corrija+, an AI grading SaaS for teachers, end to end. Previously led e-commerce builds for clients at PaveCX.",
            stack_title: "// Main Stack & Expertise",
            experience_title: "// Experience",
            projects_title: "// Featured Projects",
            connect_title: "// Connect & Status",
            chess_rating: "Chess Blitz Rating",
            chess_pawn: "♞",
            connect_current: "Currently at:",
            exp_turing_role_main: "Software Engineer",
            exp_turing_location: ", Remote",
            exp_turing_date: "Jul 2025 - Present",
            exp_turing_1: "Built the React frontend of a human-in-the-loop annotation platform used by thousands of annotators to produce LLM training data for frontier AI labs.",
            exp_turing_2: "Redesigned the task-batch release flow and the evaluator and QA interfaces.",
            exp_turing_3: "Made filtering incremental with lazy loading and caching, so users no longer reloaded the full dataset on every change.",
            exp_turing_4: "Produced RLHF preference data and gold-standard evaluations of model-generated code.",
            exp_revelo_role_main: "LLM Trainer (part-time)",
            exp_revelo_location: ", Remote",
            exp_revelo_date: "Feb 2026 - Present",
            exp_revelo_1: "Build full-stack SPAs and programming tasks in TypeScript, Python, Java, Ruby, and COBOL to train and evaluate frontier models.",
            exp_pave_role_main: "Full Stack Engineer",
            exp_pave_location: ", Remote",
            exp_pave_date: "Aug 2023 - Oct 2025",
            exp_pave_1: "IH Store (Jun 2024 - Oct 2025): led a team of 2 engineers and 1 designer to build a home decor e-commerce platform from scratch on Deco.cx, scoring 100 on PageSpeed, with ERP, CRM, cashback, and Meta, Google, and TikTok Ads integrations.",
            exp_pave_2: "Dilis (Jun 2024 - Sep 2025): architected an AWS-backed event platform for a brand activation campaign: auth, image uploads, and event management.",
            exp_pave_3: "True Source, via Wave Commerce (Feb - May 2024): Preact components on Deco.cx from Figma, plus the call center section, accessibility, and SEO.",
            exp_pave_4: "Integralys (Nov 2023 - Jan 2024): migrated a legacy PHP app to React and TypeScript from Figma designs.",
            exp_pave_5: "Velocità, via TEC4U (Aug - Oct 2023): product listing, product detail, and landing pages on Deco.cx.",
            exp_triilha_role_main: "Full Stack Engineer",
            exp_triilha_location: ", João Pessoa, PB",
            exp_triilha_date: "Apr 2022 - Jul 2023",
            exp_triilha_1: "Built a Scrum productivity platform with React, Node.js, and PostgreSQL.",
            exp_triilha_2: "Also served as product manager and Scrum Master.",
            exp_goldenbi_role_main: "Founder & Full Stack Developer",
            exp_goldenbi_location: ", João Pessoa, PB",
            exp_goldenbi_date: "Jul 2021 - May 2022",
            exp_goldenbi_1: "Founded a data and web consultancy for 4 SMBs: sales analysis, customer segmentation, and demand forecasting with Python (pandas, scikit-learn) and SQL.",
            exp_goldenbi_2: "Built e-commerce sites with WordPress, PHP, and JavaScript.",
            exp_abinbev_role_main: "Sales Performance Analyst",
            exp_abinbev_location: ", Campina Grande, PB",
            exp_abinbev_date: "Jan 2020 - Apr 2021",
            exp_abinbev_1: "Automated the daily sales-vs-target pipeline with Python and SQL, generating goals for the sales team and saving 40+ minutes a day.",
            exp_abinbev_2: "Built Power BI sales dashboards for Paraíba, later adopted across the entire Northeast region.",
            proj_corrija_title: "1. Corrija+ - AI Grading for Teachers",
            proj_corrija_desc: "AI grading SaaS for teachers that I build and run solo: React web app, Expo mobile app, and a Node.js API on Google Cloud with async AI processing, payments, IaC, and CI. Cut the initial bundle by 92% with code splitting.",
            proj_zepa_title: "2. ZEPA Machine - OS Simulator",
            proj_zepa_desc: "OS simulator for CS students: a TypeScript virtual machine with a custom assembler, scheduler, paged virtual memory, and file system.",
            connect_current_val: "Turing (Software Engineer) · Revelo (LLM Trainer, part-time)",

            cv_link: "Resume",
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
            lang_en_label: "Mudar idioma para Inglês",
            lang_pt_label: "Mudar idioma para Português",
            meta_description: "Portfólio de João Pedro Feitosa - Engenheiro de Software Full Stack. TypeScript, React, Node.js, Python e produtos com IA.",
            system_status: "SISTEMA_ATIVO",
            role_main: "Engenheiro de Software Full Stack",
            check_projects: "Projetos",
            terminal_tooltip: "Abrir Terminal (Ctrl+B / `)",
            career_title: "// Carreira",
            career_text: "Engenheiro de software full stack com mais de 5 anos construindo aplicações web em produção com TypeScript, React, Node.js e Python. Na Turing, construo o frontend de uma plataforma human-in-the-loop que produz dados de treinamento de LLMs, e construo e mantenho sozinho o Corrija+, um SaaS de correção com IA para professores. Antes, liderei projetos de e-commerce para clientes na PaveCX.",
            stack_title: "// Stack Principal & Expertise",
            experience_title: "// Experiência",
            projects_title: "// Projetos em Destaque",
            connect_title: "// Contato & Status",
            chess_rating: "Rating de Xadrez Blitz",
            chess_pawn: "♞",
            connect_current: "Atualmente na:",
            exp_turing_role_main: "Engenheiro de Software",
            exp_turing_location: ", Remoto",
            exp_turing_date: "Jul 2025 - Presente",
            exp_turing_1: "Construí o frontend em React de uma plataforma de anotação human-in-the-loop usada por milhares de anotadores para produzir dados de treinamento de LLMs para laboratórios de IA de ponta.",
            exp_turing_2: "Redesenhei o fluxo de liberação de lotes de tarefas e as interfaces de avaliação e QA.",
            exp_turing_3: "Tornei os filtros incrementais com lazy loading e cache, para que o usuário não recarregasse todos os dados a cada mudança.",
            exp_turing_4: "Produzi dados de preferência para RLHF e avaliações gold standard de código gerado por modelos.",
            exp_revelo_role_main: "Treinador de LLM (meio período)",
            exp_revelo_location: ", Remoto",
            exp_revelo_date: "Fev 2026 - Presente",
            exp_revelo_1: "Construo SPAs full stack e tarefas de programação em TypeScript, Python, Java, Ruby e COBOL para treinar e avaliar modelos de ponta.",
            exp_pave_role_main: "Engenheiro Full Stack",
            exp_pave_location: ", Remoto",
            exp_pave_date: "Ago 2023 - Out 2025",
            exp_pave_1: "IH Store (Jun 2024 - Out 2025): liderei um time de 2 engenheiros e 1 designer na construção, do zero, de um e-commerce de decoração no Deco.cx, com nota 100 no PageSpeed e integrações com ERP, CRM, cashback e Meta, Google e TikTok Ads.",
            exp_pave_2: "Dilis (Jun 2024 - Set 2025): arquitetei uma plataforma de eventos na AWS para uma campanha de ativação de marca: autenticação, upload de imagens e gestão de eventos.",
            exp_pave_3: "True Source, via Wave Commerce (Fev - Mai 2024): componentes Preact no Deco.cx a partir do Figma, além da seção de call center, acessibilidade e SEO.",
            exp_pave_4: "Integralys (Nov 2023 - Jan 2024): migrei uma aplicação PHP legada para React e TypeScript a partir do Figma.",
            exp_pave_5: "Velocità, via TEC4U (Ago - Out 2023): páginas de listagem, de produto e landing pages no Deco.cx.",
            exp_triilha_role_main: "Engenheiro Full Stack",
            exp_triilha_location: ", João Pessoa, PB",
            exp_triilha_date: "Abr 2022 - Jul 2023",
            exp_triilha_1: "Construí uma plataforma de produtividade Scrum com React, Node.js e PostgreSQL.",
            exp_triilha_2: "Também atuei como gerente de produto e Scrum Master.",
            exp_goldenbi_role_main: "Fundador & Desenvolvedor Full Stack",
            exp_goldenbi_location: ", João Pessoa, PB",
            exp_goldenbi_date: "Jul 2021 - Mai 2022",
            exp_goldenbi_1: "Fundei uma consultoria de dados e web para 4 pequenas e médias empresas: análise de vendas, segmentação de clientes e previsão de demanda com Python (pandas, scikit-learn) e SQL.",
            exp_goldenbi_2: "Construí sites de e-commerce com WordPress, PHP e JavaScript.",
            exp_abinbev_role_main: "Analista de Performance de Vendas",
            exp_abinbev_location: ", Campina Grande, PB",
            exp_abinbev_date: "Jan 2020 - Abr 2021",
            exp_abinbev_1: "Automatizei a rotina diária de vendas contra metas com Python e SQL, gerando os objetivos do time de vendas e economizando mais de 40 minutos por dia.",
            exp_abinbev_2: "Construí dashboards de vendas em Power BI para a Paraíba, depois adotados em todo o Nordeste.",
            proj_corrija_title: "1. Corrija+ - Correção com IA para Professores",
            proj_corrija_desc: "SaaS de correção com IA para professores, que construo e mantenho sozinho: app web em React, app mobile em Expo e API Node.js no Google Cloud, com processamento assíncrono de IA, pagamentos, IaC e CI. Reduzi o bundle inicial em 92% com code splitting.",
            proj_zepa_title: "2. ZEPA Machine - Simulador de Sistema Operacional",
            proj_zepa_desc: "Simulador de sistema operacional para estudantes de Computação: máquina virtual em TypeScript com assembler próprio, escalonador, memória virtual paginada e sistema de arquivos.",
            connect_current_val: "Turing (Engenheiro de Software) · Revelo (Treinador de LLM, meio período)",

            cv_link: "CV",
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

        const roleEl = document.getElementById('role-text');
        if (roleEl && typeof translations[lang] !== 'undefined') {
            const fullText = translations[lang].role_main;
            if (fullText) {
                const delay = roleFirstLoad ? 400 : 0;
                roleFirstLoad = false;
                roleEl.classList.remove('typing-cursor');
                roleEl.textContent = '';
                roleEl.classList.add('typing-cursor');
                let i = 0;
                const type = () => {
                    if (i < fullText.length) {
                        roleEl.textContent += fullText[i++];
                        setTimeout(type, 40 + Math.random() * 30);
                    } else {
                        setTimeout(() => roleEl.classList.remove('typing-cursor'), 1200);
                    }
                };
                setTimeout(type, delay);
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
    const scrollProgress = document.getElementById("scroll-progress");
    window.addEventListener("scroll", () => {
        if (scrollBtn) scrollBtn.style.display = window.scrollY > 180 ? "flex" : "none";
        if (scrollProgress) {
            const total = document.documentElement.scrollHeight - window.innerHeight;
            scrollProgress.style.width = total > 0 ? `${(window.scrollY / total) * 100}%` : '0%';
        }
    }, { passive: true });

    if (scrollBtn) scrollBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

    // --- Section Dot Nav ---
    const sectionDots = document.querySelectorAll('.section-dot');
    if (sectionDots.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const dot = document.querySelector(`.section-dot[href="#${entry.target.id}"]`);
                if (dot) dot.classList.toggle('active', entry.isIntersecting);
            });
        }, { threshold: 0.3 });

        document.querySelectorAll('.section[id]').forEach(section => observer.observe(section));

        sectionDots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(dot.getAttribute('href'));
                if (target) target.scrollIntoView({ behavior: 'smooth' });
            });
        });
    }

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

    const terminalOverlay = document.getElementById('terminal-overlay');
    const terminalWindow = document.getElementById('terminal-window');
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');

    const getTerminalTime = () => {
        const now = new Date();
        return `[${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}]`;
    };

    const terminalTimeEl = document.getElementById('terminal-time');
    if (terminalTimeEl) {
        terminalTimeEl.textContent = getTerminalTime();
        setInterval(() => { terminalTimeEl.textContent = getTerminalTime(); }, 60000);
    }

    let hasBooted = false;
    const bootLogs = [
        "BOOTING PortfolioOS v2.0...",
        "Checking system integrity... OK",
        "Loading modules: [SoundEngine, WindowManager]... DONE",
        "Establishing secure connection to @pedroffeitosa...",
        `Last login: ${new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 7).toLocaleString()} from 127.0.0.1`,
        ""
    ];

    const showBootSequence = () => {
        let i = 0;
        const addLog = () => {
            if (i < bootLogs.length) {
                const logEntry = document.createElement('div');
                logEntry.className = 'cmd-logs';
                logEntry.innerHTML = `<div class="cmd-response">${bootLogs[i]}</div>`;
                terminalOutput.appendChild(logEntry);
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
                i++;
                if (sound && sound.enabled) sound.playKeystroke();
                setTimeout(addLog, 40 + Math.random() * 100);
            } else {
                hasBooted = true;
                const quote = getFortune();
                const logEntry = document.createElement('div');
                logEntry.className = 'cmd-logs';
                logEntry.innerHTML = `<div class="cmd-response"><i>${quote}</i></div>`;
                terminalOutput.appendChild(logEntry);
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
            }
        };
        addLog();
    };

    const toggleTerminal = (show) => {
        if (!terminalOverlay || !terminalWindow) return;
        const shouldShow = (typeof show === 'boolean') ? show : (terminalWindow.style.display !== 'flex');

        terminalOverlay.style.display = shouldShow ? 'block' : 'none';
        terminalWindow.style.display = shouldShow ? 'flex' : 'none';

        if (shouldShow) {
            winMgr.bringToFront(terminalWindow);
            terminalInput.value = '';
            terminalInput.focus();

            if (!hasBooted && terminalOutput.children.length === 0) {
                showBootSequence();
            } else if (terminalOutput.children.length === 0) {
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
                "Usuário: Visitante\nFunção: Convidado\nNível de Acesso: Leitura\n\nBio: Engenheiro de Software Full Stack. TypeScript, React, Node.js, Python e produtos com IA." :
                "User: Visitor\nRole: Guest\nAccess Level: Read-Only\n\nBio: Full Stack Software Engineer. TypeScript, React, Node.js, Python, and AI products."
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
            exec: () => currentLang === 'pt' ? `1. Corrija+ - Correção com IA para Professores (corrijamais.com)\n2. ZEPA Machine - Simulador de Sistema Operacional (zepa.online)` : `1. Corrija+ - AI Grading for Teachers (corrijamais.com)\n2. ZEPA Machine - OS Simulator (zepa.online)`
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
                const palette = ['#ff5f56', '#ffbd2e', '#27c93f', '#2196f3', '#9c27b0', '#ff9800', '#00bcd4', '#607d8b'];
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
        cmdLine.innerHTML = `<span class="prompt"><span class="prompt-time">${getTerminalTime()}</span><span class="prompt-user">visitor</span><span class="prompt-host">@pedroffeitosa</span>:~$ </span><span>${trimmed}</span>`;
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
            const easterEggs = {
                sudo: () => 'Permission denied. Nice try. 😏',
                vim: () => 'Opening vim...\n\nJust kidding. You\'d never get out.',
                nano: () => 'nano is fine. But have you tried vim?\n(No cursor movement. You have been warned.)',
                emacs: () => 'An operating system disguised as a text editor.',
                ls: () => 'drwxr-xr-x  curiosity/\ndrwxr-xr-x  ambition/\n-rw-r--r--  coffee.txt\n-rw-r--r--  bugs_to_fix.log\n-rw-r--r--  .hidden_dreams',
                pwd: () => '/home/visitor/pedroffeitosa.github.io',
                cd: () => 'There are no directories here. Just vibes.',
                ping: (a) => `PING ${a[0] || 'unknown'}: Request timeout. (He's probably coding.)`,
                python: () => '>>> print("Hello from the portfolio!")\nHello from the portfolio!\n>>>',
                python3: () => '>>> print("Hello from the portfolio!")\nHello from the portfolio!\n>>>',
                node: () => 'Welcome to Node.js v22.0.0\n> ',
                make: () => "make: target 'me a sandwich' not found.",
                top: () => 'PID   USER     CPU%  CMD\n  1   visitor   99%  overthinking\n  2   visitor    1%  working',
                uptime: () => { const s = Math.floor((Date.now() - pageLoadTime) / 1000); return `up ${s < 60 ? s + 's' : Math.floor(s / 60) + 'm ' + (s % 60) + 's'} — no crashes yet.`; },
                reboot: () => 'Rebooting... just kidding. Refresh the page yourself.',
                shutdown: () => 'Shutdown aborted: too much left to build.',
                docker: () => 'Error: Cannot connect to the Docker daemon.\n(There is no Docker here. Only HTML and dreams.)',
                npm: (a) => a[0] === 'install' ? 'added 847 packages, 23 vulnerabilities found.\nRun `npm audit fix` to pretend you fixed them.' : 'npm: command not found in this dimension.',
                yarn: (a) => a[0] === 'add' ? `[1/4] Resolving packages...\n[2/4] Fetching packages...\n[3/4] Linking dependencies...\n[4/4] Building fresh packages... done.` : 'yarn: command not found in this dimension.',
                ssh: (a) => `ssh: connect to host ${a[0] || 'localhost'} port 22: Connection refused.`,
                curl: () => 'curl: (7) Failed to connect: no personality found at endpoint.',
                wget: () => 'Downloading talent... ████████████ 100%\nInstalling... failed. Not enough RAM.',
                grep: () => 'No patterns found (or maybe you\'re the pattern).',
                ps: () => 'PID  CMD\n  1  dreams\n  2  ambition\n  3  caffeine.service',
                touch: (a) => a[0] ? `touched ${a[0]}. It blushed.` : 'Usage: touch <file>',
                mv: () => 'Cannot move things. Everything is where it belongs.',
                cp: () => 'Cannot copy. This portfolio is one of a kind.',
                man: (a) => a[0] ? `No manual entry for ${a[0]}. Have you tried Stack Overflow?` : 'What manual? Just wing it.',
                kill: () => 'kill: no process to kill. Your vibe is fine.',
                chmod: () => 'chmod: permission already perfect.',
                brew: () => 'brew: installing dependencies... just kidding, this is a browser.',
                code: () => 'Opening VS Code... (please stand by, 47 extensions loading)',
            };

            let eggResponse = null;
            if (cmdName === 'rm' && parts.includes('-rf')) {
                eggResponse = '💥 Filesystem obliterated. Just kidding. Everything is fine.';
            } else if (cmdName === 'git') {
                const sub = parts[1];
                if (sub === 'blame') eggResponse = "It was me. It's always me. Sorry.";
                else if (sub === 'commit') eggResponse = '[main 1a2b3c4] "fix: final fix for real this time (again)"';
                else if (sub === 'push' && parts.includes('--force')) eggResponse = '⚠️  force push to main? Bold. Brave. Wrong.';
                else if (sub === 'status') eggResponse = 'On branch main\nYour branch is ahead of origin/main by ∞ commits.\n\nnothing to commit, portfolio is clean.';
                else eggResponse = "fatal: not a git repository (or the commits are vibes)";
            } else if (easterEggs[cmdName]) {
                eggResponse = easterEggs[cmdName](parts.slice(1));
            }

            if (eggResponse !== null) {
                const respLine = document.createElement('div');
                respLine.className = 'cmd-response';
                respLine.innerHTML = eggResponse.replace(/\n/g, '<br>');
                logEntry.appendChild(respLine);
                sound.playBeep();
            } else {
                const errorLine = document.createElement('div');
                errorLine.className = 'cmd-response cmd-error';
                errorLine.textContent = `Command not found: ${cmdName}. Type 'help' for options.`;
                logEntry.appendChild(errorLine);
                sound.playError();
                const termWin = document.querySelector('.terminal-window');
                if (termWin) {
                    termWin.classList.add('shake');
                    termWin.addEventListener('animationend', () => termWin.classList.remove('shake'), { once: true });
                }
            }
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
    const CHESS_CACHE_EXPIRY = 10 * 60 * 1000; // 10 minutes

    const updateChessUI = (rating) => {
        const ratingEl = document.getElementById("chess-rating-val");
        if (ratingEl) {
            ratingEl.textContent = rating;
            const container = document.getElementById("chess-widget");
            if (container) container.style.display = "flex";
        }
    };

    const fetchLichessRating = async () => {
        // Show the cached rating right away, then refresh it from Lichess
        let cached = null;
        try { cached = JSON.parse(localStorage.getItem(CHESS_CACHE_KEY)); } catch (e) { }
        if (cached && cached.rating) {
            updateChessUI(cached.rating);
            if (Date.now() - cached.timestamp < CHESS_CACHE_EXPIRY) return;
        }

        try {
            const response = await fetch("https://lichess.org/api/user/Pedxr0", { cache: "no-store" });
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

    // Delay Lichess API fetch until after page load (non-blocking)
    window.addEventListener('load', () => {
        setTimeout(fetchLichessRating, 2000);
    });

    // --- Service Worker Unregistration ---
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
            for (const registration of registrations) {
                registration.unregister()
                    .then(success => {
                        if (success) console.log('SW Unregistered successfully!');
                    })
                    .catch(err => console.log('SW Unregistration failed:', err));
            }
        });
    }


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

});
