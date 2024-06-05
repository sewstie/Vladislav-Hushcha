/* hero 3d-object */

import { Application } from 'https://cdn.skypack.dev/@splinetool/runtime';

if (window.innerWidth >= 600) {
    const canvas = document.getElementById('canvas3d');
    const app = new Application(canvas);
    app.load('https://prod.spline.design/eL7BJfHITeWpXVau/scene.splinecode');
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
  multiplier: 1.0,
  getDirection: true,
  smartphone: {
      smooth: true,
  },
  tablet: {
      smooth: true,
  },
});
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
      locomotiveScroll.scrollTo(target, { offset: -50 })
  });
});

locomotiveScroll.update();

if (window.innerWidth <= 1024){
  const headerBtn = document.querySelector('.header-btn');
  const headerMenu = document.querySelector('.header-menu-mobile');
  
  headerBtn.addEventListener('click', () => {
    if (headerMenu.style.display === 'none' || headerMenu.style.display === '') {
        headerMenu.style.display = 'block';
        headerBtn.textContent = 'close';
        headerBtn.classList.add('active');
        gsap.fromTo(headerMenu, {opacity: 0, y: -20}, {opacity: 1, y: 0, duration: 0.33});
    } else {
            headerBtn.textContent = 'Menu';
            headerBtn.classList.remove('active');
        gsap.fromTo(headerMenu, {opacity: 1, y: 0}, {opacity: 0, y: -20, duration: 0.33, onComplete: () => {
            headerMenu.style.display = 'none';
        }});
    }
  });
}

/* Blob */

if (window.matchMedia("(hover: hover)").matches){
  
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
  start: 'top top+=140',
  onEnter: () => {
    gsap.fromTo(blob, { display: 'block', x: '-100%', opacity: 0 }, { x: '0', opacity: 0.66, duration: 2 });
  },
  onLeaveBack: () => {
    gsap.fromTo(blob, { x: '-%', opacity: 0.66 }, { x: '100%', opacity: 0, duration: 1, display: 'none' });
  },
});

}

/* About */

if (window.matchMedia("(hover: hover)").matches){
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
    y: 100,
    opacity: 0,
    duration: 1,
    ease: 'circ',
  });
});

/* Projects */

document.addEventListener('DOMContentLoaded', function() {
  var projectTitle = document.querySelector('.projects h3');
  var cards = document.querySelectorAll('.card');

  gsap.from(projectTitle, {
    scrollTrigger: {
      trigger: projectTitle,
      start: 'top bottom',
      end: 'bottom bottom',
      scrub: true,
    },
    y: 100,
    opacity: 0,
    duration: 1,
    ease: 'circ',
  });

  cards.forEach(function(card) {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top-=250 bottom+=100',
        end: 'bottom bottom+=150',
        scrub: true,
      },
      y: 100,
      opacity: 0,
      duration: 1,
      ease: 'circ',
    });

    if (window.matchMedia("(hover: hover)").matches){
    var content = card.querySelector('.card-content');
    var overlay = card.querySelector('.overlay');

    card.addEventListener('mouseenter', function() {
      gsap.to(card, { '--pseudo-opacity': 1, scale: 1.05, duration: 0.15});
      gsap.to(overlay, { opacity: 0.6, duration: 0.65 });
      gsap.fromTo(content, { y: '100%' }, { y: '0%', opacity: 1, duration: 0.65 });
    });

    card.addEventListener('mouseleave', function() {
      gsap.to(card, { '--pseudo-opacity': 0, scale: 1, duration: 0.15});
      gsap.to(overlay, { opacity: 0, duration: 0.65 });
      gsap.fromTo(content, { y: '0%' }, { y: '100%', opacity: 0, duration: 0.65 });
    });
    }
  });
});

/* Contact */

function wrapLettersInSpans() {
  const elements = document.querySelectorAll('#word');

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
