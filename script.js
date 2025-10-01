document.addEventListener('DOMContentLoaded', function() {
    // Night Mode Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;

    // Check current hour for automatic dark mode (6:00 PM to 6:00 AM)
    const currentHour = new Date().getHours();
    let isDarkMode = localStorage.getItem('theme') === 'dark' || 
                     (localStorage.getItem('theme') !== 'light' && (currentHour >= 18 || currentHour < 6));

    // Apply initial theme
    if (isDarkMode) {
        body.classList.add('dark-mode');
        themeToggle.textContent = 'Light Mode';
    } else {
        body.classList.remove('dark-mode');
        themeToggle.textContent = 'Dark Mode';
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            themeToggle.textContent = 'Light Mode';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle.textContent = 'Dark Mode';
            localStorage.setItem('theme', 'light');
        }
    });

    // Initialize Swiper sliders
    const sliders = document.querySelectorAll('.swiper-container');
    sliders.forEach(slider => {
        const project = slider.getAttribute('data-project');
        const swiper = new Swiper(slider, {
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: `.swiper-container[data-project="${project}"] .swiper-pagination`,
                clickable: true,
            },
            navigation: {
                nextEl: `.swiper-container[data-project="${project}"] .swiper-button-next`,
                prevEl: `.swiper-container[data-project="${project}"] .swiper-button-prev`,
            },
            breakpoints: {
                640: { slidesPerView: 1, spaceBetween: 20 },
                768: { slidesPerView: 2, spaceBetween: 30 },
                1024: { slidesPerView: 3, spaceBetween: 40 },
            }
        });

        // Auto-sliding only when in view
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    swiper.autoplay.start();
                } else {
                    swiper.autoplay.stop();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(slider);
    });

    // Dot navigation active state
    const dots = document.querySelectorAll('.dot');
    const sections = document.querySelectorAll('header, section');

    const setActiveDot = () => {
        const scrollPosition = window.scrollY + window.innerHeight / 3;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                dots.forEach(dot => {
                    dot.classList.remove('active');
                    if (dot.getAttribute('data-section') === sectionId) {
                        dot.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', setActiveDot);
    setActiveDot();
});
