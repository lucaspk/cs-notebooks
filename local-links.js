'use strict';

/**
 * GitHub Pages (https): não faz nada — os links relativos do HTML bastam.
 * file:// e preview do editor: navega com URL resolvida a partir desta página.
 */
(function () {
  if (location.protocol === 'http:' || location.protocol === 'https:') return;

  for (const anchor of document.querySelectorAll('a.chapter-link[href]')) {
    anchor.setAttribute('target', '_blank');
    anchor.setAttribute('rel', 'noopener');
  }

  function targetUrl(raw) {
    if (!raw || raw.startsWith('#') || /^[a-z][a-z0-9+.-]*:/i.test(raw)) return null;
    if (raw.endsWith('.md')) return null;
    try {
      return new URL(raw, location.href).href;
    } catch {
      return null;
    }
  }

  document.addEventListener(
    'click',
    (event) => {
      const anchor = event.target.closest('a[href]');
      if (!anchor || event.defaultPrevented) return;
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const url = targetUrl(anchor.getAttribute('href'));
      if (!url) return;

      event.preventDefault();
      location.assign(url);
    },
    true
  );
})();