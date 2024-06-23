var swiper1 = new Swiper(".coming-events", {
  slidesPerView: 1,
  navigation: {
    nextEl: ".profiles--events .slider-next-btn",
    prevEl: ".profiles--events .slider-prev-btn",
  },
  pagination: {
    el: ".coming-events-pagination",
    type: "fraction",
  },
  breakpoints: {
    650 : {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
  },
});

var swiper2 = new Swiper(".coming-events-creator", {
  slidesPerView: 1,
  navigation: {
    nextEl: ".profiles--creator .slider-next-btn",
    prevEl: ".profiles--creator .slider-prev-btn",
  },
  pagination: {
    el: ".coming-events-creator-pagination",
    type: "fraction",
  },
  breakpoints: {
    650 : {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
  },
});

let popupToggle = document.querySelectorAll('.popup-toggle');
let popup = document.querySelector('.popup-wrapper');
let popupClose = document.querySelector('.popup__close');

popupToggle.forEach((item) => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    popup.classList.toggle('active');
  });
})

popup.addEventListener('click', (e) => {
  if (e.target.classList.contains('popup-wrapper')) {
    popup.classList.remove('active');
  }
})

popupClose.addEventListener('click', () => {
  popup.classList.remove('active');
})

let humberger = document.querySelector('.humberger');
let nav = document.querySelector('header nav');

humberger.addEventListener('click', () => {
  nav.classList.toggle('active');
});

document.addEventListener('click', (e) => {
  if (!nav.contains(e.target) && !humberger.contains(e.target)) {
    nav.classList.remove('active');
  }
});
