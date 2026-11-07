/* "Ask the team": sends a question to the same Apps Script backend as the application form,
   and shows the questions the organisers have answered in the sheet (doGet?view=questions). */
(function () {
  var form = document.getElementById('ask-form');
  if (!form) return;
  var endpoint = (window.DB_CONFIG && window.DB_CONFIG.endpoint) || '';
  var q = document.getElementById('ask-q'), err = document.getElementById('ask-q-err');
  var status = document.getElementById('ask-status'), send = document.getElementById('ask-send');
  var box = document.getElementById('answered'), list = document.getElementById('answered-list');

  function say(text) { status.textContent = text; }

  function render(items) {
    if (!Array.isArray(items) || items.length === 0) return;
    list.textContent = '';
    items.forEach(function (it) {
      var dt = document.createElement('dt'), dd = document.createElement('dd');
      dt.textContent = it.question + (it.name ? ' (' + it.name + ')' : '');
      dd.textContent = it.answer;
      list.appendChild(dt); list.appendChild(dd);
    });
    box.hidden = false;
  }

  if (endpoint) {
    fetch(endpoint + '?view=questions').then(function (r) { return r.json(); }).then(render).catch(function () {});
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var text = q.value.trim();
    if (!text) {
      err.dataset.show = '1'; q.setAttribute('aria-invalid', 'true'); q.focus(); return;
    }
    err.dataset.show = ''; q.removeAttribute('aria-invalid');
    if (document.getElementById('ask-website').value) { say('Thank you. Your question was sent.'); form.reset(); return; }
    var payload = {
      role: 'question', lang: document.documentElement.lang === 'am' ? 'am' : 'en',
      submittedAt: new Date().toISOString(), website: '',
      answers: { name: document.getElementById('ask-name').value.trim(), question: text, contact: document.getElementById('ask-contact').value.trim() }
    };
    if (!endpoint) { say('Preview: nothing was sent. When the site is live, your question reaches the team here.'); return; }
    send.setAttribute('aria-disabled', 'true');
    say('Sending your question.');
    fetch(endpoint, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify(payload) })
      .then(function () { say('Thank you. Your question was sent. Answers appear on this page within a day.'); form.reset(); })
      .catch(function () { say('The question could not be sent. Check your connection and try again, or write to ethiopia@alxafrica.com.'); })
      .then(function () { send.removeAttribute('aria-disabled'); });
  });
})();
