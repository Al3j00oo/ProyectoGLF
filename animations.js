class ScrollAnimations {
    constructor() {
        this.scrollElements = document.querySelectorAll('[data-scroll]');
        this.init();
    }

    init() {
        this.initParticles();
        this.initScrollAnimations();
        this.initButtonEffects();
    }

    initParticles() {
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                particles: {
                    number: { value: 80, density: { enable: true, value_area: 800 } },
                    color: { value: "#00ff88" },
                    shape: { type: "circle" },
                    opacity: { value: 0.5, random: true },
                    size: { value: 3, random: true },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: "#00ff88",
                        opacity: 0.2,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: "none",
                        random: true,
                        straight: false,
                        out_mode: "out",
                        bounce: false
                    }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: { enable: true, mode: "repulse" },
                        onclick: { enable: true, mode: "push" },
                        resize: true
                    }
                }
            });
        }
    }

    initScrollAnimations() {
        const handleScrollAnimation = () => {
            this.scrollElements.forEach((el) => {
                if (this.isElementInView(el, 1.2)) {
                    el.classList.add('visible');
                } else {
                    el.classList.remove('visible');
                }
            });
        };

        window.addEventListener('scroll', handleScrollAnimation);
        handleScrollAnimation();
    }

    isElementInView(el, dividend = 1) {
        const elementTop = el.getBoundingClientRect().top;
        return elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend;
    }

    initButtonEffects() {
        const buttons = document.querySelectorAll('.button-primary');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-3px) scale(1.02)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ScrollAnimations();
});