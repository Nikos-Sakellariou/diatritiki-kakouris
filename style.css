:root {
  --blue: #0757a8;
  --navy: #082846;
  --ink: #111820;
  --muted: #69737d;
  --line: #dfe4e8;
  --light: #f2f4f6;
  --white: #fff;
  --max: 1320px;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: Inter, Arial, sans-serif;
  color: var(--ink);
  background: #fff;
}

a {
  text-decoration: none;
  color: inherit;
}

.container {
  width: min(calc(100% - 96px), var(--max));
  margin: auto;
}

/* =========================
   HEADER
========================= */

.site-header {
  position: absolute;
  z-index: 20;
  top: 0;
  left: 0;
  right: 0;
  color: #fff;
  padding: 20px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  transition: 0.35s;
}

.site-header.scrolled {
  position: fixed;
  background: rgba(7, 23, 38, 0.94);
  backdrop-filter: blur(12px);
  padding: 12px 0;
}

.nav-wrap {
  display: flex;
  align-items: center;
  gap: 34px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-right: auto;
}

.logo-mark {
  width: 30px;
  height: 30px;
  border: 2px solid currentColor;
  display: grid;
  place-items: center;
  font-size: 17px;
}

.logo strong {
  display: block;
  font-size: 17px;
  letter-spacing: 0.7px;
}

.logo img {
  max-width: 100%;
  height: auto;
  width: 100px;
  display: block;
}

.logo small {
  display: block;
  font-size: 8px;
  letter-spacing: 1.6px;
  margin-top: 2px;
  opacity: 0.75;
}

.main-nav {
  display: flex;
  gap: 27px;
  font-size: 11px;
  font-weight: 600;
}

.main-nav a {
  opacity: 0.86;
  position: relative;
  padding: 10px 0;
  white-space:nowrap;
}

.main-nav a:after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: 2px;
  background: #fff;
  transition: 0.3s;
}

.main-nav a:hover:after,
.main-nav a.active:after {
  width: 100%;
}

.nav-cta,
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0 22px;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.3px;
}

.nav-cta,
.btn-primary {
  background: var(--blue);
  color: #fff;
}

.nav-cta:hover,
.btn-primary:hover {
  background: #06498f;
}

.btn-outline {
  border: 1px solid rgba(255, 255, 255, 0.75);
  color: #fff;
}

.btn-outline:hover {
  background: #fff;
  color: #101820;
}

.btn-outline-dark {
  border: 1px solid #7c8790;
  color: #17212a;
}

.btn-outline-dark:hover {
  background: #111820;
  color: #fff;
}

.menu-toggle {
  display: none;
  background: none;
  border: 0;
  color: #fff;
}

.menu-toggle span {
  display: block;
  width: 24px;
  height: 2px;
  background: #fff;
  margin: 5px;
}

/* =========================
   HERO
========================= */

.hero {
  height: 100vh;
  min-height: 650px;
  position: relative;
  overflow: hidden;
  color: #fff;
  display: flex;
  align-items: center;
}

.hero-video,
.hero-overlay {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-video {
  filter: saturate(0.7);
}

.hero-overlay {
  background: linear-gradient(
    90deg,
    rgba(5, 16, 28, 0.82) 0%,
    rgba(5, 16, 28, 0.48) 48%,
    rgba(5, 16, 28, 0.18) 100%
  );
}

.hero-content {
  position: relative;
  z-index: 2;
  padding-top: 65px;
}

.eyebrow {
  font-size: 10px;
  letter-spacing: 2px;
  font-weight: 800;
  margin: 0 0 14px;
}

.eyebrow.blue {
  color: var(--blue);
}

h1,
h2,
h3,
p {
  margin-top: 0;
}

.hero h1 {
  font-size: clamp(42px, 5.4vw, 78px);
  line-height: 0.98;
  letter-spacing: -2.5px;
  margin: 0 0 24px;
  font-weight: 800;
}

.hero-subtitle {
  font-size: 18px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.84);
  margin-bottom: 30px;
}

.hero-actions {
  display: flex;
  gap: 12px;
}

.scroll-cue {
  position: absolute;
  z-index: 3;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 9px;
  font-size: 9px;
  letter-spacing: 1px;
}

.mouse {
  width: 20px;
  height: 32px;
  border: 2px solid #fff;
  border-radius: 12px;
  position: relative;
}

.mouse:after {
  content: "";
  position: absolute;
  width: 3px;
  height: 7px;
  background: #fff;
  left: 7px;
  top: 5px;
  border-radius: 3px;
  animation: scroll 1.5s infinite;
}

.hero-index {
  position: absolute;
  right: 30px;
  top: 42%;
  z-index: 3;
  display: flex;
  flex-direction: column;
  gap: 22px;
  font-size: 10px;
}

.hero-index span {
  opacity: 0.45;
}

.hero-index span:first-child {
  opacity: 1;
}

/* =========================
   SECTIONS
========================= */

.section {
  padding: 95px 0;
}

.section-heading {
  margin-bottom: 34px;
}

.section-heading h2,
.equipment-intro h2 {
  font-size: clamp(28px, 3vw, 42px);
  font-weight: 400;
  letter-spacing: -1.2px;
  margin-bottom: 12px;
}

.heading-line {
  display: block;
  width: 36px;
  height: 3px;
  background: var(--blue);
}

/* =========================
   SERVICES
========================= */

.service-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.service-card {
  border: 1px solid var(--line);
  padding: 34px 30px;
  min-height: 280px;
  display: flex;
  flex-direction: column;

  /* Animation initial state */
  opacity: 0;
  transform: translateY(35px) scale(0.97);

  transition:
    opacity 0.7s ease,
    transform 0.8s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.45s ease,
    border-color 0.45s ease;
}

.service-card.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Stagger */
.service-card:nth-child(1) {
  transition-delay: 0s;
}

.service-card:nth-child(2) {
  transition-delay: 0.1s;
}

.service-card:nth-child(3) {
  transition-delay: 0.2s;
}

.service-card:nth-child(4) {
  transition-delay: 0.3s;
}

.service-card:nth-child(5) {
  transition-delay: 0.4s;
}

.service-card:hover {
  transform: translateY(-7px) scale(1);
  box-shadow: 0 18px 45px rgba(10, 35, 55, 0.08);
  border-color: #b9c4cd;
}

.service-icon {
  font-size: 34px;
  color: var(--blue);
  margin-bottom: 34px;
}

.service-card h3 {
  font-size: 12px;
  margin-bottom: 12px;
}

.service-card p {
  font-size: 12px;
  line-height: 1.7;
  color: var(--muted);
}

.service-card a {
  font-size: 22px;
  color: var(--blue);
  margin-top: auto;
}

/* =========================
   EQUIPMENT
========================= */

.equipment {
  background: var(--light);
}

.equipment-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 60px;
  align-items: start;
}

.equipment-intro p:not(.eyebrow) {
  font-size: 13px;
  line-height: 1.7;
  color: var(--muted);
  margin: 22px 0 28px;
}

.equipment-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.machine {
  background: #fff;
  overflow: hidden;
}

.machine img {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  cursor: zoom-in;

  /* Image reveal */
  opacity: 0;
  transform: scale(1.06);

  transition:
    opacity 0.9s ease,
    transform 1.1s cubic-bezier(0.22, 1, 0.36, 1);
}

.machine.visible img {
  opacity: 1;
  transform: scale(1);
}

.machine div {
  padding: 16px;
}

.machine h3 {
  font-size: 12px;
  margin: 0 0 7px;
}

.machine p {
  font-size: 10px;
  color: var(--muted);
  margin: 0;
  line-height: 1.5;
}

/* =========================
   LIGHTBOX
========================= */

.lightbox {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;

  opacity: 0;
  visibility: hidden;

  transition:
    opacity 0.25s ease,
    visibility 0.25s ease;
}

.lightbox.open {
  opacity: 1;
  visibility: visible;
}

.lightbox img {
  max-width: 95vw;
  max-height: 92vh;
  width: auto;
  height: auto;
  object-fit: contain;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.lightbox-close {
  position: absolute;
  top: 20px;
  right: 25px;
  width: 45px;
  height: 45px;
  border: 0;
  background: transparent;
  color: #fff;
  font-size: 42px;
  line-height: 1;
  cursor: pointer;
  z-index: 2;
}

.lightbox-close:hover {
  opacity: 0.7;
}

/* =========================
   STATS
========================= */

.stats {
  background: var(--navy);
  color: #fff;
  position: relative;
  overflow: hidden;
}

.stats:before {
  content: "";
  position: absolute;
  inset: 0;
  background: url("assets/images/Manitou-MT1232S-03.jpg") center / cover;
  opacity: 0.08;
}

.stats-grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 40px 0;
}

.stat {
  border-right: 1px solid rgba(255, 255, 255, 0.18);
  padding-left: 38px;
}

.stat:first-child {
  padding-left: 0;
}

.stat:last-child {
  border: 0;
}

.stat strong {
  display: block;
  font-size: 38px;
  font-weight: 500;
  margin-bottom: 6px;
}

.stat > span {
  font-size: 9px;
  letter-spacing: 1px;
  opacity: 0.8;
}



/* =========================
   PROJECTS
========================= */

.projects {
  padding-bottom: 70px;
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.project {
  position: relative;
  overflow: hidden;
  background: #111;
  aspect-ratio: 0.75;
}

.project img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;

  opacity: 0;
  transform: scale(1.06);

  transition:
    opacity 1s ease,
    transform 1.2s cubic-bezier(0.22, 1, 0.36, 1);
}

.project.visible img {
  opacity: 1;
  transform: scale(1);
}

.project:hover img {
  transform: scale(1.06);
}

.project:after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.7),
    transparent 55%
  );
  pointer-events: none;
}

.project-info {
  position: absolute;
  z-index: 2;
  left: 22px;
  bottom: 18px;
  color: #fff;
}

.project-info h3 {
  font-size: 11px;
  margin-bottom: 5px;
}

.project-info span {
  font-size: 10px;
  opacity: 0.75;
}

.center {
  text-align: center;
  margin-top: 32px;
}

/* =========================
   CTA
========================= */

.cta {
  position: relative;
  overflow: hidden;
  color: #fff;
  background: var(--navy);
}

.cta-bg {
  position: absolute;
  inset: 0;
  background: url("assets/images/Project-North-Evoia.jpg") center / cover;
  opacity: 0.17;
}

.cta-content {
  position: relative;
  min-height: 190px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
}

.cta-content p {
  font-size: 11px;
  letter-spacing: 1.5px;
  margin-bottom: 8px;
}

.cta-content h2 {
  font-size: clamp(22px, 3vw, 36px);
  font-weight: 400;
  margin: 0;
  letter-spacing: -1px;
}

/* =========================
   FOOTER
========================= */

.footer {
  background: #101820;
  color: #fff;
  padding: 60px 0 22px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1.2fr 1.2fr;
  gap: 50px;
}

.footer p,
.footer a {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.58);
  line-height: 1.7;
}

.footer-logo {
  margin-bottom: 22px;
}

.footer h4 {
  font-size: 10px;
  letter-spacing: 1px;
  margin: 0 0 18px;
}

.footer a {
  display: block;
  margin-bottom: 6px;
}

.footer-bottom {
  margin-top: 45px;
  padding-top: 18px;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  display: flex;
  justify-content: space-between;
  font-size: 9px;
  color: rgba(255, 255, 255, 0.4);
}

/* =========================
   GENERAL REVEAL
========================= */

.reveal {
  opacity: 0;
  transform: translateY(28px);

  transition:
    opacity 0.8s ease,
    transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* =========================
   KEYFRAMES
========================= */

@keyframes scroll {
  0%,
  100% {
    transform: translateY(0);
    opacity: 1;
  }

  50% {
    transform: translateY(8px);
    opacity: 0.2;
  }
}

/* =========================
   TABLET
========================= */

@media (max-width: 1050px) {
  .main-nav {
    gap: 15px;
  }

  .nav-wrap {
    gap: 18px;
  }

  .container {
    width: min(calc(100% - 48px), var(--max));
  }

  .service-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .equipment-layout {
    grid-template-columns: 1fr;
  }

  .equipment-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* =========================
   MOBILE
========================= */

@media (max-width: 850px) {
  .logo img {
    width: 70px;
  }

  .container {
    width: min(calc(100% - 34px), var(--max));
  }

  .site-header {
    padding: 16px 0;
  }

  .menu-toggle {
    display: block;
  }

  .main-nav {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #071725;
    padding: 15px 22px;
    flex-direction: column;
    gap: 0;
  }

  .main-nav.open {
    display: flex;
  }

  .main-nav a {
    padding: 14px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .nav-cta {
    display: none;
  }

  .hero {
    min-height: 720px;
  }

  .hero h1 {
    font-size: 42px;
    letter-spacing: -1.5px;
  }

  .hero-subtitle {
    font-size: 15px;
  }

  .hero-index {
    display: none;
  }

  .section {
    padding: 70px 0;
  }

  .service-grid,
  .equipment-grid,
  .project-grid {
    grid-template-columns: 1fr;
  }

  .machine img {
    aspect-ratio: 16 / 10;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 28px;
    padding: 36px 0;
  }

  .stat {
    padding-left: 20px !important;
    border-right: 1px solid rgba(255, 255, 255, 0.18);
  }

  .stat:nth-child(2) {
    border-right: 0;
  }

  .stat strong {
    font-size: 30px;
  }

  .cta-content {
    min-height: 300px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }

  .footer-grid {
    grid-template-columns: 1fr;
    gap: 35px;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 10px;
  }

  .scroll-cue {
    display: none;
  }
}

/* =========================
   REDUCED MOTION
========================= */

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  .reveal,
  .service-card,
  .machine img,
  .project img {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .mouse:after {
    animation: none;
  }
}

