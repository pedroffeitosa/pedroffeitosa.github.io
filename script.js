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
});
