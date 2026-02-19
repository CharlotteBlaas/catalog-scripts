(function () {
  // Anti-flicker: verberg pagina kort totdat we klaar zijn
  var AF_ID = 'ti-antiflicker';
  var afStyle = document.getElementById(AF_ID);
  if (!afStyle) {
    afStyle = document.createElement('style');
    afStyle.id = AF_ID;
    afStyle.textContent = 'html{visibility:hidden !important}';
    document.documentElement.appendChild(afStyle);
  }

  function reveal() {
    var s = document.getElementById(AF_ID);
    if (s) s.remove();
  }

  // Fail-safe: altijd zichtbaar na 800ms
  var afTimeout = setTimeout(reveal, 800);

  // Alleen uitvoeren op productpagina's
  if (!/\/Catalog\/Product\//i.test(location.pathname)) {
    clearTimeout(afTimeout);
    reveal();
    return;
  }

  function hideByFiltersHeading() {
    var nodes = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,div,span,strong'));
    var title = nodes.find(n => (n.textContent || '').trim().toLowerCase() === 'filters');
    if (!title) return false;

    var container =
      title.closest('.panel') ||
      title.closest('.card') ||
      title.closest('[class*="col-"]') ||
      title.closest('section') ||
      title.closest('aside') ||
      title.closest('div');

    if (!container) return false;

    container.style.setProperty('display', 'none', 'important');

    // Klaar → pagina tonen
    clearTimeout(afTimeout);
    reveal();
    return true;
  }

  // Probeer ASAP (ook vóór DOMContentLoaded)
  (function loop() {
    if (hideByFiltersHeading()) return;
    requestAnimationFrame(loop);
  })();

  // En voor async rendering
  var obs = new MutationObserver(hideByFiltersHeading);
  obs.observe(document.documentElement, { childList: true, subtree: true });
})();
