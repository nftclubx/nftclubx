// Mobile Menu Toggle
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Header Scroll Effect
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.background = 'rgba(5, 5, 17, 0.95)';
        header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.5)';
    } else {
        header.style.background = 'rgba(5, 5, 17, 0.8)';
        header.style.boxShadow = 'none';
    }
});

// Simple Reveal Animation on Scroll
const revealElements = document.querySelectorAll('.feature-card, .info-card, .referral-level');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 150;

    revealElements.forEach((reveal) => {
        const elementTop = reveal.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');
            reveal.style.opacity = '1';
            reveal.style.transform = 'translateY(0)';
        }
    });
};

// Add initial styles for reveal elements
revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
});

window.addEventListener('scroll', revealOnScroll);
