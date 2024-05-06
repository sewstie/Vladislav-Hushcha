// For more check out greensock.com
import { gsap } from "https://cdn.skypack.dev/gsap";
import { ScrollTrigger } from "https://cdn.skypack.dev/gsap/ScrollTrigger";
import LocomotiveScroll from "https://cdn.skypack.dev/locomotive-scroll@4.1.3";
gsap.registerPlugin(ScrollTrigger, Draggable);


const locoScroll = new LocomotiveScroll({
  el: document.querySelector('.container'),
  smooth: true,
  multiplier: 0.7,
});

// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)

locoScroll.on('scroll', ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy('.container', {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector('.container').style.transform
    ? 'transform'
    : 'fixed',
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
ScrollTrigger.addEventListener('refresh', () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

const sections = gsap.utils.toArray(".section");
let maxWidth = 0;

const getMaxWidth = () => {
  maxWidth = 0;
  sections.forEach((section) => {
  maxWidth += section.offsetWidth;
  });
};
getMaxWidth();
ScrollTrigger.addEventListener("refreshInit", getMaxWidth);

let scrollTween = gsap.to(sections, {
  x: () => `-${maxWidth - window.innerWidth}`,
  ease: "none",
});

let horizontalScroll = ScrollTrigger.create({
  animation: scrollTween,
  trigger: ".wrapper",
  pin: true,
  scrub: true,
  end: () => `+=${maxWidth - window.innerWidth}`,
  markers: true,
  invalidateOnRefresh: true
});

// dragRatio changed to the part in the horizontal sroll that's there to calculate the offset between the duration of the scroll and the amount of x-translation of the content (that needs to be included there when triggering things when certain sections reach a certain point in the viewport - as seen in commented out part above)

var dragRatio = (maxWidth / (maxWidth - window.innerWidth))

var drag = Draggable.create(".drag-proxy", {
  trigger: '.wrapper',
  type: "x",
  inertia: true,
  allowContextMenu: true,
  onPress() {
    this.startScroll = horizontalScroll.scroll();
  },
  onDrag() {
    horizontalScroll.scroll(this.startScroll - (this.x - this.startX) * dragRatio);
  },
  onThrowUpdate() {
    horizontalScroll.scroll(this.startScroll - (this.x - this.startX) * dragRatio);
  }
})[0];