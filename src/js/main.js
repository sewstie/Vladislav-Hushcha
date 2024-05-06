import { Application } from '/public/js/runtime.js';
const canvas = document.getElementById('canvas3d');
const app = new Application(canvas);
app.load('./src/3d-models/scene.splinecode');

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Draggable)

const scroller = document.querySelector('#scroller');

const locoScroll = new LocomotiveScroll({
  el: scroller,
  smooth: true
});

locoScroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy( scroller, {
  scrollTop( value ) {
      return arguments.length ? locoScroll.scrollTo( value, 0, 0 ) : locoScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
  },
  pinType: scroller.style.transform ? "transform" : "fixed"
} );

ScrollTrigger.defaults({
  scroller: scroller
})

ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

ScrollTrigger.refresh();

const anchorLinks = document.querySelectorAll('.header-menu a');

anchorLinks.forEach((anchorLink) => {
  let hashval = anchorLink.getAttribute('href');
  if (hashval === '#') return; 

  let target = document.querySelector(hashval);

  anchorLink.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      locoScroll.scrollTo(target, { offset: -200 })
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

  // Get the current scroll position from Locomotive Scroll
  const scrollY = locoScroll.scroll.instance.scroll.y;

  // Use gsap to animate the blob's position
  gsap.to(blob, {
    duration: 0.3,
    left: `${clientX}px`,
    top: `${clientY + scrollY}px`,
    ease: 'power1.out'
  });
}