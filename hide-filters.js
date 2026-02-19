(function () {
  // Alleen uitvoeren op productpagina's
  if (!/\/Catalog\/Product\//i.test(location.pathname)) return;

  function hideByFiltersHeading() {
    // Zoek exacte titel "Filters"
    var nodes = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,div,span,strong'));
    var title = nodes.find(n => (n.textContent || '').trim().toLowerCase() === 'filters');
    if (!title) return false;

    // Pak een logische container omhoog (pas volgorde evt aan)
    var container =
      title.closest('.panel') ||
      title.closest('.card') ||
      title.closest('[class*="col-"]') ||  // bootstrap kolom
      title.closest('section') ||
      title.closest('aside') ||
      title.closest('div');

    if (!container) return false;

    container.style.setProperty('display', 'none', 'important');
    return true;
  }

  // Probeer direct
  hideByFiltersHeading();

  // En blijf kijken (SPA/async rendering)
  var obs = new MutationObserver(function () {
    hideByFiltersHeading();
  });

  obs.observe(document.documentElement, { childList: true, subtree: true });
})();
