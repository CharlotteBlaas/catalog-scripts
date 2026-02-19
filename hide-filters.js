(function () {
  // Alleen uitvoeren op productpagina’s
  var isProductPage =
    /\/(product|shop)\/?/i.test(location.pathname) ||
    document.querySelector('button, a')?.textContent?.match(/Place in basket|In winkelmand|Toevoegen/i);

  if (!isProductPage) return;

  var filterSelectors = [
    '.filters',
    '#filters',
    '[data-testid="filters"]',
    '.sidebar',
    '.left-column',
    '.search-panel'
  ];

  function injectCSS() {
    if (document.getElementById('hide-catalog-filters-css')) return;

    var style = document.createElement('style');
    style.id = 'hide-catalog-filters-css';
    style.textContent = `
      ${filterSelectors.join(', ')} { display:none !important; }
      .content, .main, .product-detail, .right-column {
        width:100% !important;
        max-width:100% !important;
      }
    `;
    document.head.appendChild(style);
  }

  injectCSS();

  var obs = new MutationObserver(function () {
    injectCSS();
  });

  obs.observe(document.documentElement, { childList: true, subtree: true });
})();
