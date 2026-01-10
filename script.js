window.addEventListener('DOMContentLoaded', () => {
  const intro = document.querySelector('.intro');
  const mainContent = document.querySelector('.main-content');

  // Total duration should match the final letter delay + animation time
  setTimeout(() => {
    intro.style.transition = 'opacity 1s ease';
    intro.style.opacity = 0;
    setTimeout(() => {
      intro.style.display = 'none';
      mainContent.style.opacity = 1;
    }, 1000); // match transition time
  }, 2500); // adjust to match your last letter’s delay
});

const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});


let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
const s = 0.15;

function animateCursor() {
  cursorX += (mouseX - cursorX) * s;
  cursorY += (mouseY - cursorY) * s;

  cursor.style.left = cursorX + 'px';
  cursor.style.top = cursorY + 'px';

  requestAnimationFrame(animateCursor);
}

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

animateCursor();


document.querySelector(".contact-form").addEventListener("submit", function(e) {
    e.preventDefault(); // stops page reload
    alert("Form submitted!");
});

 const text = "Building dreams into code...";
  let index = 0;
  const speed = 80;
  const typeText = () => {
    const element = document.querySelector('.typewriter-text');
    if (element && index < text.length) {
      element.textContent += text.charAt(index);
      index++;
      setTimeout(typeText, speed);
    }
  };
  window.addEventListener('DOMContentLoaded', typeText);
 

document.querySelectorAll('.skill').forEach(skill => {
  const fill = skill.querySelector('.skill-fill');
  const percentText = skill.querySelector('.skill-percent');
  const targetPercent = parseInt(skill.getAttribute('data-percent'));
  let current = 0;
  let intervalUp;
  let intervalDown;

  skill.addEventListener('mouseenter', () => {
    clearInterval(intervalDown); // clear any reverse animation
    intervalUp = setInterval(() => {
      if (current <= targetPercent) {
        fill.style.width = current + '%';
        percentText.textContent = current + '%';
        current++;
      } else {
        clearInterval(intervalUp);
      }
    }, 15);
  });

  skill.addEventListener('mouseleave', () => {
    clearInterval(intervalUp); // clear any forward animation
    intervalDown = setInterval(() => {
      if (current >= 0) {
        fill.style.width = current + '%';
        percentText.textContent = current + '%';
        current--;
      } else {
        clearInterval(intervalDown);
      }
    }, 15);
  });
});


 const track = document.getElementById('carouselTrack');
  const items = document.querySelectorAll('.carousel-item');
  let currentIndex = 0;

  function scrollProjects(direction) {
    currentIndex = (currentIndex + direction + items.length) % items.length;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  // Swipe support
  let startX = 0;
  let endX = 0;

  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  track.addEventListener('touchmove', (e) => {
    endX = e.touches[0].clientX;
  });

  track.addEventListener('touchend', () => {
    let diff = endX - startX;
    if (diff > 50) scrollProjects(-1);   // Swipe Right
    else if (diff < -50) scrollProjects(1);  // Swipe Left
  });