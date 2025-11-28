// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    links.forEach(link => {
        link.classList.toggle('fade');
    });
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        // Close mobile menu if open
        if(navLinks.classList.contains('open')) {
            navLinks.classList.remove('open');
        }
    });
});

// Scroll Animation (Intersection Observer)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.glass-card, .section-title, .hero-text, .hero-image').forEach(el => {
    el.classList.add('hidden');
    observer.observe(el);
});

// Add CSS class for hidden/visible elements dynamically
const style = document.createElement('style');
style.innerHTML = `
    .hidden {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease-out;
    }
    .visible {
        opacity: 1;
        transform: translateY(0);
    }
    .nav-links.open {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 80px;
        right: 0;
        width: 100%;
        background: rgba(15, 23, 42, 0.95);
        padding: 2rem;
        align-items: center;
    }
`;

// Contact Form — AJAX FormSubmit
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.target;
  const btn = form.querySelector('button[type="submit"]');

  // disable button during send
  btn.disabled = true;
  const old = btn.innerHTML;
  btn.innerHTML = "Sending…";

  fetch("https://formsubmit.co/ajax/421cedcf5529c0eb0f68762f07ce37f5", {
    method: "POST",
    body: new FormData(form)
  })
    .then(r => r.json())
    .then(() => {
      alert("Email has been sent successfully!");
      form.reset();
    })
    .catch(() => {
      alert("Something went wrong. Please try again.");
    })
    .finally(() => {
      btn.disabled = false;
      btn.innerHTML = old;
    });
});


document.head.appendChild(style);
