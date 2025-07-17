// Typing animation skill list
const skills = [
  "Programming Languages: Python HTML CSS Java     ",
  "Database: SQL   ",
  "Cybersecurity Basics   ",
  "Git & GitHub   ",
  "Responsive Design & UI/UX    ",
  "Other Skills:\nProblem Solving\nTime Management\nProject Management\nDiscipline   "
];

// Separate skill icon structure
const skillIcons = {
  frontend: [
    { name: "HTML5", icon: "fab fa-html5", about: "HTML5 is the standard language for creating structured web content.", link: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
    { name: "CSS3", icon: "fab fa-css3-alt", about: "CSS3 styles and lays out web pages with design, animations, and responsive layouts.", link: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
    { name: "JavaScript", icon: "fab fa-js-square", about: "JavaScript adds interactivity and dynamic behavior to web pages.", link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    { name: "Responsive Design", icon: "fas fa-mobile-alt", about: "Responsive design ensures web content adapts to different screen sizes.", link: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design" }
  ],
  backend: [
    { name: "Java", icon: "fas fa-mug-hot", about: "Java is a powerful object-oriented programming language used for backend, Android, and enterprise apps.", link: "https://dev.java" },
    { name: "Python", icon: "fab fa-python", about: "Python is a versatile language used in web, data science, AI, and scripting.", link: "https://www.python.org/doc/" },
    { name: "SQL", icon: "fas fa-database", about: "SQL is used to manage and query data in relational databases.", link: "https://www.mysql.com/" },
    { name: "VS Code", icon: "fas fa-code", about: "Visual Studio Code is a popular open-source code editor from Microsoft.", link: "https://code.visualstudio.com/" }
  ]
};

/* ---------- Build icon grids ---------- */
function buildGrid(list, containerId) {
  const wrap = document.getElementById(containerId);
  list.forEach(({ name, icon }) => {
    const item = document.createElement('div');
    item.className = 'skill-item';
    item.innerHTML = `<i class="skill-icon ${icon}"></i><span class="skill-name">${name}</span>`;
    wrap.appendChild(item);
  });
}
document.addEventListener('DOMContentLoaded', () => {
  buildGrid(skillIcons.frontend, 'frontendSkills');
  buildGrid(skillIcons.backend, 'backendSkills');
  typeEffect();          // start the typing animation last
});

//added after using chatgpt
function buildGrid(list, containerId) {
  const wrap = document.getElementById(containerId);
  // ✅ Clear previous content to prevent duplicates
  wrap.innerHTML = '';
  list.forEach(({ name, icon, link, about }) => {
    // ─── Card container ───────────────────
    const item = document.createElement("div");
    item.className = "skill-item";
    item.innerHTML = `
      <i class="skill-icon ${icon}"></i>
      <span class="skill-name">${name}</span>
    `;

    // ─── 1) Link behaviour ────────────────
    if (link) {
      item.style.cursor = "pointer";
      item.addEventListener("click", () => window.open(link, "_blank"));
    }

    // ─── 2) Tooltip behaviour ─────────────
    if (about) {
      item.setAttribute("data-tooltip", about);
    }

    wrap.appendChild(item);
  });
}

// build both grids once DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  buildGrid(skillIcons.frontend, "frontendSkills");
  buildGrid(skillIcons.backend, "backendSkills");
  typeEffect();
});
//till here from chatgpt

// Typing effect function
let i = 0;
let j = 0;
let currentSkill = '';
let isDeleting = false;
const speed = 100;
const pause = 3000;

function typeEffect() {
  const skillEl = document.getElementById("typed-skill");
  if (!skillEl) return;

  currentSkill = skills[i];

  if (!isDeleting) {
    skillEl.textContent = "// " + currentSkill.substring(0, j + 1);
    j++;
    if (j === currentSkill.length) {
      isDeleting = true;
      setTimeout(typeEffect, pause);
      return;
    }
  } else {
    skillEl.textContent = "// " + currentSkill.substring(0, j - 1);
    j--;
    if (j === 0) {
      isDeleting = false;
      i = (i + 1) % skills.length;
    }
  }

  setTimeout(typeEffect, speed);
}

document.addEventListener("DOMContentLoaded", typeEffect);

document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");   // fade‑in
        } else {
          entry.target.classList.remove("active"); // fade‑out when it leaves
        }
      });
    },
    { threshold: 0.15 } // 15 % of element must be visible
  );

  reveals.forEach(reveal => observer.observe(reveal));
});

function openResume() {
  document.getElementById('resumeFrame').src = 'resume.pdf';
  document.getElementById('resumeModal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}
function closeResume() {
  document.getElementById('resumeModal').style.display = 'none';
  document.getElementById('resumeFrame').src = '';
  document.body.style.overflow = '';
}

document.addEventListener("DOMContentLoaded", () => {
  /* ---------------- Image‑certificate modal ---------------- */
  const certModal = document.getElementById("certModal");   // dark overlay
  const certImg = document.getElementById("certImg");     // <img> tag
  const caption = document.getElementById("caption");
  const certClose = certModal.querySelector(".close");      // the × button

  // open image modal when a list item is clicked
  document.querySelectorAll(".certificate-list li").forEach(li => {
    li.addEventListener("click", () => {
      const imgSrc = li.dataset.img;           // value from data-img=""
      if (imgSrc) {
        certImg.src = imgSrc;
        caption.textContent = li.textContent;
        certModal.style.display = "flex";
      }
    });
  });

  // close image modal (× button)
  certClose.addEventListener("click", () => {
    certImg.src = "";                          // free memory
    certModal.style.display = "none";
  });

  // close image modal by clicking outside the picture
  certModal.addEventListener("click", e => {
    if (e.target === certModal) certClose.click();
  });
});

//   /* -------------- OPTIONAL: PDF‑certificate modal ---------- */
//   // Delete this block entirely if you don't need PDFs.
//   const pdfModal  = document.getElementById("pdfModal");   // <div id="pdfModal">
//   if (pdfModal) {                                          // only if you kept that HTML
//     const pdfViewer = document.getElementById("pdfViewer");
//     const pdfClose  = pdfModal.querySelector(".close");

//     // global function you can call: showCertificate('path/to/file.pdf')
//     window.showCertificate = pdfPath => {
//       pdfViewer.src = pdfPath;
//       pdfModal.style.display = "flex";
//     };

//     pdfClose.addEventListener("click", () => {
//       pdfViewer.src = "";
//       pdfModal.style.display = "none";
//     });

//     pdfModal.addEventListener("click", e => {
//       if (e.target === pdfModal) pdfClose.click();
//     });
//   }
// });
// open modal on list click
document.querySelectorAll('.certificate-list li').forEach(item => {
  item.addEventListener('click', () => {
    const modal = document.getElementById('certModal');
    const img = document.getElementById('certImg');
    const caption = document.getElementById('caption');

    img.src = item.getAttribute('data-img');
    caption.innerText = item.textContent;

    modal.style.display = 'flex'; // make sure it's FLEX not block
  });
});

// close modal
document.querySelector('.close').addEventListener('click', () => {
  document.getElementById('certModal').style.display = 'none';
});

//----------Fun-Section-----------
// Toggle terminal with Ctrl + `
document.addEventListener('keydown', function (e) {
  if (e.ctrlKey && e.key === '`') {
    const terminal = document.getElementById('secretTerminal');
    terminal.style.display = terminal.style.display === 'none' ? 'block' : 'none';
    document.getElementById('terminalInput').focus();
  }
});
document.getElementById('secretBtn').addEventListener('click', () => {
  const terminal = document.getElementById('secretTerminal');
  terminal.style.display = terminal.style.display === 'none' ? 'block' : 'none';
  document.getElementById('terminalInput').focus();
});

//---------Logo---------------
function toggleMenu() {
  const menu = document.getElementById("navMenu");
  menu.classList.toggle("show");
}

// Handle terminal commands
document.getElementById('terminalInput').addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    const input = e.target.value.trim();
    const output = document.getElementById('terminalOutput');
    let response = '';

    switch (input.toLowerCase()) {
      case 'help':
        response = "Available commands:\n- about\n- contact\n- clear";
        break;
      case 'about':
        response = "I'm Devang, a tech enthusiast passionate about solving real-world problems.";
        break;
      case 'contact':
        response = "📧 devangangchekar2004@gmail.com\n📞 +91 72086 70323";
        break;
      case 'clear':
        output.textContent = '';
        break;
      default:
        response = `Command not recognized: ${input}`;
    }

    output.textContent += `\n> ${input}\n${response}`;
    e.target.value = '';
    output.scrollTop = output.scrollHeight;
  }
});

function toggleMenu() {
  const nav = document.getElementById('navLinks');
  if (nav.style.display === 'none' || nav.style.display === '') {
    nav.style.display = 'flex';
  } else {
    nav.style.display = 'none';
  }
}

//------------Loading Screen-----------
window.addEventListener('load', () => {
  const loader = document.getElementById('loading-screen');
  if (loader) {
    // loader.style.transition = 'opacity 0.5s ease';
    // loader.style.opacity = '0';
    setTimeout(() => loader.style.display = 'none', 3000);
  }
});