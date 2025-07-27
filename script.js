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

// === 3. Form submission com validação simples ===
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = this.querySelector('input[type="text"]').value.trim();
  const email = this.querySelector('input[type="email"]').value.trim();
  const phone = this.querySelector('input[type="tel"]').value.trim();
  const message = this.querySelector("textarea").value.trim();

  if (!name || !email || !phone || !message) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  alert("Mensagem enviada com sucesso! Entraremos em contato em breve.");
  this.reset();
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
