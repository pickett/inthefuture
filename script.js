// Cursor glow effect
const cursorGlow = document.querySelector('.cursor-glow');

document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// Scroll animations with Intersection Observer
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in-up class to elements and observe them
document.querySelectorAll('.project-card, .stat, .about-text, .contact-content').forEach(el => {
    el.classList.add('fade-in-up');
    observer.observe(el);
});

// Smooth scroll for nav links
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

// Navbar background on scroll
const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        nav.style.background = 'rgba(10, 10, 11, 0.9)';
        nav.style.backdropFilter = 'blur(10px)';
    } else {
        nav.style.background = 'linear-gradient(to bottom, rgba(10, 10, 11, 1) 0%, transparent 100%)';
        nav.style.backdropFilter = 'none';
    }

    lastScroll = currentScroll;
});

// Stagger animation for project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

// Hide scroll indicator after scrolling
const scrollIndicator = document.querySelector('.scroll-indicator');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
        scrollIndicator.style.opacity = '0';
    } else {
        scrollIndicator.style.opacity = '1';
    }
}, { passive: true });
