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
});
