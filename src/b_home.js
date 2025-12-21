import './styles/normalize.css'
import './styles/common.css'
import './styles/type_b.css'
import './common_ui.js'

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cards = gsap.utils.toArray(".home-card-mo");
if (cards.length > 0) {
    cards.forEach((card, i) => {
        if (i === cards.length - 1) return; // 마지막 카드 제외
        gsap.to(card, {
            scale: 0.9,
            // rotationX: -30,
            transformOrigin: "center top",
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: card,
                start: "top top",
                pin: true,
                pinSpacing: false,
                // end: `+=${(cards.length - i - 1) * 100}%`,
                end: '+=350',
                scrub: true,
                markers: false
            }
        });
    });
}

