```javascript
'use strict';

/* =========================================================
   DOM ELEMENTS
========================================================= */

const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxClose = document.querySelector('.lightbox-close');

const navLinks = [...document.querySelectorAll('.main-nav a')];
const sections = [...document.querySelectorAll('main section[id]')];

const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;


/* =========================================================
   HEADER
========================================================= */

function updateHeader() {
  if (!header) return;

  header.classList.toggle(
    'scrolled',
    window.scrollY > 50
  );
}

window.addEventListener(
  'scroll',
  updateHeader,
  { passive: true }
);

updateHeader();


/* =========================================================
   MOBILE MENU
========================================================= */

function setMenuState(open) {
  if (!menuToggle || !nav) return;

  nav.classList.toggle('open', open);

  menuToggle.setAttribute(
    'aria-expanded',
    String(open)
  );

  menuToggle.setAttribute(
    'aria-label',
    open
      ? 'Κλείσιμο μενού'
      : 'Άνοιγμα μενού'
  );
}

menuToggle?.addEventListener('click', () => {
  const isOpen =
    menuToggle.getAttribute('aria-expanded') === 'true';

  setMenuState(!isOpen);
});


/*
 * Close mobile menu after clicking a navigation link.
 */

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    setMenuState(false);
  });
});


/*
 * Close menu when clicking outside it.
 */

document.addEventListener('click', (event) => {
  if (!nav || !menuToggle) return;

  const isMenuOpen =
    menuToggle.getAttribute('aria-expanded') === 'true';

  if (!isMenuOpen) return;

  const target = event.target;

  if (
    !nav.contains(target) &&
    !menuToggle.contains(target)
  ) {
    setMenuState(false);
  }
});


/*
 * Reset menu when returning to desktop.
 */

window.addEventListener('resize', () => {
  if (window.innerWidth > 850) {
    setMenuState(false);
  }
});


/* =========================================================
   REVEAL ANIMATIONS
========================================================= */

const revealElements = [
  ...document.querySelectorAll('.reveal')
];

if (prefersReducedMotion) {

  revealElements.forEach((element) => {
    element.classList.add('visible');
  });

} else if ('IntersectionObserver' in window) {

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {

      entries.forEach((entry) => {

        if (!entry.isIntersecting) return;

        entry.target.classList.add('visible');

        observer.unobserve(entry.target);

      });

    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  );


  revealElements.forEach((element, index) => {

    const delay =
      Math.min(index % 5, 4) * 70;

    element.style.transitionDelay =
      `${delay}ms`;

    revealObserver.observe(element);

  });

} else {

  revealElements.forEach((element) => {
    element.classList.add('visible');
  });

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

/*
 * Use IntersectionObserver instead of reading
 * section.offsetTop on every scroll event.
 *
 * This avoids repeated layout calculations and
 * prevents unnecessary forced reflows.
 */

if (
  sections.length &&
  navLinks.length &&
  'IntersectionObserver' in window
) {

  const sectionToNavLink = new Map();

  navLinks.forEach((link) => {

    const href =
      link.getAttribute('href');

    if (!href?.startsWith('#')) {
      return;
    }

    const targetId =
      href.substring(1);

    const targetSection =
      document.getElementById(targetId);

    if (targetSection) {
      sectionToNavLink.set(
        targetSection,
        link
      );
    }

  });


  const activeSections = new Set();


  function updateActiveLink() {

    /*
     * Find the section closest to the top of
     * the viewport.
     */

    let activeSection = null;
    let smallestDistance = Infinity;

    activeSections.forEach((section) => {

      const rect =
        section.getBoundingClientRect();

      const distance =
        Math.abs(rect.top - 180);

      if (distance < smallestDistance) {
        smallestDistance = distance;
        activeSection = section;
      }

    });


    navLinks.forEach((link) => {
      link.classList.remove('active');
    });


    if (activeSection) {

      const activeLink =
        sectionToNavLink.get(activeSection);

      activeLink?.classList.add('active');

    }

  }


  const navigationObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {
            activeSections.add(entry.target);
          } else {
            activeSections.delete(entry.target);
          }

        });

        updateActiveLink();

      },
      {
        root: null,
        rootMargin: '-180px 0px -45% 0px',
        threshold: 0
      }
    );


  sections.forEach((section) => {
    navigationObserver.observe(section);
  });


} else {

  /*
   * Fallback for browsers without IntersectionObserver.
   */

  navLinks.forEach((link) => {
    link.classList.remove('active');
  });

}


/* =========================================================
   LIGHTBOX
========================================================= */

let lastFocusedElement = null;


/*
 * Open lightbox.
 *
 * Called directly from image onclick:
 *
 * openLightbox(this.src, this.alt)
 */

function openLightbox(src, alt = '') {

  if (!lightbox || !lightboxImage) {
    return;
  }

  lastFocusedElement =
    document.activeElement;

  lightboxImage.src = src;
  lightboxImage.alt = alt;

  lightbox.classList.add('open');

  lightbox.setAttribute(
    'aria-hidden',
    'false'
  );

  document.body.classList.add(
    'lightbox-open'
  );

  document.body.style.overflow = 'hidden';

  requestAnimationFrame(() => {
    lightboxClose?.focus();
  });

}


/*
 * Close lightbox.
 */

function closeLightbox() {

  if (!lightbox) {
    return;
  }

  lightbox.classList.remove('open');

  lightbox.setAttribute(
    'aria-hidden',
    'true'
  );

  document.body.classList.remove(
    'lightbox-open'
  );

  document.body.style.overflow = '';


  /*
   * Clear image after closing transition.
   */

  window.setTimeout(() => {

    if (!lightbox.classList.contains('open')) {

      if (lightboxImage) {
        lightboxImage.src = '';
        lightboxImage.alt = '';
      }

    }

  }, 250);


  /*
   * Restore previous focus.
   */

  if (
    lastFocusedElement &&
    typeof lastFocusedElement.focus === 'function'
  ) {
    lastFocusedElement.focus();
  }

}


window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;


/*
 * Close using X button.
 */

lightboxClose?.addEventListener(
  'click',
  (event) => {

    event.stopPropagation();

    closeLightbox();

  }
);


/*
 * Clicking dark background closes lightbox.
 */

lightbox?.addEventListener(
  'click',
  (event) => {

    if (event.target === lightbox) {
      closeLightbox();
    }

  }
);


/*
 * Keyboard handling.
 */

document.addEventListener(
  'keydown',
  (event) => {

    if (event.key === 'Escape') {

      /*
       * Close lightbox first.
       */

      if (
        lightbox?.classList.contains('open')
      ) {
        closeLightbox();
        return;
      }


      /*
       * Otherwise close mobile menu.
       */

      if (
        menuToggle &&
        menuToggle.getAttribute('aria-expanded') === 'true'
      ) {
        setMenuState(false);
        menuToggle.focus();
      }

    }

  }
);


/*
 * Basic keyboard trap inside lightbox.
 */

lightbox?.addEventListener(
  'keydown',
  (event) => {

    if (event.key !== 'Tab') {
      return;
    }

    if (!lightboxClose) {
      return;
    }

    event.preventDefault();

    lightboxClose.focus();

  }
);


/* =========================================================
   STAT COUNTERS
========================================================= */

const counters = [
  ...document.querySelectorAll('.counter')
];


function animateCounter(counter) {

  const target =
    Number(counter.dataset.target);

  if (!Number.isFinite(target)) {
    return;
  }


  /*
   * Reduced motion:
   * show final value immediately.
   */

  if (prefersReducedMotion) {

    counter.textContent =
      target.toLocaleString('el-GR');

    return;

  }


  const duration = 1600;

  const startTime =
    performance.now();


  function updateCounter(currentTime) {

    const elapsed =
      currentTime - startTime;

    const progress =
      Math.min(
        elapsed / duration,
        1
      );


    /*
     * Ease-out cubic.
     */

    const eased =
      1 - Math.pow(1 - progress, 3);


    const currentValue =
      Math.floor(target * eased);


    counter.textContent =
      currentValue.toLocaleString('el-GR');


    if (progress < 1) {

      requestAnimationFrame(
        updateCounter
      );

    } else {

      counter.textContent =
        target.toLocaleString('el-GR');

    }

  }


  requestAnimationFrame(
    updateCounter
  );

}


if (counters.length) {

  if (
    prefersReducedMotion ||
    !('IntersectionObserver' in window)
  ) {

    counters.forEach(
      animateCounter
    );

  } else {

    const counterObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) {
              return;
            }

            animateCounter(
              entry.target
            );

            observer.unobserve(
              entry.target
            );

          });

        },
        {
          threshold: 0.45
        }
      );


    counters.forEach((counter) => {

      counterObserver.observe(
        counter
      );

    });

  }

}


/* =========================================================
   IMAGE ERROR HANDLING
========================================================= */

document
  .querySelectorAll('img')
  .forEach((image) => {

    image.addEventListener(
      'error',
      () => {

        image.classList.add(
          'image-error'
        );

      },
      { once: true }
    );

  });


/* =========================================================
   ANCHOR LINKS
========================================================= */

document
  .querySelectorAll('a[href^="#"]')
  .forEach((link) => {

    link.addEventListener(
      'click',
      (event) => {

        const href =
          link.getAttribute('href');

        if (
          !href ||
          href === '#'
        ) {
          return;
        }

        const target =
          document.querySelector(href);

        if (!target) {
          return;
        }

        /*
         * Close mobile menu.
         *
         * Scrolling itself is handled by CSS
         * scroll-behavior.
         */

        setMenuState(false);

      }
    );

  });


/* =========================================================
   INITIAL STATE
========================================================= */

document.documentElement.classList.add(
  'js-ready'
);
```
