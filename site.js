/* Access toolbar: text size, contrast, motion. Persisted per device.
   The size button label follows the page language (document lang), and apply.js calls DBSite.sync() after a switch. */
(function () {
  var root = document.documentElement;
  var SIZE_LABEL = {
    en: { '100': 'Larger text', '125': 'Text 125%', '150': 'Text 150%' },
    am: { '100': 'ትልቅ ጽሑፍ', '125': 'ጽሑፍ 125%', '150': 'ጽሑፍ 150%' }
  };
  function store(k, v) { try { v == null ? localStorage.removeItem(k) : localStorage.setItem(k, v); } catch (e) {} }
  function sync() {
    var lang = root.lang === 'am' ? 'am' : 'en';
    document.querySelectorAll('.tool[data-act]').forEach(function (b) {
      var a = b.dataset.act, on = false;
      if (a === 'size') {
        var s = root.dataset.size || '100';
        on = s !== '100';
        b.textContent = SIZE_LABEL[lang][s];
        b.removeAttribute('aria-label');   /* a fixed aria-label would not match the visible text (2.5.3) */
      }
      if (a === 'contrast') on = root.dataset.contrast === 'high';
      if (a === 'motion') on = root.dataset.motion === 'off';
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('.tool[data-act]');
    if (!b) return;
    var a = b.dataset.act;
    if (a === 'size') {
      var next = { '100': '125', '125': '150', '150': '100' }[root.dataset.size || '100'];
      if (next === '100') { delete root.dataset.size; store('db-size', null); } else { root.dataset.size = next; store('db-size', next); }
    }
    if (a === 'contrast') {
      if (root.dataset.contrast === 'high') { delete root.dataset.contrast; store('db-contrast', null); } else { root.dataset.contrast = 'high'; store('db-contrast', 'high'); }
    }
    if (a === 'motion') {
      if (root.dataset.motion === 'off') { delete root.dataset.motion; store('db-motion', null); } else { root.dataset.motion = 'off'; store('db-motion', 'off'); }
    }
    sync();
  });
  window.DBSite = { sync: sync };
  sync();
})();
