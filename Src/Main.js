/* import App from '../scripts/App.js'; */
// ===== PRELOADER =====
$(function () {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      if (!$('.main_header').hasClass('fixed')) {
        $('.main_header').stop().addClass('fixed').css('top', '-100px').animate(
          {
            top: '0px',
          },
          500
        );
      }
    } else {
      $('.main_header').removeClass('fixed');
    }
  });
});
$(window).load(function () {
  $('#status').fadeOut();
  $('#preloader').delay(350).fadeOut('slow');
  $('body').delay(350).css({ overflow: 'visible' });
});
/* Slide Homepage */
const slideContainer = document.getElementById('bannerSlide');
const fallback = document.querySelector('.fallback-text');
const loader = document.getElementById('loader-Slidebanner');

const imageCount = 2; // Altere esse número de acordo com o número de imagens esperadas
const slideImages = [];
let loadedCount = 0;

for (let i = 1; i <= imageCount; i++) {
  const img = new Image();
  img.src = `../Public/Asset/Slides/${i}.png`;

  img.onload = () => {
    slideImages.push(img);
    loadedCount++;
    checkIfReady();
  };

  img.onerror = () => {
    loadedCount++;
    checkIfReady();
  };
}
function checkIfReady() {
  if (loadedCount === imageCount) {
    loader.style.display = 'none';

    if (slideImages.length > 0) {
      startSlider();
    } else {
      fallback.style.display = 'block';
    }
  }
}
function startSlider() {
  if (slideImages.length === 0) return;

  fallback.style.display = 'none';
  let current = 0;

  slideImages.forEach((img) => {
    img.classList.add('slide-image');
    slideContainer.appendChild(img);
  });

  slideImages[0].classList.add('active');

  setInterval(() => {
    const currentImg = slideImages[current];
    currentImg.classList.remove('active');
    currentImg.classList.add('out');

    current = (current + 1) % slideImages.length;
    const nextImg = slideImages[current];
    nextImg.classList.add('active');

    setTimeout(() => {
      currentImg.classList.remove('out');
    }, 600); // Tempo da transição
  }, 10000);
}
