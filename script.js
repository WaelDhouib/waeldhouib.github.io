document.addEventListener('DOMContentLoaded', function() {
    const sliders = document.querySelectorAll('.swiper-container');
    sliders.forEach(slider => {
        const project = slider.getAttribute('data-project');
        new Swiper(slider, {
            loop: true,
            autoplay: {
                delay: 3000,
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
    });
});
