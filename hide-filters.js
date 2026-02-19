<script>
(function () {
  // Alleen uitvoeren op productpagina’s (pas dit aan aan jullie URL-structuur)
  var isProductPage =
    /\/(product|shop)\/?/i.test(location.pathname) ||
    document.querySelector('button, a')?.textContent?.match(/Place in basket|In winkelmand|Toevoegen/i);

  if (!isProductPage) return;

  // Kandidaten voor de filter/zijbalk (pas aan zodra je 1 correcte selector weet)
  var filterSelectors = [
    '.filters',
    '#filters',
    '[data-testid="filters"]',
    '.sidebar',
    '.left-column',
    '.search-panel'
  ];

  // CSS injecteren (verbergt + geeft ruimte terug aan content)
  function injectCSS() {
    if (document.getElementById('hide-catalog-filters-css')) return;

    var style = document.createElement('style');
    style.id = 'hide-catalog-filters-css';
    style.textContent = `
      ${filterSelectors.join(', ')} { display:none !important; }
      /* Optioneel: main content full width (pas aan naar echte container) */
      .content, .main, .product-detail, .right-column { width:100% !important; max-width:100% !important; }
    `;
    document.head.appendChild(style);
  }

  // Probeer direct + blijf kijken als de pagina dynamisch rendert
  injectCSS();

  var obs = new MutationObserver(function () {
    injectCSS();
  });

  obs.observe(document.documentElement, { childList: true, subtree: true });
})();
</script>
