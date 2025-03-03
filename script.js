document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        });
    }

    // Dark mode functionality
    const body = document.querySelector('body');
    const darkModeBtn = document.getElementById('darkModeBtn');

    darkModeBtn.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
            darkModeBtn.querySelector('i').className = 'fas fa-moon';
        } else {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
            darkModeBtn.querySelector('i').className = 'fas fa-sun';
        }
    });

    // Check for saved theme preference or respect OS preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
        body.classList.add('dark-mode');
        darkModeBtn.querySelector('i').className = 'fas fa-sun';
    }

    // Function to show notifications
    function showNotification(message, type = 'info') {
        let notification = document.querySelector('.notification');
        if (!notification) {
            notification = document.createElement('div');
            notification.className = 'notification';
            document.body.appendChild(notification);
        }
        
        notification.textContent = message;
        notification.className = `notification ${type}`;
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 4000);
    }

    // Cookie consent functionality
    const cookieBanner = document.getElementById('cookieBanner');
    const cookieAccept = document.getElementById('cookieAccept');
    const cookieDecline = document.getElementById('cookieDecline');
    
    // Check if user has already made a choice
    const cookieChoice = localStorage.getItem('cookieConsent');
    
    if (!cookieChoice) {
        // Show the cookie banner after a short delay
        setTimeout(() => {
            cookieBanner.classList.add('active');
        }, 1000);
    }
    
    cookieAccept.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        cookieBanner.classList.remove('active');
        
        // Here you would typically initialize analytics or other cookie-dependent scripts
        console.log('Cookies accepted, analytics can be initialized');
    });
    
    cookieDecline.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'declined');
        cookieBanner.classList.remove('active');
        
        // Respect user's choice to decline cookies
        console.log('Cookies declined, no tracking will be done');
    });
    
    // Navigation toggle for mobile
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    
    navToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a nav link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Close mobile navigation
            navLinks.classList.remove('active');
            
            // Remove active class from all navigation links
            navItems.forEach(link => link.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
        });
    });
    
    // Testimonials slider functionality
    const testimonialSlider = document.getElementById('testimonialSlider');
    const testimonials = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentIndex = 0;
    const totalTestimonials = testimonials.length;
    let autoplayInterval;
    
    function showTestimonial(index) {
        if (index < 0) {
            currentIndex = totalTestimonials - 1;
        } else if (index >= totalTestimonials) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }
        
        const slideWidth = testimonials[0].offsetWidth;
        testimonialSlider.scrollLeft = slideWidth * currentIndex;
    }
    
    function startAutoplay() {
        autoplayInterval = setInterval(() => {
            showTestimonial(currentIndex + 1);
        }, 5000); // Change testimonial every 5 seconds
    }
    
    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }
    
    prevBtn.addEventListener('click', () => {
        stopAutoplay();
        showTestimonial(currentIndex - 1);
        startAutoplay();
    });
    
    nextBtn.addEventListener('click', () => {
        stopAutoplay();
        showTestimonial(currentIndex + 1);
        startAutoplay();
    });
    
    // Start autoplay
    startAutoplay();
    
    // Pause autoplay when hovering over testimonials
    testimonialSlider.addEventListener('mouseenter', stopAutoplay);
    testimonialSlider.addEventListener('mouseleave', startAutoplay);
    
    // Back to top button functionality
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Back to Top Button Logic
    const backToTopButton = document.getElementById('backToTop');
    
    // Show back to top button when scrolling down
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    // Smooth scroll to top when clicked
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // For smooth scrolling effect
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // FAQ functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                // Get the current active state of the clicked item
                const isActive = item.classList.contains('active');
                
                // Close all other FAQ items with smooth animation
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                });
                
                // Toggle current item after a slight delay if it wasn't active
                if (!isActive) {
                    setTimeout(() => {
                        item.classList.add('active');
                    }, 10); // Small delay helps with animation sequence
                }
            });
            
            // Allow keyboard navigation
            question.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    question.click();
                }
            });
            
            // Add tabindex for accessibility
            question.setAttribute('tabindex', '0');
            question.setAttribute('role', 'button');
            question.setAttribute('aria-expanded', 'false');
        });
    }
    
    // Statistics counter animation
    const statistics = document.querySelector('.statistics');
    const counters = document.querySelectorAll('.stat-number');
    let started = false;
    
    function startCounters() {
        if (started) return;
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const count = +counter.innerText;
            const increment = target / 100;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(() => startCounters(), 30);
            } else {
                counter.innerText = target;
            }
        });
        
        started = true;
    }
    
    // Start counter animation when statistics section is visible
    function checkIfInView() {
        if (statistics) {
            const rect = statistics.getBoundingClientRect();
            const isInViewport = (
                rect.top >= 0 &&
                rect.top <= (window.innerHeight || document.documentElement.clientHeight)
            );
            
            if (isInViewport) {
                startCounters();
                window.removeEventListener('scroll', checkIfInView);
            }
        }
    }
    
    window.addEventListener('scroll', checkIfInView);
    checkIfInView(); // Check on initial page load
    
    // Pricing toggle functionality
    const pricingToggle = document.getElementById('pricingToggle');
    if (pricingToggle) {
        pricingToggle.addEventListener('change', function() {
            document.body.classList.toggle('annual', this.checked);
        });
    }
    
    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const formInputs = contactForm.querySelectorAll('input, textarea');
        
        formInputs.forEach(input => {
            // Add focus effects
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
                if (this.value.trim() !== '') {
                    this.parentElement.classList.add('filled');
                } else {
                    this.parentElement.classList.remove('filled');
                }
                
                // Simple validation
                if (this.required && this.value.trim() === '') {
                    this.parentElement.classList.add('error');
                } else if (this.type === 'email' && !validateEmail(this.value) && this.value.trim() !== '') {
                    this.parentElement.classList.add('error');
                } else {
                    this.parentElement.classList.remove('error');
                }
            });
        });
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate all fields
            let isValid = true;
            formInputs.forEach(input => {
                if (input.required && input.value.trim() === '') {
                    input.parentElement.classList.add('error');
                    isValid = false;
                } else if (input.type === 'email' && !validateEmail(input.value)) {
                    input.parentElement.classList.add('error');
                    isValid = false;
                }
            });
            
            if (!isValid) {
                showNotification('Please fill in all required fields correctly.', 'error');
                return;
            }
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // You would typically send this data to a server
            console.log('Form submission:', { name, email, subject, message });
            
            // Show success message 
            showNotification('Thank you for your message! We will get back to you soon.', 'success');
            
            // Reset form
            contactForm.reset();
            formInputs.forEach(input => {
                input.parentElement.classList.remove('filled');
            });
        });
    }
    
    // Helper function to validate email
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get email address
            const email = this.querySelector('input[type="email"]').value;
            
            // You would typically send this to a server
            console.log('Newsletter subscription:', email);
            
            // Show success message
            alert('Thank you for subscribing to our newsletter!');
            
            // Reset form
            newsletterForm.reset();
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Skip for empty href or just "#"
            if (this.getAttribute('href') === '#' || this.getAttribute('href') === '') {
                return;
            }
            
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add active class to nav items based on scroll position
    function updateActiveNavLink() {
        // Only update active links based on scroll if user isn't actively clicking navigation
        if (window.navClickInProgress) return;
        
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        // Remove active class from all nav links first
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
        });
        
        // If we're near the top of the page, activate the home link
        if (scrollPosition < 300) {
            document.querySelector('.nav-links a[href="#home"]')?.classList.add('active');
            return;
        }
        
        // Otherwise check which section we're in
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelector(`.nav-links a[href="#${sectionId}"]`)?.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Initialize the page
    updateActiveNavLink();
    initRevealAnimations();
    revealOnScroll();
    
    // Enhanced scroll reveal functionality
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.reveal');
        
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const revealTop = element.getBoundingClientRect().top;
            const revealPoint = 150;
            
            // Add active class for reveal animation, but don't disrupt FAQ functionality
            if (revealTop < windowHeight - revealPoint) {
                // If it's a FAQ item, we don't want to toggle its open/closed state
                if (element.classList.contains('faq-item')) {
                    // Just add active to the reveal effect, not to the FAQ item itself
                    element.classList.add('reveal-active');
                } else {
                    // For non-FAQ elements, add the standard active class
                    element.classList.add('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', revealOnScroll);
    
    // Add reveal classes to elements
    function initRevealAnimations() {
        document.querySelectorAll('.feature-card').forEach((el, index) => {
            el.classList.add('reveal', 'reveal-up');
            el.style.transitionDelay = `${index * 0.1}s`;
        });
        
        document.querySelectorAll('.section-header').forEach(el => {
            el.classList.add('reveal', 'reveal-up');
        });
        
        document.querySelectorAll('.about-text').forEach(el => {
            el.classList.add('reveal', 'reveal-left');
        });
        
        document.querySelectorAll('.about-image').forEach(el => {
            el.classList.add('reveal', 'reveal-right');
        });
        
        document.querySelectorAll('.pricing-card').forEach((el, index) => {
            el.classList.add('reveal', 'reveal-up');
            el.style.transitionDelay = `${index * 0.1}s`;
        });
        
        // Modified: Don't add 'active' class to FAQ items on scroll reveal
        document.querySelectorAll('.faq-item').forEach((el, index) => {
            // Only add reveal classes, not active class
            el.classList.add('reveal', 'reveal-up');
            el.style.transitionDelay = `${index * 0.1}s`;
            
            // Make sure any existing active classes are removed on page load
            el.classList.remove('active');
        });
        
        document.querySelectorAll('.info-item').forEach((el, index) => {
            el.classList.add('reveal', 'reveal-up');
            el.style.transitionDelay = `${index * 0.1}s`;
        });
        
        document.querySelectorAll('.contact-form').forEach(el => {
            el.classList.add('reveal', 'reveal-left');
        });
        
        document.querySelectorAll('.contact-info').forEach(el => {
            el.classList.add('reveal', 'reveal-right');
        });
    }
    
    initRevealAnimations();
    revealOnScroll(); // Check on initial page load
    
    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            if (scrollPosition < 600) {
                const translateY = scrollPosition * 0.2;
                heroSection.style.backgroundPositionY = `-${translateY}px`;
            }
        });
    }

    // Scroll Progress Indicator functionality
    const scrollProgress = document.getElementById('scrollProgress');

    function updateScrollProgress() {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        
        scrollProgress.style.width = scrollPercentage + '%';
        
        // Add subtle glow effect when scrolling quickly
        scrollProgress.style.boxShadow = '0 1px 5px rgba(67, 97, 238, 0.5)';
        clearTimeout(scrollProgress.timeout);
        scrollProgress.timeout = setTimeout(() => {
            scrollProgress.style.boxShadow = '0 1px 3px rgba(67, 97, 238, 0.3)';
        }, 100);
    }

    window.addEventListener('scroll', updateScrollProgress);
});
