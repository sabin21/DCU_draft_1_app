import './styles/common.css'
import './styles/home_motion_1.css'
// import './common_ui.js'

import gsap from 'gsap'

window.addEventListener("DOMContentLoaded", () => {
    const SplashTl = gsap.timeline();
    SplashTl.from(".splash-letter-d, .splash-letter-c, .splash-letter-u", {
        opacity: 0,
        y: -30,
        duration: 0.4,
        stagger: 0.1,
        ease: "power3.out"
    })
    .from('.splash-letters', { y: 30, opacity:0, duration:0.6}, 0.1)
    .to('.cover-2',{width:"0px", height:"0px", top:"-30vh",duration: 0.4,ease: "ease-in-out"})
    .to('.avatar-cover',{width:"60px", height:"60px", top:"110px",duration: 0.6,ease: "ease-in-out"}, 1)
    .to('.avatar-cover',{opacity:"0",duration: 0.2})
    .to('.avatar-cover',{display:"none"});

    const capTl = gsap.timeline({ repeat: -1, repeatDelay: 1.5, paused: true });
    capTl.fromTo(".avatar-cap", 
        { top: "-70px", rotation: 0}, 
        { top: "60px", duration: 1, ease: "bounce.out" }
    )
    .to(".avatar-cap", { 
        top: "-100px", 
        rotation: 360,  
        duration: 0.5, 
        ease: "power2.in" 
    }, 3);

    SplashTl.call(() => capTl.play());

    gsap.to(".search-visual-bot", {
        y: -10,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
    });

    gsap.fromTo(".search-visual-balloon", 
        { scale: 0, transformOrigin: "bottom left" },
        { 
            scale: 1, 
            duration: 1, 
            repeat: -1, 
            yoyo: true, 
            repeatDelay: 0.5,
            ease: "back.out(1.7)" 
        }
    );
});

//----------------------//

const BtnChange = document.querySelector('.btn-change-mode');
const SimpleWrap = document.querySelector('.simple-wrap');
const PortletWrap = document.querySelector('.portlet-container');

let SimpleMode = false;

BtnChange.addEventListener('click', function(){
  SimpleWrap.classList.toggle('active');
  BtnChange.classList.toggle('active');
  PortletWrap.classList.toggle('none');
});

//----------------------//

const canvas = document.querySelector("#back-canvas");
const ctx = canvas.getContext("2d");

function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
}

let circles = [];
const colors = ["#6568ffff", "#00b6c7ff", "#0370ffff", "#44d6ffff"];

function initCircles() {
    circles = [];
    let circleCount = canvas.width / 50;
    for (let i = 0; i < circleCount; i++) {
        let radius = canvas.width / 4;
        let x = randomBetween(radius, canvas.width - radius);
        let y = randomBetween(radius, canvas.height - radius);
        // let dx = randomBetween(window.innerWidth / -2000, window.innerWidth / 2000);
        // let dy = randomBetween(window.innerWidth / -2000, window.innerWidth / 2000);
        let dx = randomBetween(canvas.width / -2000, canvas.width / 2000);
        let dy = randomBetween(canvas.width / -2000, canvas.width / 2000);
        let color = colors[Math.floor(Math.random() * colors.length)];
        circles.push({ x, y, dx, dy, radius, color });
    }
}

function drawCircle(circle) {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 3, false);
    ctx.fillStyle = circle.color;
    ctx.fill();
    ctx.closePath();
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    circles.forEach(circle => {
        if (circle.x + circle.radius > canvas.width || circle.x - circle.radius < 0) {
            circle.dx = -circle.dx;
        }
        if (circle.y + circle.radius > canvas.height || circle.y - circle.radius < 0) {
            circle.dy = -circle.dy;
        }
        circle.x += circle.dx * 4;
        circle.y += circle.dy * 4;

        drawCircle(circle);
    });
}

function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    initCircles();
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

initCircles();

animate();
