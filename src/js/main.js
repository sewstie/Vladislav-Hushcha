import { Application } from 'https://cdn.skypack.dev/@splinetool/runtime';
const canvas = document.getElementById('canvas3d');
const app = new Application(canvas);
app.load('https://prod.spline.design/X3kfNrOVNM36aMR0/scene.splinecode');

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
  scroller: '[data-scroll-container]',
  markers: false
});

const locomotiveScroll = new LocomotiveScroll({
  el: document.querySelector( '[data-scroll-container]' ),
  smooth: true,
  multiplier: 1.0,
  getDirection: true,
});

locomotiveScroll.on( 'scroll', ( instance ) => {
  ScrollTrigger.update();
  document.documentElement.setAttribute( 'data-scrolling', instance.direction );
});

ScrollTrigger.scrollerProxy( '[data-scroll-container]', {
  scrollTop( value ) {
      return arguments.length ? locomotiveScroll.scrollTo( value, 0, 0 ) : locomotiveScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
  },
  pinType: document.querySelector( '[data-scroll-container]' ).style.transform ? "transform" : "fixed"
} );

const anchorLinks = document.querySelectorAll('.header-menu a');

anchorLinks.forEach((anchorLink) => {
  let hashval = anchorLink.getAttribute('href');
  if (hashval === '#') return; 

  let target = document.querySelector(hashval);

  anchorLink.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      locomotiveScroll.scrollTo(target, { offset: -200 })
  });
});

function animateOnScrolltext(selector) {
  gsap.utils.toArray(selector).forEach((item, i) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: 'top bottom-=100',
        toggleActions: 'play none none none',
      },
      y: 50,
      autoAlpha: 0,
      ease: 'power1.out',
      duration: 0.5,
    });
  });
}

animateOnScrolltext('.skills__item');
animateOnScrolltext('.about h4');

function animateOnScrolltitle(selector, x = 0, y = 50) {
  gsap.utils.toArray(selector).forEach((item, i) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: 'top bottom-=100',
        toggleActions: 'play none none none',
      },
      x: x,
      y: y,
      autoAlpha: 0,
      ease: 'power1.out',
      duration: 0.7,
    });
  });
}

animateOnScrolltitle('.about h3', 30+'vw', 0);

gsap.registerPlugin(TextPlugin);

gsap.to('.typewriter', {
  text : "Hi, I'm <span class='word'>Vlad</span>, a Creative Web Developer.",
  duration: 3, 
  ease :  'power1.in',
  onComplete: function() {
    setTimeout(function() {
      document.querySelector('.cursor').style.display = 'none';
    }, 500);
  }
})

const blob = document.getElementById('blob');

document.body.onpointermove = (event) => {
  const {clientX, clientY} = event;

  blob.animate({
    left: `${clientX}px`,
    top: `${clientY}px`
}, { duration: 3000, fill: 'forwards'});
}

ScrollTrigger.create({
  trigger: '.about',
  start: 'top top+=150',
  onEnter: () => {
    gsap.fromTo(blob, {display: 'block', x: '-100%', opacity: 0 }, { x: '0', opacity: 0.66, duration: 2 });
  },
  onLeaveBack: () => {
    gsap.fromTo(blob, { x: '-%', opacity: 0.66 }, { x: '100%', opacity: 0, duration: 1, display: 'none'});
  },
});