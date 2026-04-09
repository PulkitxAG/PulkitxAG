document.addEventListener('DOMContentLoaded', () => {
    /* ==========================================================================
       Set Current Year in Footer
       ========================================================================== */
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    /* ==========================================================================
       Theme Toggle (Dark / Light Mode)
       ========================================================================== */
    const themeBtn = document.getElementById('theme-toggle');
    const themeIcon = themeBtn.querySelector('i');
    
    // Check for saved user preference, if any, on load of the website
    const currentTheme = localStorage.getItem('theme') || 'dark'; // default to dark
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    themeBtn.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'dark') {
            theme = 'light';
        } else {
            theme = 'dark';
        }
        
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateThemeIcon(theme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fa-solid fa-sun'; // Show sun button in dark mode
        } else {
            themeIcon.className = 'fa-solid fa-moon'; // Show moon button in light mode
        }
    }

    /* ==========================================================================
       Mobile Navigation Toggle
       ========================================================================== */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Toggle hamburger icon between bars and times (close)
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.className = 'fa-solid fa-times';
        } else {
            icon.className = 'fa-solid fa-bars';
        }
    });

    // Close mobile menu when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.querySelector('i').className = 'fa-solid fa-bars';
            }
        });
    });

    /* ==========================================================================
       Scroll Reveal Animations
       ========================================================================== */
    const fadeElements = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(
        entries, 
        observer
    ) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                // Optional: Stop observing once faded in
                // observer.unobserve(entry.target); 
            }
        });
    }, appearOptions);

    fadeElements.forEach(el => {
        appearOnScroll.observe(el);
    });
});
