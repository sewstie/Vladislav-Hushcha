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

  headerBtn.addEventListener('click', function() {
    this.classList.toggle('active');

    if (this.classList.contains('active')) {
      this.textContent = 'Close';
      gsap.set(headerMenuMobile, { display: 'block' });
      gsap.fromTo(headerMenuMobile, {
        y: '-15%',
        opacity: 0
      }, {
        y: '0%',
        opacity: 1,
        duration: 0.2,
        ease: 'power1.out'
      });
    } else {
      this.textContent = 'Menu';
      gsap.to(headerMenuMobile, {
        y: '-15%',
        opacity: 0,
        duration: 0.2,
        ease: 'power1.in',
        onComplete: function() {
          gsap.set(headerMenuMobile, { display: 'none' });
        }
      });
    }
  });

  menuItems.forEach((item) => {
    item.addEventListener('click', () => {
      setTimeout(() => {
        gsap.to(headerMenuMobile, {
          y: '-15%',
          opacity: 0,
          duration: 0.2,
          ease: 'power1.in',
          onComplete: function() {
            gsap.set(headerMenuMobile, { display: 'none' });
            headerBtn.classList.remove('active');
            headerBtn.textContent = 'Menu';
          }
        });
      }, 600);
    });
  });
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

/* About */

if (isDesktop) {
  const aboutSection = document.querySelector('#about');

  document.querySelectorAll('#about .wrap-row h5').forEach((item) => {
    item.addEventListener('mouseenter', function() {
      const description = this.nextElementSibling;
      aboutSection.classList.add('child-hover');

      gsap.killTweensOf(description);
      gsap.set(description, { display: 'block' });
      gsap.fromTo(description, { opacity: 0, y: 50 }, {
        opacity: 1,
        y: 0,
        duration: 0.5
      });
    });

    item.addEventListener('mouseleave', function() {
      const description = this.nextElementSibling;
      aboutSection.classList.remove('child-hover');

      gsap.killTweensOf(description);
      gsap.to(description, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        onComplete: () => gsap.set(description, { display: 'none' })
      });
    });
  });
}

/* Projects */

{
  const cards = document.querySelectorAll('.card');

  cards.forEach((card) => {
    if (isDesktop) {
      const content = card.querySelector('.card-content');
      const overlay = card.querySelector('.overlay');

      card.addEventListener('mouseenter', function() {
      gsap.to(card, { '--pseudo-opacity': 1, scale: 1.05, duration: 0.15 });
      gsap.to(overlay, { opacity: 0.6, duration: 0.65 });
      gsap.fromTo(content, { y: '100%' }, { y: '0%', opacity: 1, duration: 0.65 });
      });

      card.addEventListener('mouseleave', function() {
        gsap.to(card, { '--pseudo-opacity': 0, scale: 1, duration: 0.15 });
        gsap.to(overlay, { opacity: 0, duration: 0.65 });
        gsap.fromTo(content, { y: '0%' }, { y: '100%', opacity: 0, duration: 0.65 });
      });
    }
  });
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
