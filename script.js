document.addEventListener('DOMContentLoaded', () => {
    // 1. Swiper Sliders Initialization
    
    // Initialize Mobile App Sliders
    const mobileContainers = document.querySelectorAll('.mobile-slider');
    mobileContainers.forEach((container) => {
        new Swiper(container, {
            loop: true,
            slidesPerView: 1,
            spaceBetween: 20,
            centeredSlides: true,
            autoplay: {
                delay: 3500,
                disableOnInteraction: false,
            },
            pagination: {
                el: container.querySelector('.swiper-pagination'),
                clickable: true,
            },
            navigation: {
                nextEl: container.querySelector('.swiper-button-next'),
                prevEl: container.querySelector('.swiper-button-prev'),
            },
        });
    });

    // Initialize Desktop Cash Register App Sliders
    const desktopContainers = document.querySelectorAll('.desktop-slider');
    desktopContainers.forEach((container) => {
        new Swiper(container, {
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            pagination: {
                el: container.querySelector('.swiper-pagination'),
                clickable: true,
            },
            navigation: {
                nextEl: container.querySelector('.swiper-button-next'),
                prevEl: container.querySelector('.swiper-button-prev'),
            },
            // Responsive breakpoints
            breakpoints: {
                0: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                    centeredSlides: false
                },
                992: {
                    slidesPerView: 'auto',
                    spaceBetween: 30,
                    centeredSlides: true
                }
            }
        });
    });

    // 2. Dark/Light Theme Toggle functionality
    const themeToggleBtn = document.querySelector('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-mode');
        themeToggleBtn.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        
        const icon = themeToggleBtn.querySelector('i');
        if (isDarkMode) {
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });

    // Toggle button visibility based on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            themeToggleBtn.classList.add('visible');
        } else {
            themeToggleBtn.classList.remove('visible');
        }
    });

    // 3. Dot Navigation active state indicator on scroll
    const sections = document.querySelectorAll('header, section');
    const navDots = document.querySelectorAll('.dot-nav .dot');

    const observerOptions = {
        threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navDots.forEach(dot => {
                    if (dot.getAttribute('data-section') === id) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
});
