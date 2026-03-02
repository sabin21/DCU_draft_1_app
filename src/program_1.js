import './styles/normalize.css'
import './styles/common.css'
import './styles/program.css'

import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import 'swiper/css/effect-coverflow';

import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

/*------------------------------*/

const heroObjs = ['.hero-obj-1', '.hero-obj-2'];

gsap.from(heroObjs, {
    y: 500,
    opacity: 1,
    duration: 1.5,
    ease: "power3.out",
    stagger: 0.3,
    onComplete: () => {
        heroObjs.forEach((obj, index) => {
            gsap.to(obj, {
                y: index % 2 === 0 ? 30 : -30,
                duration: 1 + index * 0.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        });
    }
});

/*------------------------------*/

const sections = gsap.utils.toArray('.program-section');
let currentSectionIndex = 0;
let isAnimating = false;

function scrollToSection(index) {
    if (index < 0 || index >= sections.length || isAnimating) return;
    
    isAnimating = true;
    currentSectionIndex = index;
    
    gsap.to(window, {
        scrollTo: { y: sections[index], autoKill: false },
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => {
            isAnimating = false;
        }
    });
}

window.addEventListener('wheel', (e) => {
    if (isAnimating) return;
    
    if (Math.abs(e.deltaY) > 15) {
        if (e.deltaY > 0) {
            scrollToSection(currentSectionIndex + 1);
        } else if (e.deltaY < 0) {
            scrollToSection(currentSectionIndex - 1);
        }
    }
}, { passive: false });

/*------------------------------*/

const header = document.querySelector('.app-header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
        header.classList.remove('white');
    } else {
        header.classList.add('white');
    }
});

/*------------------------------*/

const swiperNewBig = new Swiper('.swiper-new-big', {
    modules: [Navigation, Pagination, Autoplay],
    slidesPerView:"auto",
    spaceBetween: 20,
    centeredSlides: true,
    loop: true,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
    on: {
        init: function () {
            this.slides[this.activeIndex].classList.add('active');
        },
        slideChangeTransitionStart: function () {
            this.slides.forEach(slide => {
                slide.classList.remove('active');
            });
        },
        slideChangeTransitionEnd: function () {
            this.slides[this.activeIndex].classList.add('active');
        },
    },
});

const swiperNewSmall = new Swiper('.swiper-new-small', {
    modules: [Navigation, Pagination, Autoplay],
    slidesPerView: "auto",
    spaceBetween: 16,
    centeredSlides: false,
    loop: true,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
});

// swiperNewBig.controller.control = swiperNewSmall;
// swiperNewSmall.controller.control = swiperNewBig;

const swiperRecommand = new Swiper('.swiper-recommand-wrap', {
    modules: [Pagination, Autoplay],
    centeredSlides: true,
    slidesPerView: 'auto',
    // spaceBetween: 16,
    loop: true,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    on: {
        init: function () {
            this.slides[this.activeIndex].classList.add('active');
        },
        slideChangeTransitionStart: function () {
            this.slides.forEach(slide => {
                slide.classList.remove('active');
            });
        },
        slideChangeTransitionEnd: function () {
            this.slides[this.activeIndex].classList.add('active');
        },
    }
});


