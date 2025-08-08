document.addEventListener('DOMContentLoaded', () => {
    // Mobile hamburger menu toggle
    const hamburger = document.getElementById('hamburgerMenu');
    const navLinksEl = document.querySelector('.nav-links');
    if (hamburger && navLinksEl) {
        const toggleNav = () => {
            hamburger.classList.toggle('active');
            navLinksEl.classList.toggle('open');
        };
        hamburger.addEventListener('click', toggleNav);
        hamburger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleNav();
            }
        });
        navLinksEl.addEventListener('click', (e) => {
            if (e.target.closest('a')) {
                navLinksEl.classList.remove('open');
                hamburger.classList.remove('active');
            }
        });
    }

    // Scroll progress bar
    const progressBar = document.getElementById('scrollProgressBar');
    if (progressBar) {
        const updateProgress = () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = height > 0 ? (scrollTop / height) * 100 : 0;
            progressBar.style.width = scrolled + '%';
        };
        window.addEventListener('scroll', updateProgress, { passive: true });
        updateProgress();
    }

    // Dynamic project cards (add your projects here)
    const projects = [
        {
            title: "Student Performance Analysis System",
            description: "Developed a command-line application to manage and analyze student academic records, providing insights for educational improvement.",
            link: "https://github.com/NiranjanGhising/Student_Data_Analysis",
            details: {
                overview: "Developed a comprehensive command-line application to streamline student academic record management and analysis. This system provides educators and administrators with a powerful tool for data-driven decision-making, automating data analysis and visualization to enhance the accuracy of performance assessments and facilitate targeted educational strategies.",
                data: "The system utilizes simulated student academic data, including student names, subjects (English, Nepali, Math, Science, Social), and marks. It also incorporates a feature for dynamic user input to add new student records.",
                tools: "Python (NumPy for efficient numerical operations, Matplotlib for data visualization).",
                methodology: "The project follows a modular approach, with separate Python scripts for data initialization, user input, data display, insight generation, correlation analysis, and trend analysis. NumPy arrays are used as the primary data structure for efficient numerical computations. Matplotlib is integrated for clear visual representation of trends and correlations, including scatter plots for subject correlation and line plots for performance trends over time.",
                findings: "The system can quickly identify students requiring additional support or those excelling in specific areas. It pinpoints subjects where students collectively perform well or struggle, informing curriculum adjustments. It also reveals correlations between subject performances, suggesting interdependencies in learning, and visualizes long-term academic trends for individual students, enabling proactive intervention or recognition."
            }
        },
        
    ];

    const projectGrid = document.querySelector('.project-grid');
    const projectModal = document.getElementById('projectModal');
    const closeButton = document.querySelector('.close-button');
    const modalProjectTitle = document.getElementById('modalProjectTitle');
    const modalProjectOverview = document.getElementById('modalProjectOverview');
    const modalProjectData = document.getElementById('modalProjectData');
    const modalProjectTools = document.getElementById('modalProjectTools');
    const modalProjectMethodology = document.getElementById('modalProjectMethodology');
    const modalProjectFindings = document.getElementById('modalProjectFindings');
    const modalProjectLink = document.getElementById('modalProjectLink');
    const modalContent = document.querySelector('#projectModal .modal-content');
    let lastFocusedElement = null;

    projects.forEach((project, index) => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <h2>${project.title}</h2>
            <p>${project.description}</p>
            <button class="project-button view-details-button" data-project-index="${index}">View Details</button>
        `;
        card.tabIndex = 0; // Make card focusable
        card.setAttribute('aria-label', project.title);
        projectGrid.appendChild(card);
    });

    // Focus trap handler for modal
    function trapFocus(e) {
        if (!projectModal || projectModal.style.display !== 'block') return;
        const focusables = modalContent.querySelectorAll(
            'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.key === 'Tab') {
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    }

    // Open Modal
    projectGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('view-details-button')) {
            const projectIndex = e.target.dataset.projectIndex;
            const project = projects[projectIndex];

            modalProjectTitle.textContent = project.title;
            modalProjectOverview.textContent = project.details.overview;
            modalProjectData.textContent = project.details.data;
            modalProjectTools.textContent = project.details.tools;
            modalProjectMethodology.textContent = project.details.methodology;
            modalProjectFindings.textContent = project.details.findings;
            modalProjectLink.href = project.link;

            lastFocusedElement = document.activeElement;
            document.body.classList.add('modal-open');
            projectModal.style.display = 'block';
            setTimeout(() => {
                projectModal.classList.add('modal-fade-in');
                // Move focus into modal
                (closeButton || modalContent).focus();
            }, 10);
            projectModal.addEventListener('keydown', trapFocus);
        }
    });

    // Close Modal
    function closeModal() {
        projectModal.classList.remove('modal-fade-in');
        setTimeout(() => {
            projectModal.style.display = 'none';
            document.body.classList.remove('modal-open');
            projectModal.removeEventListener('keydown', trapFocus);
            // Restore focus to the triggering element
            if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
                lastFocusedElement.focus();
            }
        }, 200);
    }
    closeButton.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target == projectModal) {
            closeModal();
        }
    });
    window.addEventListener('keydown', (e) => {
        if (projectModal.style.display === 'block' && e.key === 'Escape') {
            closeModal();
        }
    });

    // Dark Mode Toggle
    const themeToggle = document.getElementById('checkbox');
    if (themeToggle) {
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme) {
            document.body.classList.add(currentTheme);
            if (currentTheme === 'dark-mode') themeToggle.checked = true;
        }
        themeToggle.addEventListener('change', () => {
            if (themeToggle.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light-mode');
            }
        });
    }

    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            backToTopBtn.style.display = scrollTop > 20 ? 'block' : 'none';
        }, { passive: true });
        backToTopBtn.addEventListener('click', () => {
            const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (prefersReduced) {
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    // Typing Animation for Hero Section
    const typingElement = document.getElementById('typing-animation');
    if (typingElement) {
        const typingTexts = [
            "Aspiring Data Analyst | Python & SQL Enthusiast",
            "Turning Data into Insights",
            "Passionate about Data Visualization & Analytics",
            "Ready to Solve Real-World Problems"
        ];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 70;
        let pauseTime = 1200;

        function type() {
            const currentText = typingTexts[textIndex];
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                if (charIndex === 0) {
                    isDeleting = false;
                    textIndex = (textIndex + 1) % typingTexts.length;
                    setTimeout(type, 400);
                } else {
                    setTimeout(type, typingSpeed / 2);
                }
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                if (charIndex === currentText.length) {
                    isDeleting = true;
                    setTimeout(type, pauseTime);
                } else {
                    setTimeout(type, typingSpeed);
                }
            }
        }
        type();
    }

    // Smooth scroll for anchor links (respect reduced motion)
    document.querySelectorAll('a.nav-anchor').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                    if (prefersReduced) target.scrollIntoView();
                    else target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Scroll-reveal IntersectionObserver
    const revealEls = document.querySelectorAll('.section-title, .skill-card, .certification-card, .project-grid, .personal-info, .social-links, .contact-container');
    if (revealEls.length && 'IntersectionObserver' in window) {
        revealEls.forEach(el => el.classList.add('reveal'));
        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        revealEls.forEach(el => io.observe(el));
    }

    // Register Service Worker (PWA)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('service-worker.js').catch(() => {});
        });
    }

    // Contact form inline UX (success/error)
    const contactForm = document.getElementById('contactForm');
    const contactStatus = document.getElementById('contactStatus');
    if (contactForm && contactStatus) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const formData = new FormData(contactForm);
            contactStatus.textContent = 'Sending...';
            contactStatus.className = 'form-status';
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
            }
            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    headers: { 'Accept': 'application/json' },
                    body: formData
                });
                if (response.ok) {
                    contactStatus.textContent = 'Thank you! Your message has been sent.';
                    contactStatus.classList.add('success');
                    contactForm.reset();
                } else {
                    const data = await response.json().catch(() => ({}));
                    contactStatus.textContent = data.error || 'Sorry, something went wrong. Please try again later.';
                    contactStatus.classList.add('error');
                }
            } catch (_) {
                contactStatus.textContent = 'Network error. Please check your connection and try again.';
                contactStatus.classList.add('error');
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Message';
                }
            }
        });
    }
});
