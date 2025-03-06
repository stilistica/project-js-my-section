import { fetchReviews } from "./api.js";
import { renderReviews } from "./render-li.js";
import Swiper from 'swiper/bundle';
import 'swiper/css';

const reviewsList = document.querySelector('.reviews-list');
const notFoundMes = document.querySelector('.reviews-error');
const btnPrev = document.querySelector('.swiper-button-prev');
const btnNext = document.querySelector('.swiper-button-next')

document.addEventListener('DOMContentLoaded', async () => {
	try {
		const result = await fetchReviews();
		console.log(result);
		if (!result || result.length === 0 ) {
			notFoundMes.classList.remove('hidden');
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
			// resizeObserver: true,
			setWrapperSize: true, // автоматично встановлює розиір слайду так шоб він відповідам всім слайдам
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
			if (swiper.isBeginning) {
				btnPrev.setAttribute('disabled', 'true');
			} else {
				btnPrev.removeAttribute('disabled');
			}
			if (swiper.isEnd) {
				btnNext.setAttribute('disabled', 'true');
			} else {
				btnNext.removeAttribute('disabled');
			}
		}

		swiper.on('slideChange', updateButtonSlider);

		updateButtonState();
	} catch (error) {
		console.error(error);
	}
})