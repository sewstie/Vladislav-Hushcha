/* hero 3d-object */

import { Application } from 'https://cdn.skypack.dev/@splinetool/runtime';

const viewportWidth = window.innerWidth;
const isDesktop = viewportWidth > 1024;
const isTabletOrBelow = viewportWidth <= 1024;
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

/* Loading screen */

gsap.registerPlugin(TextPlugin);

window.addEventListener('load', () => {
  const loader = document.querySelector('.loader');
  const percentage = document.querySelector('.loader-percentage');

  locomotiveScroll.stop();

  let width = 0;
  const interval = setInterval(() => {
      if (width >= 100) {
          locomotiveScroll.update()
          clearInterval(interval);
          gsap.to(loader, {
            opacity: 0,
            scale: 0.8,
            duration: 0.6,
            onComplete: () => {
              loader.style.display = 'none';
              locomotiveScroll.start();
            }
          });
          gsap.to('.typewriter', {
              text: `Hi, I'm <span class='word'>Vlad</span>, a Creative Web Developer.`,
              duration: 2.6,
              ease: 'power1.in',
              onComplete: () => setTimeout(() => document.querySelector('.cursor').style.display = 'none', 750)
          });
      } else {
          width++;
          percentage.textContent = `${width}%`;
          percentage.style.color = `rgb(${150 + (255 - 150) * width / 100}, ${192 + (87 - 192) * width / 100}, ${179 + (51 - 179) * width / 100})`;
      }
  }, 20);
});

/* Locomotive scroll & GSAP scroll trigger */

gsap.registerPlugin(ScrollTrigger);

const scroller = document.querySelector('#scroller');

ScrollTrigger.defaults({
  scroller: scroller,
  markers: false
});
const locomotiveScroll = new LocomotiveScroll({
  el: scroller,    
  smooth: true,
  getDirection: true,
  multiplier: 0.7,
  smartphone: {
      smooth: true,
  },
  tablet: {
      smooth: true,
  },
});

const syncScrollSystems = () => {
  locomotiveScroll.update();
  ScrollTrigger.refresh();
};

locomotiveScroll.on('scroll', (instance) => {
  ScrollTrigger.update();
  document.documentElement.setAttribute('data-scrolling', instance.direction);
});
ScrollTrigger.scrollerProxy(scroller, {
  scrollTop(value) {
    return arguments.length ? locomotiveScroll.scrollTo(value, 0, 0) : locomotiveScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
  },
  pinType: scroller.style.transform ? "transform" : "fixed"
});

const anchorLinks = document.querySelectorAll('.header-menu a');

anchorLinks.forEach((anchorLink) => {
  let hashval = anchorLink.getAttribute('href');
  if (hashval === '#') return; 

  let target = document.querySelector(hashval);

  anchorLink.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      locomotiveScroll.scrollTo(target, { offset: -35 })
  });
});

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

let startValue;

if (isDesktop) {
  startValue = 'top top+=140';
} else if (!isPhone) {
  startValue = 'top top+=30';
}

if (!isPhone) {
  ScrollTrigger.create({
    trigger: '.about-wrap',
    start: startValue,
    onEnter: () => {
      gsap.fromTo(blob, { display: 'block', x: '-100%', opacity: 0 }, { x: '0', opacity: 0.66, duration: 2 });
    },
    onLeaveBack: () => {
      gsap.fromTo(blob, { x: '0', opacity: 0.66 }, { x: '100%', opacity: 0, duration: 1, display: 'none' });
    },
  });
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
        duration: 0.5,
        onComplete: syncScrollSystems
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
        onComplete: () => {
          gsap.set(description, { display: 'none' });
          syncScrollSystems();
        }
      });
    });
  });
}

/* About GSAP */

document.querySelectorAll('.about h3, .about-wrap .word, .wrap-row h5').forEach((elem) => {
  gsap.from(elem, {
    scrollTrigger: {
      trigger: elem,
      start: 'top-=75 bottom',
      end: 'bottom-=50 bottom',
      scrub: true,
    },
    y: 85,
    opacity: 0,
    duration: 1,
    ease: 'circ',
  });
});

if (isTabletOrBelow) {
  document.querySelectorAll('#about p').forEach((p) => {
    gsap.from(p, {
      scrollTrigger: {
        trigger: p,
        start: 'top-=75 bottom',
        end: 'bottom-=50 bottom',
        scrub: true,
      },
      y: 85,
      opacity: 0,
      duration: 1,
      ease: 'circ',
    });
  });
}

/* Projects */

{
  const projectTitle = document.querySelector('.projects h3');
  const cards = document.querySelectorAll('.card');

  gsap.from(projectTitle, {
    scrollTrigger: {
      trigger: projectTitle,
      start: 'top bottom+=75',
      end: 'bottom bottom',
      scrub: true,
    },
    y: 85,
    opacity: 0,
    duration: 1,
    ease: 'circ',
  });
  
  cards.forEach((card) => {
    const yValue = isTabletOrBelow ? 30 : 100;
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top-=300 bottom+=100',
        end: 'bottom bottom+=150',
        scrub: true,
      },
      y: yValue,
      opacity: 0,
      duration: 1,
      ease: 'circ',
    });

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

document.querySelectorAll('.contact h3, .line').forEach((elem) => {
  gsap.from(elem, {
    scrollTrigger: {
      trigger: elem,
      start: 'top bottom+=75',
      end: 'bottom bottom',
      scrub: true,
    },
    y: 100,
    opacity: 0,
    duration: 1,
    ease: 'circ',
  });
});

