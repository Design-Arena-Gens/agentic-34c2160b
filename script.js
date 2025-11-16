// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.reason-card, .app-item, .stat-card, .point').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Code typing animation
const codeElement = document.querySelector('.python-code');
if (codeElement) {
    const originalCode = codeElement.innerHTML;
    codeElement.innerHTML = '';
    let i = 0;

    function typeCode() {
        if (i < originalCode.length) {
            codeElement.innerHTML += originalCode.charAt(i);
            i++;
            setTimeout(typeCode, 20);
        }
    }

    // Start typing animation when code is visible
    const codeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && i === 0) {
                typeCode();
                codeObserver.unobserve(entry.target);
            }
        });
    });

    codeObserver.observe(codeElement);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-visual');

    parallaxElements.forEach(el => {
        const speed = 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Dynamic stats counter
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const isNumber = !isNaN(target);

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            if (isNumber) {
                element.textContent = Math.floor(current).toLocaleString();
            }
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = element.dataset.originalText;
        }
    };

    if (isNumber) {
        updateCounter();
    }
}

// Observe stat cards for counter animation
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && !statNumber.dataset.animated) {
                statNumber.dataset.animated = 'true';
                statNumber.dataset.originalText = statNumber.textContent;

                const text = statNumber.textContent;
                const number = parseFloat(text.replace(/[^0-9.]/g, ''));

                if (!isNaN(number)) {
                    animateCounter(statNumber, number);
                }
            }
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => {
    statObserver.observe(card);
});

// Add hover effect to tech tags
document.querySelectorAll('.tech-tags span').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.3)';
    });

    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = 'none';
    });
});

// Glitch effect for hero title (subtle)
const glitchTitle = document.querySelector('.glitch');
if (glitchTitle) {
    setInterval(() => {
        if (Math.random() > 0.95) {
            glitchTitle.style.textShadow = `
                2px 2px 0 rgba(0, 255, 136, 0.5),
                -2px -2px 0 rgba(0, 136, 255, 0.5)
            `;
            setTimeout(() => {
                glitchTitle.style.textShadow = 'none';
            }, 50);
        }
    }, 2000);
}

// Mobile menu toggle (if needed)
const createMobileMenu = () => {
    if (window.innerWidth <= 600) {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks && !document.querySelector('.mobile-menu-btn')) {
            const menuBtn = document.createElement('button');
            menuBtn.className = 'mobile-menu-btn';
            menuBtn.innerHTML = '☰';
            menuBtn.style.cssText = `
                background: none;
                border: none;
                color: var(--text-primary);
                font-size: 1.5rem;
                cursor: pointer;
                display: block;
            `;

            navbar.querySelector('.container').appendChild(menuBtn);

            menuBtn.addEventListener('click', () => {
                navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
                if (navLinks.style.display === 'flex') {
                    navLinks.style.cssText = `
                        display: flex;
                        flex-direction: column;
                        position: absolute;
                        top: 100%;
                        left: 0;
                        right: 0;
                        background: rgba(10, 10, 10, 0.98);
                        padding: 1rem;
                        gap: 1rem;
                    `;
                }
            });
        }
    }
};

window.addEventListener('resize', createMobileMenu);
createMobileMenu();

console.log('🐍 Python - The Language of Innovation');
console.log('Website loaded successfully!');
