import page1 from './img/Rectangle 4.png';
import page2 from './img/Rectangle 5.png';
import page3 from './img/Rectangle 6.png';
import page4 from './img/Rectangle 7.png';
import page5 from './img/Rectangle 8.png';
import page6 from './img/Rectangle 9.png';
import page7 from './img/first screen 1.png';
import page8 from './img/Rectangle 10.png';
import page9 from './img/Rectangle 11.png';
import page10 from './img/Rectangle 12.png';

const images = [
  page1,
  page2,
  page3,
  page4,
  page5,
  page6,
  page7,
  page8,
  page9,
  page10,
];

const containerUl = document.querySelectorAll('.marquee__inner');
const coversSection = document.querySelector('.covers-container');

document.addEventListener('DOMContentLoaded', function () {
  function shuffleArray(array) {
    return array.slice().sort(() => Math.random() - 0.5);
  }

  containerUl.forEach(ul => {
    const shuffleImage = shuffleArray(images);
    shuffleImage.forEach(src => {
      const li = document.createElement('li');
      li.classList.add('marquee__line');

      const img = document.createElement('img');
      img.src = src;

      li.appendChild(img);
      ul.appendChild(li);
    });
  });

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        const lines = coversSection.querySelectorAll('.marquee__line');
        lines.forEach(line => {
          entry.isIntersecting
            ? line.classList.add('covers-start-animation')
            : line.classList.remove('covers-start-animation');
        });
      });
    },
    { threshold: 0.1 }
  );

  observer.observe(coversSection);
});
