import { fetchReviews } from "./api.js";
import { renderReviews } from "./render-li.js";
import Swiper from 'swiper/bundle';
import 'swiper/css';

const reviewsContainer = document.querySelector('.reviews-container')
const reviewsList = document.querySelector('.reviews-list');
const notFoundMes = document.querySelector('.reviews-error');
const btnPrev = document.querySelector('.swiper-button-prev');
const btnNext = document.querySelector('.swiper-button-next');

let isError = false;

document.addEventListener('DOMContentLoaded', async () => {
	try {
		const result = await fetchReviews();
		console.log(result);
		if (!result || result.length === 0 ) {
			notFoundMes.classList.remove('hidden');
			notFoundMes.classList.add('css-err-mes');
			btnNext.setAttribute('disabled', 'true');
			isError = true;
			return;
		}
		reviewsList.innerHTML = renderReviews(result);
		
		const swiper = new Swiper('.swiper', {
			direction: 'horizontal',
			loop: false,
			// spaceBetween: 16,
			// autoHeight: true, 
			navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
			keyboard: { // взаємодія через клавіатуру
				enabled: true,
				onlyInViewport: true,
			},
			mousewheel: { // взаэмодія через мишку
				invert: true,
			},
			resizeObserver: true,
			// setWrapperSize: true, // автоматично встановлює розиір слайду так шоб він відповідам всім слайдам
			slidesPerView: 1,
      breakpoints: {
        768: {
          slidesPerView: 2, 
        },
        1440: {
          slidesPerView: 4, 
        },
      },
		});
		

		function updateButtonSlider() {
			btnPrev.toggleAttribute('disabled', swiper.isBeginning);
			btnNext.toggleAttribute('disabled', swiper.isEnd);
		}

		swiper.on('slideChange', updateButtonSlider);

		updateButtonSlider();
	} catch (error) {
		isError = true;
		console.error(error);
	}
});

const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (isError && entry.isIntersecting) {
			alert('Виникла помилка, спробуйте трохи пізніше')
		}
	})
}, { threshold: 0.1 });

observer.observe(reviewsContainer);