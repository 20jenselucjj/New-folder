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
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    });
    
    // Testimonials slider functionality
    const testimonialSlider = document.getElementById('testimonialSlider');
    const testimonials = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentIndex = 0;
    const totalTestimonials = testimonials.length;
    
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
    
    prevBtn.addEventListener('click', () => {
        showTestimonial(currentIndex - 1);
    });
    
    nextBtn.addEventListener('click', () => {
        showTestimonial(currentIndex + 1);
    });
    
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
    
    // FAQ functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
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
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // You would typically send this data to a server
            console.log('Form submission:', { name, email, subject, message });
            
            // Show success message (in a real app, this would happen after successful API response)
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
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
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelector('.nav-links a.active')?.classList.remove('active');
                document.querySelector(`.nav-links a[href="#${sectionId}"]`)?.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Initialize the page
    updateActiveNavLink();
});
