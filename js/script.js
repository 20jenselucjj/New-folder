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

// Statistics counter animation
const statistics = document.querySelector('.statistics');
const counters = document.querySelectorAll('.stat-number');
let started = false;

function startCounters() {
    if (started) return;
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const current = +counter.innerText;
        const increment = target / 100;
        if (current < target) {
            counter.innerText = Math.ceil(current + increment);
            setTimeout(startCounters, 30);
        } else {
            counter.innerText = target;
        }
    });
    started = true;
}

function checkIfInView() {
    if (statistics) {
        const rect = statistics.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            counters.forEach(counter => counter.classList.add('animate'));
            startCounters();
            window.removeEventListener('scroll', checkIfInView);
        }
    }
}

window.addEventListener('scroll', checkIfInView);
checkIfInView(); // Initial check

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

// ...existing code below...
