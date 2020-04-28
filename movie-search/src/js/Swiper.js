var mySwiper = new Swiper ('.cards', {
    direction: 'horizontal',
    loop: true,
    slidesPerView: 4,

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
})