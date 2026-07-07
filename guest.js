/* ==========================================================================
   Hostera — Guest segment interactions
   Vanilla JS, no dependencies. Reads mock data from guest-data.js.
   Front-end-only demo: no network calls. TODOs mark backend integration points.
   ========================================================================== */

var Hostera = window.Hostera || {};

(function () {
  var D = window.HOSTERA_DATA;

  /* ---- small shared helpers -------------------------------------------- */
  function starsSVG(count, filled) {
    var out = '';
    for (var i = 0; i < count; i++) {
      out += '<svg width="13" height="13" viewBox="0 0 24 24">' +
        (i < filled
          ? '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>'
          : '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.35"/>') +
        '</svg>';
    }
    return out;
  }
  function qs(name) {
    var params = new URLSearchParams(window.location.search);
    return params.get(name);
  }
  function fmtDate(iso) {
    var d = new Date(iso + 'T00:00:00');
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  }
  function fmtDateShort(iso) {
    var d = new Date(iso + 'T00:00:00');
    return { mon: d.toLocaleDateString('en-US', { month: 'short' }), day: d.getDate() };
  }
  Hostera.starsSVG = starsSVG;
  Hostera.qs = qs;
  Hostera.fmtDate = fmtDate;
  Hostera.fmtDateShort = fmtDateShort;
  Hostera.data = D;
  window.Hostera = Hostera;

  /* ---- Account dropdown --------------------------------------------------- */
  (function () {
    var btn = document.getElementById('gAvatarBtn');
    var menu = document.getElementById('gAccountMenu');
    if (!btn || !menu) return;
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = menu.getAttribute('data-open') === 'true';
      menu.setAttribute('data-open', open ? 'false' : 'true');
    });
    document.addEventListener('click', function (e) {
      if (!menu.contains(e.target) && e.target !== btn) menu.setAttribute('data-open', 'false');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') menu.setAttribute('data-open', 'false');
    });
  })();

  /* ---- Notifications dropdown --------------------------------------------- */
  (function () {
    var btn = document.getElementById('gNotifBtn');
    var menu = document.getElementById('gNotifMenu');
    if (!btn || !menu) return;
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = menu.getAttribute('data-open') === 'true';
      menu.setAttribute('data-open', open ? 'false' : 'true');
      var badge = btn.querySelector('.gbadge');
      if (badge) badge.remove();
    });
    document.addEventListener('click', function (e) {
      if (!menu.contains(e.target) && e.target !== btn) menu.setAttribute('data-open', 'false');
    });
  })();

  /* ---- Fill account widgets on any page (avatar initials, name) ---------- */
  (function () {
    if (!D) return;
    document.querySelectorAll('[data-guest-name]').forEach(function (el) { el.textContent = D.guest.name; });
    document.querySelectorAll('[data-guest-initials]').forEach(function (el) { el.textContent = D.guest.initials; });
    document.querySelectorAll('[data-guest-email]').forEach(function (el) { el.textContent = D.guest.email; });
    document.querySelectorAll('[data-notif-count]').forEach(function (el) {
      if (D.guest.unreadNotifications > 0) { el.textContent = D.guest.unreadNotifications; } else { el.remove(); }
    });
  })();

  /* ---- Generic tabs: [data-gtabs] group, buttons with data-tab, panels with data-tab-panel */
  document.addEventListener('click', function (e) {
    var tab = e.target.closest('[data-tab]');
    if (!tab) return;
    var group = tab.closest('[data-gtabs]');
    if (!group) return;
    group.querySelectorAll('[data-tab]').forEach(function (t) { t.classList.remove('active'); });
    tab.classList.add('active');
    var target = tab.getAttribute('data-tab');
    var scope = group.getAttribute('data-panels-in') ? document.querySelector(group.getAttribute('data-panels-in')) : document;
    scope.querySelectorAll('[data-tab-panel]').forEach(function (p) {
      p.style.display = (p.getAttribute('data-tab-panel') === target) ? '' : 'none';
    });
  });

  /* ---- Favorite toggle (delegated, works on any page) --------------------- */
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.g-fav-btn');
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    var isFav = btn.getAttribute('data-fav') === 'true';
    btn.setAttribute('data-fav', isFav ? 'false' : 'true');
    // TODO: persist favorite state to backend once wired up
  });

  /* ---- Subscribe toggle (delegated) --------------------------------------- */
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-subscribe-btn]');
    if (!btn) return;
    var subscribed = btn.getAttribute('data-subscribed') === 'true';
    btn.setAttribute('data-subscribed', subscribed ? 'false' : 'true');
    btn.textContent = subscribed ? 'Subscribe' : 'Subscribed';
    btn.classList.toggle('btn-accent', subscribed);
    btn.classList.toggle('btn-ghost', !subscribed);
    // TODO: persist subscription to backend once wired up
  });

  /* ---- Filter drawer (Explore) -------------------------------------------- */
  (function () {
    var openBtn = document.getElementById('openFilters');
    var overlay = document.getElementById('filterDrawer');
    var closeBtn = document.getElementById('closeFilters');
    if (!openBtn || !overlay) return;
    openBtn.addEventListener('click', function () { overlay.hidden = false; });
    if (closeBtn) closeBtn.addEventListener('click', function () { overlay.hidden = true; });
    overlay.addEventListener('click', function (e) { if (e.target === overlay) overlay.hidden = true; });
    overlay.querySelectorAll('.gchip').forEach(function (chip) {
      chip.addEventListener('click', function () { chip.classList.toggle('active'); });
    });
  })();

  /* ---- Mini calendar (Events) — renders a month grid, marks event days --- */
  Hostera.renderMiniCalendar = function (containerId, isoDates, monthDate) {
    var el = document.getElementById(containerId);
    if (!el) return;
    var d = monthDate || new Date('2026-07-01T00:00:00');
    var year = d.getFullYear(), month = d.getMonth();
    var first = new Date(year, month, 1);
    var startDay = first.getDay();
    var daysInMonth = new Date(year, month + 1, 0).getDate();
    var monthLabel = first.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    var eventDays = {};
    (isoDates || []).forEach(function (iso) {
      var dd = new Date(iso + 'T00:00:00');
      if (dd.getFullYear() === year && dd.getMonth() === month) eventDays[dd.getDate()] = true;
    });
    var html = '<h4>' + monthLabel + '</h4><div class="mini-cal-grid">';
    ['S', 'M', 'T', 'W', 'T', 'F', 'S'].forEach(function (l) { html += '<span>' + l + '</span>'; });
    for (var i = 0; i < startDay; i++) html += '<span></span>';
    for (var day = 1; day <= daysInMonth; day++) {
      var cls = eventDays[day] ? 'has-event' : '';
      html += '<button class="' + cls + '" type="button">' + day + '</button>';
    }
    html += '</div>';
    el.innerHTML = html;
  };

})();
