const viewportWidth = window.innerWidth;
const isDesktop = viewportWidth > 1024;
const isPhone = viewportWidth <= 600;

/* menu-mobile */

{
  const headerBtn = document.querySelector('.header-btn');
  const headerMenuMobile = document.querySelector('.header-menu-mobile');
  const isOpen = () => headerBtn.getAttribute('aria-expanded') === 'true';

  const setMenu = (open) => {
    headerBtn.setAttribute('aria-expanded', open);
    headerMenuMobile.classList.toggle('is-open', open);
    headerBtn.textContent = open ? 'Close' : 'Menu';
  };

  headerBtn.addEventListener('click', () => setMenu(!isOpen()));
  headerMenuMobile.addEventListener('click', (e) => e.target.closest('a') && setMenu(false));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen()) {
      setMenu(false);
      headerBtn.focus();
    }
  });
}

/* In-page links: scroll without putting #section in the URL */

document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="#"]');
  const target = link && document.querySelector(link.getAttribute('href'));
  if (!target) return;
  e.preventDefault();
  target.scrollIntoView(); // smooth via CSS scroll-behavior, instant under reduced motion
  target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true }); // keep keyboard focus moving like a real anchor jump
});

/* Blob */

const blob = document.getElementById('blob');
if (!isPhone && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
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
