import './styles/normalize.css'
import './styles/common.css'
import './styles/type_c.css'
import './common_ui.js'

const canvas = document.querySelector("#head-back-canvas");
const ctx = canvas.getContext("2d");

function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
}

let circles = [];
const colors = ["#000b84ff", "#00b6c7ff", "#0370ffff", "#04006dff"];

function initCircles() {
    circles = [];
    let circleCount = canvas.width / 100;
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

    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, false);

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