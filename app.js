/* The Adjusting Entries — shared scripts */
(function () {
  // ---- current year in footer ----
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // ---- mobile menu ----
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.querySelector('.mobile-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      menu.classList.toggle('open');
    });
  }

  // ---- articles search + category filter ----
  var search = document.getElementById('search');
  var grid = document.getElementById('article-grid');
  if (grid) {
    var cards = Array.prototype.slice.call(grid.querySelectorAll('.card'));
    var chips = Array.prototype.slice.call(document.querySelectorAll('.chip'));
    var noResults = document.querySelector('.no-results');
    var activeCat = 'all';

    function apply() {
      var q = (search ? search.value : '').trim().toLowerCase();
      var shown = 0;
      cards.forEach(function (card) {
        var hay = (card.getAttribute('data-search') || card.textContent).toLowerCase();
        var cat = card.getAttribute('data-category') || '';
        var matchText = !q || hay.indexOf(q) !== -1;
        var matchCat = activeCat === 'all' || cat === activeCat;
        var show = matchText && matchCat;
        card.style.display = show ? '' : 'none';
        if (show) shown++;
      });
      if (noResults) noResults.style.display = shown ? 'none' : 'block';
    }

    if (search) search.addEventListener('input', apply);

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) { c.classList.remove('active'); });
        chip.classList.add('active');
        activeCat = chip.getAttribute('data-cat') || 'all';
        apply();
      });
    });

    // prefill from ?q= / ?cat= (header + home links) or #search focus
    var params = new URLSearchParams(window.location.search);
    var q0 = params.get('q');
    if (q0 && search) { search.value = q0; }
    var cat0 = params.get('cat');
    if (cat0) {
      var match = chips.filter(function (c) { return c.getAttribute('data-cat') === cat0; })[0];
      if (match) {
        chips.forEach(function (c) { c.classList.remove('active'); });
        match.classList.add('active');
        activeCat = cat0;
      }
    }

    <script data-goatcounter="https://theadjustingentries.goatcounter.com/count"
        async src="//gc.zgo.at/count.js"></script>
    if (window.location.hash === '#search' && search) { search.focus(); }
    apply();
  }
})();
