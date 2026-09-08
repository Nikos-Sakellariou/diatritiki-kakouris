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

/*
 * Instead of checking window.scrollY on every scroll event,
 * use IntersectionObserver.
 *
 * This avoids unnecessary layout work caused by changing
 * the header class during scroll.
 */

if (
  header &&
  'IntersectionObserver' in window
) {
  const headerSentinel = document.createElement('div');

  headerSentinel.setAttribute(
    'aria-hidden',
    'true'
  );

  headerSentinel.style.position = 'absolute';
  headerSentinel.style.top = '50px';
  headerSentinel.style.left = '0';
  headerSentinel.style.width = '1px';
  headerSentinel.style.height = '1px';
  headerSentinel.style.pointerEvents = 'none';


  document.body.prepend(headerSentinel);


  const headerObserver =
    new IntersectionObserver(
      ([entry]) => {

        header.classList.toggle(
          'scrolled',
          !entry.isIntersecting
        );

      },
      {
        threshold: 0
      }
    );


  headerObserver.observe(
    headerSentinel
  );
}


/* =========================================================
   MOBILE MENU
========================================================= */

function setMenuState(open) {

  if (!menuToggle || !nav) {
    return;
  }


  nav.classList.toggle(
    'open',
    open
  );


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


/*
 * Toggle mobile menu.
 */

menuToggle?.addEventListener(
  'click',
  () => {

    const isOpen =
      menuToggle.getAttribute(
        'aria-expanded'
      ) === 'true';


    setMenuState(!isOpen);

  }
);


/*
 * Close mobile menu after clicking
 * a navigation link.
 */

navLinks.forEach((link) => {

  link.addEventListener(
    'click',
    () => {
      setMenuState(false);
    }
  );

});


/*
 * Close menu when clicking outside.
 */

document.addEventListener(
  'click',
  (event) => {

    if (!nav || !menuToggle) {
      return;
    }


    const isMenuOpen =
      menuToggle.getAttribute(
        'aria-expanded'
      ) === 'true';


    if (!isMenuOpen) {
      return;
    }


    const target =
      event.target;


    if (
      !nav.contains(target) &&
      !menuToggle.contains(target)
    ) {

      setMenuState(false);

    }

  }
);


/*
 * Reset mobile menu when returning
 * to desktop width.
 */

window.addEventListener(
  'resize',
  () => {

    if (window.innerWidth > 850) {
      setMenuState(false);
    }

  }
);


/* =========================================================
   REVEAL ANIMATIONS
========================================================= */

const revealElements = [
  ...document.querySelectorAll('.reveal')
];


if (prefersReducedMotion) {

  revealElements.forEach(
    (element) => {
      element.classList.add('visible');
    }
  );

} else if (
  'IntersectionObserver' in window
) {

  const revealObserver =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach(
          (entry) => {

            if (!entry.isIntersecting) {
              return;
            }


            entry.target.classList.add(
              'visible'
            );


            observer.unobserve(
              entry.target
            );

          }
        );

      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );


  revealElements.forEach(
    (element, index) => {

      /*
       * Small stagger effect.
       */

      const delay =
        Math.min(
          index % 5,
          4
        ) * 70;


      element.style.transitionDelay =
        `${delay}ms`;


      revealObserver.observe(
        element
      );

    }
  );

} else {

  /*
   * Fallback for older browsers.
   */

  revealElements.forEach(
    (element) => {
      element.classList.add('visible');
    }
  );

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

/*
 * Use IntersectionObserver instead of:
 *
 * - section.offsetTop
 * - section.getBoundingClientRect()
 * - scroll event calculations
 *
 * This keeps navigation state lightweight.
 */

if (
  sections.length &&
  navLinks.length &&
  'IntersectionObserver' in window
) {

  const sectionLinks =
    new Map();


  /*
   * Map each section to its navigation link.
   */

  navLinks.forEach(
    (link) => {

      const href =
        link.getAttribute('href');


      if (!href?.startsWith('#')) {
        return;
      }


      const sectionId =
        href.substring(1);


      const section =
        document.getElementById(
          sectionId
        );


      if (section) {

        sectionLinks.set(
          section,
          link
        );

      }

    }
  );


  let activeSection = null;


  const navigationObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach(
          (entry) => {

            if (entry.isIntersecting) {

              activeSection =
                entry.target;

            }

          }
        );


        /*
         * Remove active state.
         */

        navLinks.forEach(
          (link) => {

            link.classList.remove(
              'active'
            );

          }
        );


        /*
         * Add active state.
         */

        if (activeSection) {

          const activeLink =
            sectionLinks.get(
              activeSection
            );


          activeLink?.classList.add(
            'active'
          );

        }

      },
      {
        root: null,
        rootMargin: '-180px 0px -50% 0px',
        threshold: 0
      }
    );


  sections.forEach(
    (section) => {

      navigationObserver.observe(
        section
      );

    }
  );

}


/* =========================================================
   LIGHTBOX
========================================================= */

let lastFocusedElement = null;


/*
 * Open lightbox.
 *
 * Called from HTML:
 *
 * openLightbox(this.src, this.alt)
 */

function openLightbox(
  src,
  alt = ''
) {

  if (
    !lightbox ||
    !lightboxImage
  ) {
    return;
  }


  lastFocusedElement =
    document.activeElement;


  lightboxImage.src =
    src;


  lightboxImage.alt =
    alt;


  lightbox.classList.add(
    'open'
  );


  lightbox.setAttribute(
    'aria-hidden',
    'false'
  );


  document.body.classList.add(
    'lightbox-open'
  );


  document.body.style.overflow =
    'hidden';


  /*
   * Move keyboard focus to
   * the close button.
   */

  requestAnimationFrame(
    () => {

      lightboxClose?.focus();

    }
  );

}


/*
 * Close lightbox.
 */

function closeLightbox() {

  if (!lightbox) {
    return;
  }


  lightbox.classList.remove(
    'open'
  );


  lightbox.setAttribute(
    'aria-hidden',
    'true'
  );


  document.body.classList.remove(
    'lightbox-open'
  );


  document.body.style.overflow =
    '';


  /*
   * Clear image after the closing
   * transition.
   */

  window.setTimeout(
    () => {

      if (
        !lightbox.classList.contains(
          'open'
        )
      ) {

        if (lightboxImage) {

          lightboxImage.src =
            '';

          lightboxImage.alt =
            '';

        }

      }

    },
    250
  );


  /*
   * Restore previous focus.
   */

  if (
    lastFocusedElement &&
    typeof lastFocusedElement.focus ===
      'function'
  ) {

    lastFocusedElement.focus();

  }

}


/*
 * Make functions globally available
 * because the HTML uses onclick.
 */

window.openLightbox =
  openLightbox;

window.closeLightbox =
  closeLightbox;


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
 * Clicking the dark background
 * closes the lightbox.
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
 * Escape:
 *
 * 1. Close lightbox if open.
 * 2. Otherwise close mobile menu.
 */

document.addEventListener(
  'keydown',
  (event) => {

    if (
      event.key !== 'Escape'
    ) {
      return;
    }


    if (
      lightbox?.classList.contains(
        'open'
      )
    ) {

      closeLightbox();

      return;

    }


    if (
      menuToggle &&
      menuToggle.getAttribute(
        'aria-expanded'
      ) === 'true'
    ) {

      setMenuState(false);

      menuToggle.focus();

    }

  }
);


/*
 * Basic keyboard trap inside
 * the lightbox.
 */

lightbox?.addEventListener(
  'keydown',
  (event) => {

    if (
      event.key !== 'Tab'
    ) {
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
  ...document.querySelectorAll(
    '.counter'
  )
];


function animateCounter(counter) {

  const target =
    Number(
      counter.dataset.target
    );


  if (
    !Number.isFinite(target)
  ) {
    return;
  }


  /*
   * Reduced motion:
   * show final value immediately.
   */

  if (prefersReducedMotion) {

    counter.textContent =
      target.toLocaleString(
        'el-GR'
      );

    return;

  }


  const duration =
    1600;


  const startTime =
    performance.now();


  function updateCounter(
    currentTime
  ) {

    const elapsed =
      currentTime -
      startTime;


    const progress =
      Math.min(
        elapsed / duration,
        1
      );


    /*
     * Ease-out cubic.
     */

    const eased =
      1 -
      Math.pow(
        1 - progress,
        3
      );


    const currentValue =
      Math.floor(
        target * eased
      );


    counter.textContent =
      currentValue.toLocaleString(
        'el-GR'
      );


    if (
      progress < 1
    ) {

      requestAnimationFrame(
        updateCounter
      );

    } else {

      counter.textContent =
        target.toLocaleString(
          'el-GR'
        );

    }

  }


  requestAnimationFrame(
    updateCounter
  );

}


if (counters.length) {

  if (
    prefersReducedMotion ||
    !(
      'IntersectionObserver' in
      window
    )
  ) {

    counters.forEach(
      animateCounter
    );

  } else {

    const counterObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach(
            (entry) => {

              if (
                !entry.isIntersecting
              ) {
                return;
              }


              animateCounter(
                entry.target
              );


              observer.unobserve(
                entry.target
              );

            }
          );

        },
        {
          threshold: 0.45
        }
      );


    counters.forEach(
      (counter) => {

        counterObserver.observe(
          counter
        );

      }
    );

  }

}


/* =========================================================
   IMAGE ERROR HANDLING
========================================================= */

document
  .querySelectorAll('img')
  .forEach(
    (image) => {

      image.addEventListener(
        'error',
        () => {

          image.classList.add(
            'image-error'
          );

        },
        {
          once: true
        }
      );

    }
  );


/* =========================================================
   ANCHOR LINKS
========================================================= */

document
  .querySelectorAll(
    'a[href^="#"]'
  )
  .forEach(
    (link) => {

      link.addEventListener(
        'click',
        (event) => {

          const href =
            link.getAttribute(
              'href'
            );


          if (
            !href ||
            href === '#'
          ) {
            return;
          }


          const target =
            document.querySelector(
              href
            );


          if (!target) {
            return;
          }


          /*
           * Close mobile menu.
           *
           * Actual scrolling is handled
           * by CSS scroll-behavior.
           */

          setMenuState(false);

        }
      );

    }
  );


/* =========================================================
   INITIAL STATE
========================================================= */

document.documentElement.classList.add(
  'js-ready'
);
