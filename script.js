// Web Agency JavaScript Functionality

document.addEventListener("DOMContentLoaded", function () {
  console.log("Web Agency - Loading...");
  initializeApp();
});

function initializeApp() {
  setTimeout(() => {
    hideLoadingScreen();
  }, 1500);
  initializeNavigation();
  initializeScrollAnimations();
  initializeSkillBars();
  initializeScrollToTop();
  initializeSmoothScrolling();
  initializeHoverEffects();

  console.log("Web Agency - All systems ready!");
}

function hideLoadingScreen() {
  const loadingScreen = document.getElementById("loading-screen");
  if (loadingScreen) {
    loadingScreen.style.opacity = "0";
    loadingScreen.style.visibility = "hidden";
    setTimeout(() => {
      loadingScreen.style.display = "none";
    }, 500);
  }
}

function initializeNavigation() {
  const navbar = document.getElementById("navbar");
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link");

  let lastScrollTop = 0;
  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
      navbar.classList.add("bg-white/95", "shadow-lg");
      navbar.classList.remove("bg-white/90");
    } else {
      navbar.classList.add("bg-white/90");
      navbar.classList.remove("bg-white/95", "shadow-lg");
    }

    lastScrollTop = scrollTop;
  });

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.contains("mobile-menu-open");

      if (isOpen) {
        mobileMenu.classList.remove("mobile-menu-open");
        mobileMenu.classList.add("mobile-menu-closed");
      } else {
        mobileMenu.classList.remove("mobile-menu-closed");
        mobileMenu.classList.add("mobile-menu-open");
      }

      const lines = mobileMenuBtn.querySelectorAll(".hamburger-line");
      lines.forEach((line, index) => {
        if (!isOpen) {
          if (index === 0)
            line.style.transform = "rotate(45deg) translate(5px, 5px)";
          if (index === 1) line.style.opacity = "0";
          if (index === 2)
            line.style.transform = "rotate(-45deg) translate(7px, -6px)";
        } else {
          line.style.transform = "";
          line.style.opacity = "";
        }
      });
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      navLinks.forEach((l) => {
        l.classList.remove("text-[#1BC8D3]", "border-b-2", "border-[#1BC8D3]");
      });
      link.classList.add("text-[#1BC8D3]", "border-b-2", "border-[#1BC8D3]");
      if (mobileMenu && mobileMenu.classList.contains("mobile-menu-open")) {
        mobileMenu.classList.remove("mobile-menu-open");
        mobileMenu.classList.add("mobile-menu-closed");
        const lines = mobileMenuBtn.querySelectorAll(".hamburger-line");
        lines.forEach((line) => {
          line.style.transform = "";
          line.style.opacity = "";
        });
      }
    });
  });
}

function initializeScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    ".fade-in-up, .fade-in-left, .fade-in-right"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
          const siblings = entry.target.parentElement.querySelectorAll(
            ".fade-in-up, .fade-in-left, .fade-in-right"
          );
          siblings.forEach((sibling, index) => {
            if (sibling === entry.target) return;
            setTimeout(() => {
              sibling.classList.add("animate");
            }, index * 100);
          });
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  animatedElements.forEach((element) => {
    observer.observe(element);
  });
}

function initializeSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress");

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progressBar = entry.target;
          const targetWidth = progressBar.getAttribute("data-width");
          setTimeout(() => {
            progressBar.style.setProperty("--target-width", targetWidth + "%");
            progressBar.classList.add("animate");
          }, 300);
          skillObserver.unobserve(progressBar);
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  skillBars.forEach((bar) => {
    skillObserver.observe(bar);
  });
}

function initializeScrollToTop() {
  const scrollTopBtn = document.getElementById("scroll-top");

  if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add("visible");
      } else {
        scrollTopBtn.classList.remove("visible");
      }
    });

    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
}

function initializeSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
}

function initializeHoverEffects() {
  // Service cards hover effects
  const serviceCards = document.querySelectorAll(".service-card");
  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)";
    });
  });

  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      const img = card.querySelector("img");
      if (img) {
        img.style.transform = "scale(1.1)";
      }
    });

    card.addEventListener("mouseleave", () => {
      const img = card.querySelector("img");
      if (img) {
        img.style.transform = "scale(1)";
      }
    });
  });

  const buttons = document.querySelectorAll(".btn-primary, .btn-secondary");
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", () => {
      button.style.transform = "translateY(-2px)";
      button.style.boxShadow = "0 8px 25px rgba(27, 200, 211, 0.3)";
    });

    button.addEventListener("mouseleave", () => {
      button.style.transform = "translateY(0)";
      button.style.boxShadow = "";
    });
  });
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const optimizedScrollHandler = debounce(() => {}, 16); // ~60fps

window.addEventListener("scroll", optimizedScrollHandler);

let clickCount = 0;
const logo = document.querySelector(".logo h2");
if (logo) {
  logo.addEventListener("click", () => {
    clickCount++;
    if (clickCount === 5) {
      logo.style.background =
        "linear-gradient(45deg, #1BC8D3, #16a8b3, #1BC8D3)";
      logo.style.backgroundSize = "200% 200%";
      logo.style.animation = "gradient 2s ease infinite";
      logo.style.webkitBackgroundClip = "text";
      logo.style.webkitTextFillColor = "transparent";
      const style = document.createElement("style");
      style.textContent = `
                @keyframes gradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
            `;
      document.head.appendChild(style);

      setTimeout(() => {
        logo.style.background = "";
        logo.style.animation = "";
        logo.style.webkitBackgroundClip = "";
        logo.style.webkitTextFillColor = "";
        clickCount = 0;
      }, 5000);
    }
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    if (mobileMenu && mobileMenu.classList.contains("mobile-menu-open")) {
      mobileMenu.classList.remove("mobile-menu-open");
      mobileMenu.classList.add("mobile-menu-closed");
      const lines = mobileMenuBtn.querySelectorAll(".hamburger-line");
      lines.forEach((line) => {
        line.style.transform = "";
        line.style.opacity = "";
      });
    }
  }
});

const focusableElements = document.querySelectorAll(
  'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
);

focusableElements.forEach((element) => {
  element.addEventListener("focus", () => {
    element.style.outline = "2px solid #1BC8D3";
    element.style.outlineOffset = "2px";
  });

  element.addEventListener("blur", () => {
    element.style.outline = "";
    element.style.outlineOffset = "";
  });
});

console.log("Web Agency JavaScript loaded successfully! 🚀");
