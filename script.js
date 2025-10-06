document.addEventListener('DOMContentLoaded', () => {
    // Time-based dark mode
    const now = new Date();
    const hours = now.getHours();
    const isNight = hours >= 18 || hours < 6;
    if (isNight) {
        document.body.classList.add('dark-mode');
        document.querySelector('.theme-toggle i').classList.replace('fa-moon', 'fa-sun');
    }

    // Theme toggle button
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const icon = themeToggle.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
        }
    });

    // Show/hide theme toggle based on footer visibility
    const footer = document.querySelector('footer');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            themeToggle.classList.toggle('visible', entry.isIntersecting);
        });
    }, { threshold: 0.1 });
    observer.observe(footer);

    // Dot navigation
    const dots = document.querySelectorAll('.dot');
    const sections = document.querySelectorAll('section, header');
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.3 };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                dots.forEach(dot => {
                    dot.classList.toggle('active', dot.getAttribute('data-section') === sectionId);
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));

    // Initialize Swiper for projects
    document.querySelectorAll('.swiper-container').forEach(container => {
        new Swiper(container, {
            slidesPerView: 1,
            spaceBetween: 10,
            pagination: { el: '.swiper-pagination', clickable: true },
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
            breakpoints: {
                768: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 30 }
            }
        });
    });
});
