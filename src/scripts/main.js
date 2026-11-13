/* hero 3d-object */

import { Application } from 'https://cdn.jsdelivr.net/npm/@splinetool/runtime@1.12.98/build/runtime.js';

const viewportWidth = window.innerWidth;
const isDesktop = viewportWidth > 1024;
const isPhone = viewportWidth <= 600;

if (!isPhone) {
    const canvas = document.getElementById('canvas3d');
    const app = new Application(canvas);
    const loadSplineScene = () => app.load('https://prod.spline.design/eL7BJfHITeWpXVau/scene.splinecode');

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(loadSplineScene);
    } else {
      setTimeout(loadSplineScene, 0);
    }
}

/* menu-mobile */

if (window.innerWidth <= 1024) {
  const headerBtn = document.querySelector('.header-btn');
  const headerMenuMobile = document.querySelector('.header-menu-mobile');
  const menuItems = document.querySelectorAll('.header-wrap li');

  const setMenu = (open) => {
    headerBtn.classList.toggle('active', open);
    headerMenuMobile.classList.toggle('is-open', open);
    headerBtn.textContent = open ? 'Close' : 'Menu';
  };

  headerBtn.addEventListener('click', () => setMenu(!headerBtn.classList.contains('active')));
  menuItems.forEach((item) => item.addEventListener('click', () => setMenu(false)));
}

/* Blob */

const blob = document.getElementById('blob');
if (!isPhone) {
  let pointerX = 0;
  let pointerY = 0;
  let isTicking = false;

  const updateBlobPosition = () => {
    blob.style.left = `${pointerX}px`;
    blob.style.top = `${pointerY}px`;
    isTicking = false;
  };

  document.body.addEventListener('pointermove', (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;

    if (!isTicking) {
      isTicking = true;
      requestAnimationFrame(updateBlobPosition);
    }
  }, { passive: true });
}

if (!isPhone) {
  const aboutWrap = document.querySelector('.about-wrap');
  const offset = isDesktop ? 140 : 30;
  const toggleBlob = () => blob.classList.toggle('is-on', aboutWrap.getBoundingClientRect().top <= offset);
  window.addEventListener('scroll', toggleBlob, { passive: true });
  toggleBlob();
}

/* Contact */

function wrapLettersInSpans() {
  const elements = document.querySelectorAll('.fancy');

  elements.forEach(element => {
    let text = element.textContent;
    let html = '';

    for (let i = 0; i < text.length; i++) {
      html += `<span class="letter">${text[i]}</span>`;
    }

    element.innerHTML = html;
  });
}

wrapLettersInSpans();
