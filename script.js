document.addEventListener("DOMContentLoaded", () => {
  // ─── CUSTOM CURSOR ───────────────────────────────
  const cursor = document.getElementById("cursor");
  const cursorFollower = document.getElementById("cursorFollower");

  let mouseX = 0,
    mouseY = 0;
  let followerX = 0,
    followerY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + "px";
    cursor.style.top = mouseY + "px";
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    cursorFollower.style.left = followerX + "px";
    cursorFollower.style.top = followerY + "px";
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // ─── NAVBAR SCROLL STATE ─────────────────────────
  const navbar = document.getElementById("navbar");

  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY > 60) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    },
    { passive: true },
  );

  // ─── SCROLL REVEAL (Intersection Observer) ───────
  const fadeEls = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  fadeEls.forEach((el) => observer.observe(el));

  // ─── ACTIVE NAV LINK ON SCROLL ───────────────────
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.remove("active-nav");
            if (link.getAttribute("href") === `#${id}`) {
              link.classList.add("active-nav");
            }
          });
        }
      });
    },
    { threshold: 0.4 },
  );

  sections.forEach((s) => sectionObserver.observe(s));

  // ─── SMOOTH NAV CLOSE ON MOBILE ──────────────────
  const navLinks2 = document.querySelectorAll(".nav-link");
  const navCollapse = document.getElementById("navMenu");

  navLinks2.forEach((link) => {
    link.addEventListener("click", () => {
      const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
      if (bsCollapse) bsCollapse.hide();
    });
  });

  // ─── PROJECT ITEM HOVER TILT ─────────────────────
  const projectItems = document.querySelectorAll(".project-item");

  projectItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      item.style.transition = "padding-left 0.3s cubic-bezier(0.16,1,0.3,1)";
      item.style.paddingLeft = "0.5rem";
    });
    item.addEventListener("mouseleave", () => {
      item.style.paddingLeft = "";
    });
  });

  // ─── SKILL CARD STAGGER ──────────────────────────
  const skillCards = document.querySelectorAll(".skill-card");

  skillCards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.06}s`;
  });

  // ─── TEXT SCRAMBLE on hero title ─────────────────
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%";
    const lines = heroTitle.querySelectorAll(".line");

    lines.forEach((line, lineIdx) => {
      const original = line.textContent;
      let iteration = 0;
      const interval = setInterval(
        () => {
          line.textContent = original
            .split("")
            .map((char, idx) => {
              if (char === " ") return " ";
              if (idx < iteration) return original[idx];
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("");
          iteration += 0.7;
          if (iteration >= original.length) {
            clearInterval(interval);
            line.textContent = original;
          }
        },
        38 + lineIdx * 10,
      );
    });
  }

  // ─── FOOTER YEAR ─────────────────────────────────
  const copyEl = document.querySelector(".footer-copy");
  if (copyEl) {
    copyEl.textContent = `© ${new Date().getFullYear()} — Crafted with precision`;
  }

  // ─── TYPING ANIMATION ────────────────────────────
  const typingEl = document.getElementById("typing-text");
  if (typingEl) {
    const words = [
      "Full-Stack Developer",
      "Problem Solver",
      "UI Enthusiast",
      "Open Source Lover",
    ];
    let wordIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let isPaused = false;

    function type() {
      const current = words[wordIdx];

      if (isPaused) {
        isPaused = false;
        setTimeout(type, 1200);
        return;
      }

      if (!isDeleting) {
        typingEl.textContent = current.slice(0, charIdx + 1);
        charIdx++;
        if (charIdx === current.length) {
          isDeleting = true;
          isPaused = true;
          setTimeout(type, 0);
          return;
        }
        setTimeout(type, 90);
      } else {
        typingEl.textContent = current.slice(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) {
          isDeleting = false;
          wordIdx = (wordIdx + 1) % words.length;
        }
        setTimeout(type, 48);
      }
    }

    setTimeout(type, 1400); // mulai setelah hero reveal
  }
  const toggleBtn = document.getElementById("themeToggle");

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");

      if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        toggleBtn.textContent = "☀️";
      } else {
        localStorage.setItem("theme", "light");
        toggleBtn.textContent = "🌙";
      }
    });
  }
  // ─── SCROLL PROGRESS BAR ─────────────────
  const scrollBar = document.getElementById("scrollBar");

  if (scrollBar) {
    window.addEventListener("scroll", () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const scrollPercent = (scrollTop / scrollHeight) * 100;

      scrollBar.style.width = scrollPercent + "%";
    });
  }
});
