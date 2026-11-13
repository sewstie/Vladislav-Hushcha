// Types out hero text that is already in the HTML. Hidden chars keep their space (CLS 0);
// the caret is an absolutely positioned ::after on the last shown char, so nothing moves.
const el = document.querySelector<HTMLElement>('.typewriter');

if (el && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const srText = document.createElement('span');
  srText.className = 'sr-only';
  srText.textContent = el.textContent;

  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode as Text);

  const chars: HTMLSpanElement[] = [];
  for (const node of textNodes) {
    const frag = document.createDocumentFragment();
    for (const c of node.data) {
      const span = document.createElement('span');
      span.className = 'tw';
      span.setAttribute('aria-hidden', 'true');
      span.textContent = c;
      frag.append(span);
      chars.push(span);
    }
    node.replaceWith(frag);
  }
  el.append(srText);
  el.classList.add('is-typing');

  let i = 0;
  const tick = () => {
    chars[i - 1]?.classList.remove('caret');
    if (i === chars.length) return;
    chars[i].classList.add('on', 'caret');
    i++;
    if (i === chars.length) setTimeout(() => chars[i - 1].classList.remove('caret'), 750);
    else setTimeout(tick, 2600 / chars.length);
  };
  tick();
}
