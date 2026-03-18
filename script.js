// NAVBAR
const navbar = document.querySelector(".navbar");
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("open");
});

links.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    hamburger.classList.remove("open");
  });
});

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

// NAVBAR SCROLL EFFECT
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// REVEAL ANIMATIONS ON SCROLL
function setupRevealAnimations() {
  const reveals = document.querySelectorAll('.reveal');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(reveal => observer.observe(reveal));
}

// PARTICLE BACKGROUND
const canvas = document.getElementById("bg-canvas");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let particlesArray = [];
  let mouseX = 0;
  let mouseY = 0;
  let animationFrameId;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
  }

  class Particle {
    constructor(x, y, dx, dy, size, color) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.size = size;
      this.color = color;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }

    update() {
      // Bounce off edges with damping
      if (this.x > canvas.width || this.x < 0) {
        this.dx = -this.dx * 0.99;
        this.x = Math.max(0, Math.min(canvas.width, this.x));
      }

      if (this.y > canvas.height || this.y < 0) {
        this.dy = -this.dy * 0.99;
        this.y = Math.max(0, Math.min(canvas.height, this.y));
      }

      // Mouse interaction
      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 100) {
        const angle = Math.atan2(dy, dx);
        const force = (100 - distance) / 1000;
        this.x -= Math.cos(angle) * force;
        this.y -= Math.sin(angle) * force;
      }

      this.x += this.dx;
      this.y += this.dy;

      this.draw();
    }
  }

  function initParticles() {
    particlesArray = [];
    const numberOfParticles = Math.min(100, Math.floor((canvas.width * canvas.height) / 15000));

    for (let i = 0; i < numberOfParticles; i++) {
      let size = Math.random() * 2 + 0.5;
      let x = Math.random() * canvas.width;
      let y = Math.random() * canvas.height;
      let dx = (Math.random() - 0.5) * 0.5;
      let dy = (Math.random() - 0.5) * 0.5;
      
      particlesArray.push(
        new Particle(x, y, dx, dy, size, "rgba(56, 189, 248, 0.3)")
      );
    }
  }

  function drawConnections() {
    for (let i = 0; i < particlesArray.length; i++) {
      for (let j = i + 1; j < particlesArray.length; j++) {
        const dx = particlesArray[i].x - particlesArray[j].x;
        const dy = particlesArray[i].y - particlesArray[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(56, 189, 248, ${0.1 * (1 - distance / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
          ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particlesArray.forEach(p => p.update());
    drawConnections();
    
    animationFrameId = requestAnimationFrame(animateParticles);
  }

  // Track mouse movement
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  window.addEventListener('resize', () => {
    resizeCanvas();
  });

  // Initialize
  resizeCanvas();
  animateParticles();
  
  // Clean up animation on page unload
  window.addEventListener('beforeunload', () => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
  });
}

// CONTACT FORM
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    const btn = this.querySelector(".submit-btn");
    const originalText = btn.textContent;
    
    btn.textContent = "Sending...";
    btn.style.opacity = "0.7";
    btn.disabled = true;
    
    // Form will submit normally to FormSubmit.co
    // But we'll reset the button if there's an error
    setTimeout(() => {
      if (btn.disabled) {
        btn.textContent = originalText;
        btn.style.opacity = "1";
        btn.disabled = false;
      }
    }, 5000);
  });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  setupRevealAnimations();
  
  // Trigger initial scroll check for navbar
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  }
});