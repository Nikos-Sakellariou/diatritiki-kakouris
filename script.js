const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

/* =========================
   HEADER
========================= */

window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 50);
});

/* =========================
   MOBILE MENU
========================= */

menuToggle?.addEventListener('click', () => {
  const open = nav?.classList.toggle('open');

  menuToggle.setAttribute(
    'aria-expanded',
    open ? 'true' : 'false'
  );
});

document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav?.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

/* =========================
   SCROLL REVEAL
========================= */

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12
  }
);

document.querySelectorAll('.reveal').forEach((element) => {
  observer.observe(element);
});

/* =========================
   SERVICE CARDS
   Stagger is handled by CSS
========================= */

document.querySelectorAll('.service-card').forEach((card) => {
  observer.observe(card);
});

/* =========================
   MACHINE CARDS
========================= */

document.querySelectorAll('.machine').forEach((machine) => {
  observer.observe(machine);
});

/* =========================
   PROJECT CARDS
========================= */

document.querySelectorAll('.project').forEach((project) => {
  observer.observe(project);
});

/* =========================
   ACTIVE NAVIGATION
========================= */

const sections = [
  ...document.querySelectorAll('main section[id]')
];

const links = [
  ...document.querySelectorAll('.main-nav a')
];

window.addEventListener('scroll', () => {
  const current = sections.reduce(
    (active, section) => {
      if (window.scrollY + 160 >= section.offsetTop) {
        return section.id;
      }

      return active;
    },
    'top'
  );

  links.forEach((link) => {
    link.classList.toggle(
      'active',
      link.getAttribute('href') === `#${current}`
    );
  });
});

/* =========================
   LIGHTBOX
========================= */

function openLightbox(src, alt) {
  const lightbox = document.getElementById('lightbox');
  const image = document.getElementById('lightbox-image');

  if (!lightbox || !image) {
    return;
  }

  image.src = src;
  image.alt = alt || '';

  lightbox.classList.add('open');

  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');

  if (!lightbox) {
    return;
  }

  lightbox.classList.remove('open');

  document.body.style.overflow = '';
}

/* ESC closes lightbox */

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeLightbox();
  }
});

const counters = document.querySelectorAll('.counter');

const counterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const counter = entry.target;
    const target = Number(counter.dataset.target);
    const duration = 1800;

    let startTime = null;

    function animateCounter(timestamp) {
      if (!startTime) startTime = timestamp;

      const progress = Math.min(
        (timestamp - startTime) / duration,
        1
      );

      // Smooth ease-out
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      const current = Math.floor(easedProgress * target);

      counter.textContent = current.toLocaleString('el-GR');

      if (progress < 1) {
        requestAnimationFrame(animateCounter);
      } else {
        counter.textContent = target.toLocaleString('el-GR');
      }
    }

    requestAnimationFrame(animateCounter);

    observer.unobserve(counter);
  });
}, {
  threshold: 0.5
});

counters.forEach(counter => {
  counterObserver.observe(counter);
});