// Mobile Menu Toggle
const mobileMenu = document.querySelector(".mobile-menu");
const nav = document.querySelector(".nav");

mobileMenu.addEventListener("click", () => {
  nav.classList.toggle("active");
  mobileMenu.classList.toggle("active");

  // Alternar scroll do body
  document.body.style.overflow = nav.classList.contains("active") ? "hidden" : "auto";
});

// Smooth scrolling para links de navegação
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      // Fechar o menu após o clique
      if (nav.classList.contains("active")) {
        nav.classList.remove("active");
        mobileMenu.classList.remove("active");
        document.body.style.overflow = "auto"; // liberar rolagem
      }
    }
  });
});

// === 3. Form submission com FormSubmit ===
const form = document.querySelector("form");

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

  // Adicionar feedback visual durante o envio
  const submitButton = this.querySelector('.submit-button');
  const originalText = submitButton.textContent;
  
  submitButton.textContent = 'Enviando...';
  submitButton.disabled = true;
  submitButton.style.opacity = '0.7';
  
  // Resetar o botão após um tempo (caso o FormSubmit não redirecione)
  setTimeout(() => {
    submitButton.textContent = originalText;
    submitButton.disabled = false;
    submitButton.style.opacity = '1';
  }, 5000);
});


// === 4. Animação ao rolar com IntersectionObserver ===
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document.querySelectorAll(".servico-card, .projeto-item").forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(el);
});

// === 5. Ampliar fotos dos projetos ===
document.querySelectorAll('.foto-item img').forEach(img => {
  img.addEventListener('click', function() {
    const modal = document.createElement('div');
    modal.className = 'foto-modal';
    modal.innerHTML = `
      <div class="foto-modal-content">
        <span class="foto-modal-close">&times;</span>
        <img src="${this.src}" alt="${this.alt}">
        <div class="foto-modal-legenda">${this.alt}</div>
      </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Fechar modal
    const closeModal = () => {
      modal.remove();
      document.body.style.overflow = 'auto';
    };
    
    modal.querySelector('.foto-modal-close').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    
    // Fechar com ESC
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeModal();
    });
  });
});

// === 6. Melhorias para dispositivos móveis ===

// Detectar se é dispositivo touch
const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

// Melhorar experiência de toque
if (isTouchDevice()) {
  // Adicionar delay para evitar toques acidentais
  let touchStartTime = 0;
  let touchStartY = 0;
  
  document.addEventListener('touchstart', (e) => {
    touchStartTime = Date.now();
    touchStartY = e.touches[0].clientY;
  });
  
  document.addEventListener('touchend', (e) => {
    const touchEndTime = Date.now();
    const touchEndY = e.changedTouches[0].clientY;
    const touchDuration = touchEndTime - touchStartTime;
    const touchDistance = Math.abs(touchEndY - touchStartY);
    
    // Se foi um toque rápido e próximo, pode ser um clique acidental
    if (touchDuration < 200 && touchDistance < 10) {
      // Adicionar feedback visual
      const target = e.target;
      if (target.classList.contains('foto-item') || 
          target.closest('.foto-item') || 
          target.classList.contains('projeto-item') ||
          target.closest('.projeto-item')) {
        target.style.transform = 'scale(0.95)';
        setTimeout(() => {
          target.style.transform = '';
        }, 150);
      }
    }
  });
}

// === 7. Otimizações de performance ===

// Lazy loading para imagens
const lazyImages = document.querySelectorAll('img[src]');
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.style.opacity = '1';
      imageObserver.unobserve(img);
    }
  });
});

lazyImages.forEach(img => {
  img.style.opacity = '0';
  img.style.transition = 'opacity 0.3s ease';
  imageObserver.observe(img);
});

// === 8. Melhorias de acessibilidade ===

// Navegação por teclado
document.addEventListener('keydown', (e) => {
  // Fechar menu mobile com ESC
  if (e.key === 'Escape' && nav.classList.contains('active')) {
    nav.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

// Melhorar foco para navegação por teclado
document.querySelectorAll('.nav a, .cta-button, .submit-button, .foto-item').forEach(element => {
  element.addEventListener('focus', () => {
    element.style.outline = '2px solid #843E00';
    element.style.outlineOffset = '2px';
  });
  
  element.addEventListener('blur', () => {
    element.style.outline = '';
    element.style.outlineOffset = '';
  });
});

// === 9. Detectar orientação do dispositivo ===
window.addEventListener('orientationchange', () => {
  // Aguardar a mudança de orientação
  setTimeout(() => {
    // Recalcular posições se necessário
    if (nav.classList.contains('active')) {
      nav.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }, 100);
});

// === 10. Melhorar performance de scroll ===
let ticking = false;

function updateHeaderOnScroll() {
  const header = document.querySelector('.header');
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateHeaderOnScroll);
    ticking = true;
  }
});
