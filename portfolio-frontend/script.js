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
  loadProjectsIntoCarousel();   // ← yahi call karna hai
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

// ----------------- PROJECT CAROUSEL -----------------

// Global index for current project
let currentProjectIndex = 0;

// Arrow buttons ke liye function
function scrollProjects(direction) {
  const track = document.getElementById("carouselTrack");
  if (!track) return;

  const items = track.querySelectorAll(".carousel-item");
  if (items.length === 0) return;

  // index update + wrap-around
  currentProjectIndex = (currentProjectIndex + direction + items.length) % items.length;

  const offset = -currentProjectIndex * 100; // ek card = 100%
  track.style.transform = `translateX(${offset}%)`;
}

// Mobile swipe support
function attachSwipeHandlers(track) {
  let startX = 0;
  let endX = 0;

  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    endX = startX;
  });

  track.addEventListener("touchmove", (e) => {
    endX = e.touches[0].clientX;
  });

  track.addEventListener("touchend", () => {
    const diff = endX - startX;
    if (diff > 50) {
      // swipe right
      scrollProjects(-1);
    } else if (diff < -50) {
      // swipe left
      scrollProjects(1);
    }
  });
}

// Backend se projects laake carousel me inject karna
async function loadProjectsIntoCarousel() {
  const track = document.getElementById("carouselTrack");
  if (!track) return;

  try {
    const res = await fetch("http://localhost:5000/api/projects");
    const projects = await res.json();

    if (!Array.isArray(projects) || projects.length === 0) {
      track.innerHTML = "<p>No projects added yet.</p>";
      return;
    }

    // Purane sab hatao
    track.innerHTML = "";

    projects.forEach((project) => {
      const item = document.createElement("div");
      item.className = "carousel-item";

      const techText = Array.isArray(project.techStack)
        ? project.techStack.join(" / ")
        : project.techStack || "";

      const liveUrl = project.liveUrl || "#";
      const githubUrl = project.githubUrl || "";

      item.innerHTML = `
        <img src="${project.imageUrl}" class="project-img" alt="${project.title}">
        <h2 class="project-title">${project.title}</h2>
        ${
          techText
            ? `<p class="project-tech">${techText}</p>`
            : ""
        }
        <div class="project-links-wrapper">
          ${
            project.liveUrl
              ? `<a href="${liveUrl}" class="project-link" target="_blank">View Live</a>`
              : ""
          }
          ${
            githubUrl
              ? `<a href="${githubUrl}" class="project-link project-link-code" target="_blank">View Code</a>`
              : ""
          }
        </div>
      `;

      track.appendChild(item);
    });

    // Start from first project
    currentProjectIndex = 0;
    track.style.transform = "translateX(0%)";

    // Swipe handlers lagao
    attachSwipeHandlers(track);
  } catch (err) {
    console.error("Error loading projects:", err);
    track.innerHTML = "<p>Failed to load projects.</p>";
  }
}

  // to intergrate contact form with backend
  document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const statusEl = document.getElementById("status");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    statusEl.textContent = "Sending...";
    statusEl.style.color = "gray";

    try {
      const res = await fetch("http://localhost:5000/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        statusEl.textContent = data.error || "Something went wrong";
        statusEl.style.color = "red";
      } else {
        statusEl.textContent = "Message sent successfully! 🎉";
        statusEl.style.color = "green";
        form.reset();
      }
    } catch (err) {
      console.error(err);
      statusEl.textContent = "Server error 😢";
      statusEl.style.color = "red";
    }
  });
});

// ✅ GLOBAL SMOOTH SCROLL (NAVBAR + "My Projects" button)
// old smooth scroll listeners mat rakho; sirf ye wala

const NAV_OFFSET = 80; // approx navbar height

document.addEventListener("click", (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;

  const targetId = link.getAttribute("href"); // e.g. "#section-3"
  if (!targetId || targetId === "#") return;

  const targetEl = document.querySelector(targetId);
  if (!targetEl) return;

  e.preventDefault();

  const y =
    targetEl.getBoundingClientRect().top +
    window.pageYOffset -
    NAV_OFFSET;

  window.scrollTo({
    top: y,
    behavior: "smooth",
  });

  // mobile nav close on click
  const navLinks = document.querySelector(".nav-links");
  if (navLinks) navLinks.classList.remove("nav-open");
});
