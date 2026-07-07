/* ==========================================================================
   Hostera — landing page interactions
   Vanilla JS, no dependencies.
   Sections: Sign in modal / Cookie banner / City filter / Apply form
   ========================================================================== */

/* ---- Sign in modal ------------------------------------------------------ */
(function () {
  var signInModal = document.getElementById('signInModal');
  var openBtn = document.getElementById('openSignIn');
  var closeBtn = document.getElementById('closeSignIn');

  if (!signInModal || !openBtn || !closeBtn) return;

  openBtn.addEventListener('click', function () {
    signInModal.hidden = false;
  });

  closeBtn.addEventListener('click', function () {
    signInModal.hidden = true;
  });

  // Close when clicking the dark overlay outside the modal card
  signInModal.addEventListener('click', function (e) {
    if (e.target === signInModal) signInModal.hidden = true;
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !signInModal.hidden) signInModal.hidden = true;
  });

  // Role tabs inside the modal: Guest / Restaurant / Distributor
  var tabs = document.querySelectorAll('.role-tab');
  var roleLabels = ['Guest', 'Restaurant', 'Distributor'];
  var activeRole = 'Guest';
  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      activeRole = roleLabels[i];
      // TODO: swap form fields/endpoint based on selected role when wiring up real auth
    });
  });

  // Demo sign-in: routes to the matching segment. Front-end-only preview,
  // no credentials are checked. TODO: replace with real auth before launch.
  var signInForm = signInModal.querySelector('form');
  if (signInForm) {
    signInForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (activeRole === 'Guest') window.location.href = 'explore.html';
      else if (activeRole === 'Restaurant') window.location.href = 'dashboard.html';
      else window.location.href = 'distributor.html';
    });
  }
})();

/* ---- Cookie consent banner ----------------------------------------------
   Stores the user's choice in localStorage under 'hostera_cookie_choice'.
   Replace this with your real consent-management/analytics gate before launch.
   ------------------------------------------------------------------------- */
(function () {
  var cookieBanner = document.getElementById('cookieBanner');
  var acceptBtn = document.getElementById('cookieAccept');
  var rejectBtn = document.getElementById('cookieReject');
  var settingsLink = document.getElementById('cookieSettingsLink');

  if (!cookieBanner) return;

  var storedChoice = localStorage.getItem('hostera_cookie_choice');
  cookieBanner.hidden = Boolean(storedChoice);

  if (acceptBtn) {
    acceptBtn.addEventListener('click', function () {
      localStorage.setItem('hostera_cookie_choice', 'accepted');
      cookieBanner.hidden = true;
      // TODO: initialize analytics here only after acceptance
    });
  }

  if (rejectBtn) {
    rejectBtn.addEventListener('click', function () {
      localStorage.setItem('hostera_cookie_choice', 'rejected');
      cookieBanner.hidden = true;
    });
  }

  if (settingsLink) {
    settingsLink.addEventListener('click', function (e) {
      e.preventDefault();
      localStorage.removeItem('hostera_cookie_choice');
      cookieBanner.hidden = false;
    });
  }
})();

/* ---- City filter pills (map section) ------------------------------------
   Currently just toggles the active pill visually.
   TODO: wire to actual restaurant data / map markers once available.
   ------------------------------------------------------------------------- */
(function () {
  var pills = document.querySelectorAll('.city-pill');

  pills.forEach(function (pill) {
    pill.addEventListener('click', function () {
      pills.forEach(function (p) { p.classList.remove('active'); });
      pill.classList.add('active');
      // TODO: filter restaurant cards / re-center map by selected city
    });
  });
})();

/* ---- Apply form (restaurants & distributors) -----------------------------
   This is a front-end-only preview: it prevents the default submit and
   shows an inline confirmation instead of calling alert().
   TODO: replace with a real submit handler (fetch/POST to your backend or
   form service), including server-side validation and CCPA consent logging.
   ------------------------------------------------------------------------- */
(function () {
  var form = document.getElementById('applyForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var existingNote = form.querySelector('.form-submit-note');
    if (existingNote) existingNote.remove();

    var note = document.createElement('p');
    note.className = 'form-submit-note';
    note.setAttribute('role', 'status');
    note.style.cssText = 'margin-top:14px;font-size:13.5px;color:var(--accent-deep);font-weight:600;';
    note.textContent = 'This is a design preview — no data has been submitted.';
    form.appendChild(note);
  });
})();
