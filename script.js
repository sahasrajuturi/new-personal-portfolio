/**
 * Vogue-Inspired Portfolio Interactions
 * Sahasra Juturi Portfolio Script
 */

document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------
    // 1. Navigation Header Scroll Effect
    // ----------------------------------------------------
    const header = document.querySelector('.editorial-header');

    const checkHeaderScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', checkHeaderScroll);
    checkHeaderScroll(); // Run initially in case of reload

    // ----------------------------------------------------
    // 2. Smooth Scroll for Magazine Cover Headlines
    // ----------------------------------------------------
    const headlineBlocks = document.querySelectorAll('.headline-block');

    headlineBlocks.forEach(block => {
        block.addEventListener('click', () => {
            const targetId = block.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update URL hash without jumping
                history.pushState(null, null, `#${targetId}`);
            }
        });
    });

    // ----------------------------------------------------
    // 3. Scroll Fade-In Observer (Section Entrances)
    // ----------------------------------------------------
    const animatedSections = document.querySelectorAll('.section-fade');

    const sectionObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Section must be 15% visible to animate
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Once visible, we can unobserve if we want a one-shot animation
                observer.unobserve(entry.target);
            }
        });
    }, sectionObserverOptions);

    animatedSections.forEach(section => {
        sectionObserver.observe(section);
    });

    // ----------------------------------------------------
    // 4. Active Navigation Links Tracking
    // ----------------------------------------------------
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');

    const activeNavObserverOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px', // Trigger when section occupies center of viewport
        threshold: 0
    };

    const activeNavObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');

                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${currentId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }, activeNavObserverOptions);

    sections.forEach(section => {
        activeNavObserver.observe(section);
    });

    // ----------------------------------------------------
    // 5. Contact Form Submission Handling
    // ----------------------------------------------------
    const contactForm = document.getElementById('portfolio-contact-form');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.innerHTML;

            // Premium sending state
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'SENDING INQUIRY <i class="fa-solid fa-spinner fa-spin"></i>';

            // Simulate luxury asynchronous submission
            setTimeout(() => {
                const name = document.getElementById('form-name').value.trim();
                const email = document.getElementById('form-email').value.trim();
                const message = document.getElementById('form-message').value.trim();

                if (name && email && message) {
                    // Success State
                    formFeedback.textContent = `THANK YOU. SAHASRA HAS RECEIVED YOUR MESSAGE, ${name.toUpperCase()}.`;
                    formFeedback.className = 'form-feedback success';
                    formFeedback.classList.remove('hidden');

                    // Reset form fields
                    contactForm.reset();
                } else {
                    // Error State
                    formFeedback.textContent = 'PLEASE FILL IN ALL FORM FIELDS CORRECTLY.';
                    formFeedback.className = 'form-feedback error';
                    formFeedback.classList.remove('hidden');
                }

                // Restore submit button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;

                // Auto-hide feedback message after 5 seconds
                setTimeout(() => {
                    formFeedback.classList.add('hidden');
                }, 6000);

            }, 1500);
        });
    }

    // ----------------------------------------------------
    // 6. Interactive Cover Hover Visuals
    // ----------------------------------------------------
    const centerpieceImg = document.getElementById('centerpiece-image');

    if (centerpieceImg) {
        headlineBlocks.forEach(block => {
            block.addEventListener('mouseenter', () => {
                // Subtle zoom and tone shift on image when hovering headlines
                centerpieceImg.style.transform = 'scale(1.04)';
                centerpieceImg.style.filter = 'brightness(0.9) contrast(1.05)';
            });

            block.addEventListener('mouseleave', () => {
                // Reset centerpiece style
                centerpieceImg.style.transform = 'scale(1)';
                centerpieceImg.style.filter = 'none';
            });
        });
    }
    // ----------------------------------------------------
    // 7. Premium Vector Engine (Badminton, Basketball, Law, Writing, Music)
    // ----------------------------------------------------
    const ambientCanvas = document.getElementById('ambient-animation-canvas');
    if (ambientCanvas) {
        const context = ambientCanvas.getContext('2d');
        let viewW = ambientCanvas.width = window.innerWidth;
        let viewH = ambientCanvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            viewW = ambientCanvas.width = window.innerWidth;
            viewH = ambientCanvas.height = window.innerHeight;
        });

        // 5 Core thematic vectors combining modern typography shapes and symbols
        const vectorThematicIcons = [
            { icon: '⚖', font: 'Cormorant Garamond', label: 'LAW' },       // Law
            { icon: '🏀', font: 'Inter', label: 'BASKETBALL' },             // Basketball
            { icon: '🏸', font: 'Inter', label: 'BADMINTON' },              // Badminton
            { icon: '✒', font: 'Cormorant Garamond', label: 'WRITING' },    // Writing
            { icon: '🎵', font: 'Inter', label: 'MUSIC' }                   // Music
        ];

        class EditorialNode {
            constructor() {
                this.generate(true);
            }

            generate(initialSetup = false) {
                this.x = Math.random() * viewW;
                this.y = initialSetup ? (Math.random() * viewH) : (viewH + 40);
                this.speedMultiplier = 0.25 + Math.random() * 0.45;
                this.scaleFactor = 12 + Math.random() * 20;
                this.meta = vectorThematicIcons[Math.floor(Math.random() * vectorThematicIcons.length)];
                this.driftAngle = Math.random() * Math.PI * 2;
                this.rotationVelocity = (Math.random() - 0.5) * 0.005;
                this.sinFrequency = 0.003 + Math.random() * 0.004;
                this.sinAmplitude = 0.3 + Math.random() * 0.7;
            }

            advance() {
                this.y -= this.speedMultiplier;
                this.driftAngle += this.rotationVelocity;
                this.x += Math.sin(this.y * this.sinFrequency) * this.sinAmplitude;

                if (this.y < -60 || this.x < -60 || this.x > viewW + 60) {
                    this.generate(false);
                }
            }

            render(isDark) {
                context.save();
                context.translate(this.x, this.y);
                context.rotate(this.driftAngle);

                // Fluid color adaptations depending on section context
                if (isDark) {
                    context.fillStyle = 'rgba(214, 175, 55, 0.09)'; // Gold vectors on dark theme
                    context.shadowColor = 'rgba(214, 175, 55, 0.15)';
                } else {
                    context.fillStyle = 'rgba(140, 29, 64, 0.06)';  // Vogue Burgundy vectors on light theme
                    context.shadowColor = 'rgba(140, 29, 64, 0.08)';
                }

                context.shadowBlur = 10;
                context.font = `${this.scaleFactor}px "${this.meta.font}", serif`;
                context.textAlign = 'center';
                context.textBaseline = 'middle';
                context.fillText(this.meta.icon, 0, 0);
                context.restore();
            }
        }

        const nodesList = Array.from({ length: 18 }, () => new EditorialNode());

        function processFrame() {
            // Track if user is browsing dark-background elements
            const currentDarkElement = document.querySelector('.editorial-section.dark-bg.visible');
            const isDarkActive = !!currentDarkElement;

            if (isDarkActive) {
                document.body.classList.add('in-dark-section');
            } else {
                document.body.classList.remove('in-dark-section');
            }

            context.clearRect(0, 0, viewW, viewH);

            // Establish luxury mesh connection strings between sports, law, music and literature elements
            context.lineWidth = 0.5;
            for (let i = 0; i < nodesList.length; i++) {
                for (let j = i + 1; j < nodesList.length; j++) {
                    const xDiff = nodesList[i].x - nodesList[j].x;
                    const yDiff = nodesList[i].y - nodesList[j].y;
                    const distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);

                    if (distance < 240) {
                        const structuralOpacity = (1 - (distance / 240)) * (isDarkActive ? 0.08 : 0.05);
                        context.strokeStyle = isDarkActive ? `rgba(214, 175, 55, ${structuralOpacity})` : `rgba(140, 29, 64, ${structuralOpacity})`;
                        context.beginPath();
                        context.moveTo(nodesList[i].x, nodesList[i].y);
                        context.lineTo(nodesList[j].x, nodesList[j].y);
                        context.stroke();
                    }
                }
            }

            nodesList.forEach(node => {
                node.advance();
                node.render(isDarkActive);
            });

            requestAnimationFrame(processFrame);
        }
        processFrame();
    }
});
