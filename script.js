document.addEventListener('DOMContentLoaded', function() {
    // Initialize Swiper sliders
    const sliders = document.querySelectorAll('.swiper-container');
    sliders.forEach(slider => {
        const project = slider.getAttribute('data-project');
        const swiper = new Swiper(slider, {
            loop: true,
            autoplay: {
                delay: 5000, // Slower animation (5 seconds)
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
        const scrollPosition = window.scrollY + window.innerHeight / 2;
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
    setActiveDot(); // Initial call
});
