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
    open ? 'Κλείσιμο μενού' : 'Άνοιγμα μενού'
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
 * Close menu with Escape.
 */

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;

  if (
    menuToggle &&
    menuToggle.getAttribute('aria-expanded') === 'true'
  ) {
    setMenuState(false);
    menuToggle.focus();
  }
});


/*
 * If the browser is resized back to desktop,
 * make sure the mobile menu is reset.
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

    /*
     * Small stagger effect.
     */

    const delay =
      Math.min(index % 5, 4) * 70;

    element.style.transitionDelay =
      `${delay}ms`;

    revealObserver.observe(element);

  });

} else {

  /*
   * Fallback for very old browsers.
   */

  revealElements.forEach((element) => {
    element.classList.add('visible');
  });

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

function updateActiveNavigation() {

  if (!sections.length || !navLinks.length) {
    return;
  }

  const scrollPosition =
    window.scrollY + 180;

  let currentSection = 'top';


  sections.forEach((section) => {

    if (
      scrollPosition >= section.offsetTop
    ) {
      currentSection = section.id;
    }

  });


  /*
   * The hero does not have an id,
   * therefore "top" represents the home state.
   */

  navLinks.forEach((link) => {

    const href =
      link.getAttribute('href');

    const targetId =
      href?.startsWith('#')
        ? href.substring(1)
        : '';

    const isActive =
      targetId === currentSection;

    link.classList.toggle(
      'active',
      isActive
    );

  });
}

window.addEventListener(
  'scroll',
  updateActiveNavigation,
  { passive: true }
);

window.addEventListener(
  'resize',
  updateActiveNavigation
);

updateActiveNavigation();


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

  /*
   * Prevent page scrolling while the
   * image is open.
   */

  document.body.style.overflow = 'hidden';

  /*
   * Move keyboard focus to close button.
   */

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
   * Clear image after the closing transition.
   * This also avoids keeping large images in memory.
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
   * Return keyboard focus to the element
   * that opened the lightbox.
   */

  if (
    lastFocusedElement &&
    typeof lastFocusedElement.focus === 'function'
  ) {
    lastFocusedElement.focus();
  }

}


/*
 * Make functions available globally because
 * the HTML uses onclick="openLightbox(...)"
 */

window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;


/*
 * Close using the X button.
 */

lightboxClose?.addEventListener(
  'click',
  (event) => {

    event.stopPropagation();

    closeLightbox();

  }
);


/*
 * Clicking the dark background closes the lightbox.
 */

lightbox?.addEventListener(
  'click',
  (event) => {

    if (
      event.target === lightbox
    ) {
      closeLightbox();
    }

  }
);


/*
 * Escape closes the lightbox.
 */

document.addEventListener(
  'keydown',
  (event) => {

    if (
      event.key === 'Escape' &&
      lightbox?.classList.contains('open')
    ) {

      closeLightbox();

    }

  }
);


/*
 * Basic keyboard trap inside the lightbox.
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

  if (
    !Number.isFinite(target)
  ) {
    return;
  }


  /*
   * Reduced motion:
   * show the final value immediately.
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

/*
 * If an image cannot load, prevent ugly broken-image
 * rendering and keep the layout stable.
 */

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

/*
 * Smooth scrolling is already enabled through CSS.
 *
 * This handler makes sure that navigation works
 * correctly with the fixed header and closes the
 * mobile menu before scrolling.
 */

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
         * Let the browser handle the actual
         * scrolling via CSS scroll-behavior.
         * We only close the mobile menu.
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
