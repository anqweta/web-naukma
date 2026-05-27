let slides = document.querySelectorAll('.slide');
let dots = document.querySelectorAll('.dot');
let nextSlide = 0;
let currentSlide = 0;
let currentDot = dots[currentSlide];
let currentSlideElement = slides[currentSlide];
let nextSlideElement = slides[nextSlide];
let intervalId = null;
let touchStart = 0;
let endTouch = 0;

const slider = document.querySelector('.slider');
const buttonPrev = document.querySelector('.prev');
const buttonNext = document.querySelector('.next');

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        swapSlide(1, 0);
    } else if (event.key === 'ArrowLeft') {
        swapSlide(-1, slides.length - 1);
    }
});
buttonNext.addEventListener('click', () => swapSlide(1, 0));
buttonPrev.addEventListener('click', () => swapSlide(-1, slides.length - 1));
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => swapSlide(index - currentSlide, index));
});
slider.addEventListener('mouseenter', stopTimer);  
slider.addEventListener('mouseleave', startAutoSlide);

function startAutoSlide() { 
    if (intervalId === null) {
        intervalId = setInterval(function() {
            swapSlide(1, 0);
        }, 4000);
    }
}

function stopTimer() {
    clearInterval(intervalId);
    intervalId = null;
}

slider.addEventListener('pointerdown', (event) => { 
    touchStart = event.clientX;
});

slider.addEventListener('pointerup', (event) => {
    endTouch = event.clientX;
    const diff = endTouch - touchStart;
    if (diff > 50) {
        swapSlide(-1, slides.length - 1);
    } else if (diff < -50) {
        swapSlide(1, 0);
    }
});

/* function swapToNextSlide() {
    nextSlide = currentSlide + 1; 
    if (nextSlide >= slides.length) {
        nextSlide = 0;
    }
    currentSlideElement = slides[currentSlide];
    nextSlideElement = slides[nextSlide];
    currentSlideElement.classList.remove('active');
    nextSlideElement.classList.add('active');
    currentSlide = nextSlide;
    currentSlideElement = slides[currentSlide];
} */

function swapSlide(count, reset) { 
    currentDot.classList.remove('active');
    nextSlide = currentSlide + count; 
    if (nextSlide < 0 || nextSlide >= slides.length) {
        nextSlide = reset;
    }
    currentDot = dots[nextSlide];
    currentSlideElement = slides[currentSlide];
    nextSlideElement = slides[nextSlide];
    currentSlideElement.classList.remove('active');
    nextSlideElement.classList.add('active');
    currentDot.classList.add('active');
    currentSlide = nextSlide;
    currentSlideElement = slides[currentSlide];   
}

/* function findCurrentSlide() { 
   slides.forEach((slide) => {
        if (slide.classList.contains('active')) {
            currentSlide = slides.indexOf(slide);
            currentSlideElement = slides[currentSlide];
            nextSlide = currentSlide + 1;
            if (nextSlide >= slides.length) {
                nextSlide = 0;
            }
            nextSlideElement = slides[nextSlide];
            break;
        }
    });

    for (let i = 0; i < slides.length; i++) { 
        if (slides[i].classList.contains('active')) {
            currentSlide = i;
            currentSlideElement = slides[currentSlide];
            nextSlide = currentSlide + 1;
            if (nextSlide >= slides.length) {
                nextSlide = 0;
            }
            nextSlideElement = slides[nextSlide];
            break;
        }
    }

}  */   