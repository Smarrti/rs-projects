/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const mySwiper = new Swiper ('.cards', {
    direction: 'horizontal',
    loop: true,
    slidesPerView: 4,
    spaceBetween: 20,

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 0
        },
        415: {
            slidesPerView: 2,
            spaceBetween: 3
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 5
        },
        1300: {
            slidesPerView: 4,
        }
    }    
})