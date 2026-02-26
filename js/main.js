/**
 * main.js
 * Core logic for portfolio website
 */

document.addEventListener('DOMContentLoaded', () => {
    // ---- Theme Toggle (Dark/Light Mode) ----
    const themeBtn = document.getElementById('theme-toggle');
    const themeIcon = themeBtn.querySelector('i');
    const htmlElement = document.documentElement;

    // Check for saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
        htmlElement.setAttribute('data-theme', 'light');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    } else {
        htmlElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    themeBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            htmlElement.setAttribute('data-theme', 'light');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        } else {
            htmlElement.setAttribute('data-theme', 'dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        }
    });

    // ---- Mobile Menu Toggle ----
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        navItems.forEach(item => {
            item.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // ---- Sticky Navbar & Active Link Update ----
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Sticky Navbar styling
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link update based on scroll position
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });

    // ---- Scroll Reveal Animation using IntersectionObserver ----
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // ---- Simple Typewriter Effect for Hero Title (Optional Enhancement) ----
    const titleElement = document.getElementById('typewriter');
    if (titleElement) {
        const text = titleElement.innerText;
        titleElement.innerText = '';
        let i = 0;

        function typeWriter() {
            if (i < text.length) {
                titleElement.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }

        // Start typing after a short delay
        setTimeout(typeWriter, 500);
    }

    // ---- Contact Form Validation ----
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Basic validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                formStatus.textContent = 'Please fill out all fields.';
                formStatus.className = 'form-status error';
                return;
            }

            // Simulate form submission
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.disabled = true;

            setTimeout(() => {
                formStatus.textContent = 'Message sent successfully!';
                formStatus.className = 'form-status success';
                contactForm.reset();
                btn.innerHTML = originalText;
                btn.disabled = false;

                // Clear success message after 5 seconds
                setTimeout(() => {
                    formStatus.textContent = '';
                    formStatus.className = 'form-status';
                }, 5000);
            }, 1500);
        });
    }
});
