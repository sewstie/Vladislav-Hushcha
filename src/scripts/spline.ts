// The robot poster is in the HTML. On bigger screens, once the hero is visible and the
// browser is idle, the self-hosted runtime loads the scene and the canvas fades in over it.
const wrap = document.querySelector<HTMLElement>('.canvas');

if (wrap && matchMedia('(min-width: 601px) and (prefers-reduced-motion: no-preference)').matches) {
  const io = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    io.disconnect();
    (window.requestIdleCallback ?? setTimeout)(load);
  });
  io.observe(wrap);
}

async function load() {
  // Variable path so Vite leaves this public file alone instead of bundling it.
  const runtime = '/spline/runtime/runtime.js';
  const { Application } = await import(/* @vite-ignore */ runtime);
  const app = new Application(wrap!.querySelector('canvas'), { wasmPath: '/spline/runtime' });
  await app.load('/spline/scene.splinecode');
  wrap!.classList.add('is-ready');
}
