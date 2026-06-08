const mobileMenu = document.querySelector(".mobile-menu");
const nav = document.querySelector(".nav");

if (mobileMenu && nav) {
  mobileMenu.addEventListener("click", () => {
    nav.classList.toggle("active");
    mobileMenu.classList.toggle("active");
    document.body.style.overflow = nav.classList.contains("active") ? "hidden" : "auto";
  });
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));

    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    if (nav && mobileMenu && nav.classList.contains("active")) {
      nav.classList.remove("active");
      mobileMenu.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });
});

const form = document.querySelector("form");

if (form) {
  form.addEventListener("submit", function (e) {
    const name = this.querySelector('input[name="name"]').value.trim();
    const email = this.querySelector('input[name="email"]').value.trim();
    const phone = this.querySelector('input[name="phone"]').value.trim();
    const message = this.querySelector("textarea[name='message']").value.trim();

    if (!name || !email || !phone || !message) {
      e.preventDefault();
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const submitButton = this.querySelector(".submit-button");
    const originalText = submitButton.textContent;

    submitButton.textContent = "Enviando...";
    submitButton.disabled = true;
    submitButton.style.opacity = "0.7";

    setTimeout(() => {
      submitButton.textContent = originalText;
      submitButton.disabled = false;
      submitButton.style.opacity = "1";
    }, 5000);
  });
}

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        entry.target.addEventListener("transitionend", () => {
          entry.target.style.transform = "";
        }, { once: true });
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".servico-card, .projeto-card").forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
}

function initProjectGallery() {
  const filterButtons = document.querySelectorAll(".projeto-filter");
  const projectCards = document.querySelectorAll(".projeto-card");
  const galleryTriggers = document.querySelectorAll(".galeria-trigger");

  if (!projectCards.length) return;

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedFilter = button.dataset.filter;

      filterButtons.forEach((filterButton) => {
        const isActive = filterButton === button;
        filterButton.classList.toggle("active", isActive);
        filterButton.setAttribute("aria-pressed", String(isActive));
      });

      projectCards.forEach((card) => {
        const shouldShow = selectedFilter === "todos" || card.dataset.category === selectedFilter;
        card.classList.toggle("is-hidden", !shouldShow);
      });
    });
  });

  let modal = null;
  let modalImage = null;
  let modalProject = null;
  let modalCaption = null;
  let currentItems = [];
  let currentIndex = 0;
  let previousFocus = null;
  let previousBodyOverflow = "";

  const getProjectItems = (projectName) => {
    const thumbs = Array.from(document.querySelectorAll(".projeto-thumb.galeria-trigger"));
    return thumbs.filter((item) => item.dataset.project === projectName);
  };

  const renderModalImage = () => {
    const item = currentItems[currentIndex];

    if (!item || !modalImage || !modalProject || !modalCaption) return;

    modalImage.src = item.dataset.src;
    modalImage.alt = item.querySelector("img")?.alt || item.dataset.caption || item.dataset.project;
    modalProject.textContent = item.dataset.project;
    modalCaption.textContent = item.dataset.caption;
  };

  const closeGallery = () => {
    if (!modal) return;

    modal.remove();
    modal = null;
    document.body.style.overflow = previousBodyOverflow;
    document.removeEventListener("keydown", handleGalleryKeydown);

    if (previousFocus && typeof previousFocus.focus === "function") {
      previousFocus.focus();
    }
  };

  const showPreviousImage = () => {
    currentIndex = (currentIndex - 1 + currentItems.length) % currentItems.length;
    renderModalImage();
  };

  const showNextImage = () => {
    currentIndex = (currentIndex + 1) % currentItems.length;
    renderModalImage();
  };

  function handleGalleryKeydown(e) {
    if (e.key === "Escape") {
      closeGallery();
    }

    if (e.key === "ArrowLeft") {
      showPreviousImage();
    }

    if (e.key === "ArrowRight") {
      showNextImage();
    }
  }

  const openGallery = (trigger) => {
    const projectItems = getProjectItems(trigger.dataset.project);
    currentItems = projectItems.length ? projectItems : [trigger];
    currentIndex = currentItems.findIndex((item) => item.dataset.src === trigger.dataset.src);

    if (currentIndex < 0) {
      currentIndex = 0;
    }

    previousFocus = document.activeElement;
    previousBodyOverflow = document.body.style.overflow;

    modal = document.createElement("div");
    modal.className = "galeria-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-label", "Foto do projeto");
    modal.innerHTML = `
      <button class="galeria-modal-close" type="button" aria-label="Fechar galeria">
        <i class="fas fa-times" aria-hidden="true"></i>
      </button>
      <button class="galeria-modal-nav galeria-prev" type="button" aria-label="Foto anterior">
        <i class="fas fa-chevron-left" aria-hidden="true"></i>
      </button>
      <figure class="galeria-modal-content">
        <img src="" alt="">
        <figcaption class="galeria-modal-caption">
          <strong></strong>
          <span></span>
        </figcaption>
      </figure>
      <button class="galeria-modal-nav galeria-next" type="button" aria-label="Próxima foto">
        <i class="fas fa-chevron-right" aria-hidden="true"></i>
      </button>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = "hidden";

    modalImage = modal.querySelector(".galeria-modal-content img");
    modalProject = modal.querySelector(".galeria-modal-caption strong");
    modalCaption = modal.querySelector(".galeria-modal-caption span");

    modal.querySelector(".galeria-modal-close").addEventListener("click", closeGallery);
    modal.querySelector(".galeria-prev").addEventListener("click", showPreviousImage);
    modal.querySelector(".galeria-next").addEventListener("click", showNextImage);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeGallery();
    });

    document.addEventListener("keydown", handleGalleryKeydown);
    renderModalImage();
    modal.querySelector(".galeria-modal-close").focus();
  };

  galleryTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => openGallery(trigger));
  });
}

initProjectGallery();

const isTouchDevice = () => {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
};

if (isTouchDevice()) {
  let touchStartTime = 0;
  let touchStartY = 0;

  document.addEventListener("touchstart", (e) => {
    touchStartTime = Date.now();
    touchStartY = e.touches[0].clientY;
  });

  document.addEventListener("touchend", (e) => {
    const touchEndTime = Date.now();
    const touchEndY = e.changedTouches[0].clientY;
    const touchDuration = touchEndTime - touchStartTime;
    const touchDistance = Math.abs(touchEndY - touchStartY);

    if (touchDuration < 200 && touchDistance < 10) {
      const target = e.target.closest(".galeria-trigger, .projeto-card");

      if (target) {
        target.style.transform = "scale(0.98)";
        setTimeout(() => {
          target.style.transform = "";
        }, 150);
      }
    }
  });
}

const lazyImages = document.querySelectorAll("img[src]");

if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.style.opacity = "1";
        imageObserver.unobserve(img);
      }
    });
  });

  lazyImages.forEach((img) => {
    img.style.opacity = "0";
    img.style.transition = "opacity 0.3s ease";
    imageObserver.observe(img);
  });
} else {
  lazyImages.forEach((img) => {
    img.style.opacity = "1";
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && nav && mobileMenu && nav.classList.contains("active")) {
    nav.classList.remove("active");
    mobileMenu.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});

window.addEventListener("orientationchange", () => {
  setTimeout(() => {
    if (nav && mobileMenu && nav.classList.contains("active")) {
      nav.classList.remove("active");
      mobileMenu.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  }, 100);
});

let ticking = false;

function updateHeaderOnScroll() {
  const header = document.querySelector(".header");

  if (!header) return;

  if (window.scrollY > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  ticking = false;
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(updateHeaderOnScroll);
    ticking = true;
  }
});

const scrollIndicator = document.querySelector(".hero-scroll");

if (scrollIndicator) {
  scrollIndicator.addEventListener("click", () => {
    const sobreSection = document.querySelector("#sobre");

    if (sobreSection) {
      sobreSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
}

function animateNumbers() {
  const statNumbers = document.querySelectorAll(".stat-number");

  statNumbers.forEach((stat) => {
    const target = parseInt(stat.textContent.replace(/\D/g, ""), 10);
    const suffix = stat.textContent.replace(/\d/g, "");
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
      current += increment;

      if (current >= target) {
        current = target;
        clearInterval(timer);
      }

      stat.textContent = Math.floor(current) + suffix;
    }, 30);
  });
}

const heroSection = document.querySelector(".hero");

if (heroSection && "IntersectionObserver" in window) {
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setTimeout(animateNumbers, 1000);
        heroObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  heroObserver.observe(heroSection);
}
