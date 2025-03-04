// ...existing code above...

// Consolidated Back to Top Button handling
const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('active', 'show');
    } else {
        backToTopBtn.classList.remove('active', 'show');
    }
});

backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add active class to nav items based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    // Remove active class from all nav links first
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });
    
    // If we're near the top of the page, activate the home link
    if (scrollPosition < 300) {
        document.querySelector('.nav-links a[href="#home"]').classList.add('active');
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
updateActiveNavLink(); // Ensure correct highlight on page load

// Adjust layout based on screen size for responsive behaviors
function adjustLayout() {
    if (window.innerWidth <= 768) {
        document.body.classList.add('mobile-layout');
    } else {
        document.body.classList.remove('mobile-layout');
    }
}
window.addEventListener('resize', adjustLayout);
adjustLayout();  // run on initial load

// FIXED: Statistics counter animation with proper variable scope
document.addEventListener('DOMContentLoaded', function() {
    // Statistics variables defined with proper scope
    const statistics = document.querySelector('.statistics');
    const statNumbers = document.querySelectorAll('.stat-number');
    const statLabels = document.querySelectorAll('.stat-label');
    let statsStarted = false;

    // Completely rewritten statistics counter function
    function animateStatistics() {
        if (!statistics || statsStarted) return;
        
        // Make all stats and labels visible as a fallback
        statNumbers.forEach(num => {
            num.style.opacity = "1";
            num.style.color = "white"; // Ensure text is visible
            num.style.textShadow = "none"; // Remove glow effect
        });
        
        // Animate the counting
        statNumbers.forEach(counter => {
            // Get target number
            const target = parseInt(counter.getAttribute('data-count'));
            // Start from 0
            let count = 0;
            // Calculate increment step for smooth animation
            const increment = Math.ceil(target / 40);
            
            // Add animation class to number, suffix, label and description siblings
            counter.classList.add('animate');
            
            // Find and animate siblings
            const suffix = counter.nextElementSibling;
            const label = suffix?.nextElementSibling;
            const description = label?.nextElementSibling;
            
            if (suffix) suffix.classList.add('animate');
            if (label) label.classList.add('animate');
            if (description) description.classList.add('animate');
            
            // Create counter interval
            const timer = setInterval(() => {
                count += increment;
                // Update the displayed number
                counter.textContent = count;
                
                // Stop when target is reached or exceeded
                if (count >= target) {
                    counter.textContent = target; // Set exact final value
                    clearInterval(timer);
                }
            }, 50); // Update every 50ms for smooth animation
        });
        
        statsStarted = true;
    }

    // Improved visibility detection for statistics
    function checkStatsVisibility() {
        if (!statistics || statsStarted) return;
        
        const rect = statistics.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Start animation when statistics section is in view
        if (rect.top <= windowHeight * 0.8 && rect.bottom >= 0) {
            animateStatistics();
            // Remove scroll listener once animation starts
            window.removeEventListener('scroll', checkStatsVisibility);
        }
    }

    // Add scroll listener to check when statistics are visible
    window.addEventListener('scroll', checkStatsVisibility);
    
    // Also check on page load in case statistics are already visible
    checkStatsVisibility();
    
    // Enhanced Testimonials slider functionality with fixed navigation
    function initTestimonialSlider() {
        const testimonialSlider = document.getElementById('testimonialSlider');
        const testimonials = document.querySelectorAll('.testimonial-card');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        if (!testimonialSlider || !testimonials.length) return;
        
        let currentIndex = 0;
        const totalTestimonials = testimonials.length;
        let autoplayInterval;
        let isAnimating = false;
        
        // Create indicators
        const indicatorsContainer = document.createElement('div');
        indicatorsContainer.className = 'testimonial-indicators';
        
        // Make sure we only add indicators once
        const existingIndicators = testimonialSlider.parentElement.querySelector('.testimonial-indicators');
        if (!existingIndicators) {
            testimonialSlider.parentElement.appendChild(indicatorsContainer);
            
            // Add indicators
            for (let i = 0; i < totalTestimonials; i++) {
                const indicator = document.createElement('div');
                indicator.className = 'testimonial-indicator' + (i === 0 ? ' active' : '');
                indicator.addEventListener('click', () => {
                    if (!isAnimating) showTestimonial(i);
                });
                indicatorsContainer.appendChild(indicator);
            }
        }
        
        const indicators = document.querySelectorAll('.testimonial-indicator');
        
        // Enhanced show testimonial function with animation lock
        function showTestimonial(index) {
            if (isAnimating) return;
            isAnimating = true;
            
            if (index < 0) {
                currentIndex = totalTestimonials - 1;
            } else if (index >= totalTestimonials) {
                currentIndex = 0;
            } else {
                currentIndex = index;
            }
            
            // Update active class for cards
            testimonials.forEach((card, i) => {
                card.classList.toggle('active', i === currentIndex);
            });
            
            // Update indicators
            indicators.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
            
            // Smoothly scroll to the current testimonial
            const targetTestimonial = testimonials[currentIndex];
            const sliderRect = testimonialSlider.getBoundingClientRect();
            const targetRect = targetTestimonial.getBoundingClientRect();
            
            const scrollLeft = testimonialSlider.scrollLeft + targetRect.left - sliderRect.left - 
                              (sliderRect.width - targetRect.width) / 2;
                              
            testimonialSlider.scrollTo({
                left: scrollLeft,
                behavior: 'smooth'
            });
            
            // Release animation lock after transition completes
            setTimeout(() => {
                isAnimating = false;
            }, 500);
        }
        
        // Improved autoplay with smooth transitions
        function startAutoplay() {
            stopAutoplay();
            autoplayInterval = setInterval(() => {
                showTestimonial(currentIndex + 1);
            }, 5000); // Change testimonial every 5 seconds
        }
        
        function stopAutoplay() {
            clearInterval(autoplayInterval);
        }
        
        // Ensure navigation buttons work by directly adding event listeners
        if (prevBtn) {
            prevBtn.onclick = function() {
                stopAutoplay();
                showTestimonial(currentIndex - 1);
                startAutoplay();
            };
        }
        
        if (nextBtn) {
            nextBtn.onclick = function() {
                stopAutoplay();
                showTestimonial(currentIndex + 1);
                startAutoplay();
            };
        }
        
        // Make first slide active and initialize
        testimonials.forEach((card, i) => {
            card.classList.toggle('active', i === 0);
        });
        
        // Set initial slider position
        showTestimonial(0);
        
        // Start autoplay
        startAutoplay();
        
        // Pause autoplay when hovering over testimonials
        testimonialSlider.addEventListener('mouseenter', stopAutoplay);
        testimonialSlider.addEventListener('mouseleave', startAutoplay);
        testimonialSlider.addEventListener('touchstart', stopAutoplay, { passive: true });
        testimonialSlider.addEventListener('touchend', startAutoplay);
        
        // Stop any conflicting testimonial functionality
        window.testimonialSliderInitialized = true;
    }

    // Initialize testimonial slider only if not already initialized
    if (!window.testimonialSliderInitialized) {
        initTestimonialSlider();
    }
});
