/* hero 3d-object */
import { Application } from 'https://cdn.skypack.dev/@splinetool/runtime';
const canvas = document.getElementById('canvas3d');
const app = new Application(canvas);
app.load('https://prod.spline.design/X3kfNrOVNM36aMR0/scene.splinecode');

/* Loading screen */

gsap.registerPlugin(TextPlugin);

window.addEventListener('load', () => {
  const loader = document.querySelector('.loader');
  const percentage = document.querySelector('.loader-percentage');

  let width = 0;
  const interval = setInterval(() => {
      if (width >= 100) {
          clearInterval(interval);
          gsap.to(loader, {
            opacity: 0,
            scale: 0.8,
            duration: 0.6,
            onComplete: () => loader.style.display = 'none'
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
ScrollTrigger.defaults({
  scroller: '[data-scroll-container]',
  markers: false
});
const locomotiveScroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true,
  multiplier: 1.0,
  getDirection: true,
});
locomotiveScroll.on('scroll', (instance) => {
  ScrollTrigger.update();
  document.documentElement.setAttribute('data-scrolling', instance.direction);
});
ScrollTrigger.scrollerProxy('[data-scroll-container]', {
  scrollTop(value) {
    return arguments.length ? locomotiveScroll.scrollTo(value, 0, 0) : locomotiveScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
  },
  pinType: document.querySelector('[data-scroll-container]').style.transform ? "transform" : "fixed"
});

const anchorLinks = document.querySelectorAll('.header-menu a');

anchorLinks.forEach((anchorLink) => {
  let hashval = anchorLink.getAttribute('href');
  if (hashval === '#') return; 

  let target = document.querySelector(hashval);

  anchorLink.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      locomotiveScroll.scrollTo(target, { offset: -150 })
  });
});

/* Blob */
const blob = document.getElementById('blob');
document.body.onpointermove = (event) => {
  const { clientX, clientY } = event;
  blob.animate({
    left: `${clientX}px`,
    top: `${clientY}px`
  }, { duration: 3000, fill: 'forwards' });
}

ScrollTrigger.create({
  trigger: '.about',
  start: 'top top+=180',
  onEnter: () => {
    gsap.fromTo(blob, { display: 'block', x: '-100%', opacity: 0 }, { x: '0', opacity: 0.66, duration: 2 });
  },
  onLeaveBack: () => {
    gsap.fromTo(blob, { x: '-%', opacity: 0.66 }, { x: '100%', opacity: 0, duration: 1, display: 'none' });
  },
});

/* About */

document.querySelectorAll('#about .wrap-row h5').forEach((item) => {
  item.addEventListener('mouseover', function() {
    document.querySelector('#about').classList.add('child-hover');
    gsap.fromTo(this.nextElementSibling, { opacity: 0, y: 50 }, { display: "block", opacity: 1, y: 0, duration: 0.5 });
  });

  item.addEventListener('mouseout', function() {
    document.querySelector('#about').classList.remove('child-hover');
    gsap.to(this.nextElementSibling, { display: "none", opacity: 0, y: 50, duration: 0.5 });
  });
});

/* About GSAP */
document.querySelectorAll('.about h3, .about-wrap .word, .wrap-row h5').forEach((elem) => {
  gsap.from(elem, {
    scrollTrigger: {
      trigger: elem,
      start: 'top bottom',
      end: 'bottom bottom',
      scrub: true,
    },
    y: 100,
    opacity: 0,
    duration: 1,
    ease: 'circ',
  });
});

