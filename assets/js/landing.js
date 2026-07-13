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

  // The header button always opens the form: signing in under a different
  // account has to stay possible even when a session is already open.
  openBtn.addEventListener('click', function () {
    signInModal.hidden = false;
    document.getElementById('modalUsername').focus();
  });

  // An open session is not a reason to hide the form — it just adds a shortcut
  // back into the cabinet above it, and a way out.
  var resume = document.getElementById('signInResume');
  var session = Hostera.getSession();
  if (session && resume) {
    resume.hidden = false;
    resume.querySelector('.resume-who').textContent = session.name;
    resume.querySelector('.resume-open').href = Hostera.homeFor(session.role);
    resume.querySelector('.resume-out').addEventListener('click', function (e) {
      e.preventDefault();
      Hostera.signOut(true);
      resume.hidden = true;
    });
  }

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

  // Role tabs inside the modal. Guest and Distributor ship later, so their tabs
  // are disabled in the markup and only Restaurant can become active here. The
  // tab is presentation only — the account itself carries the role.
  var tabs = document.querySelectorAll('.role-tab');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      if (tab.disabled) return;
      tabs.forEach(function (t) {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
    });
  });

  // Sign-in. Credentials are checked against the pilot accounts in auth.js —
  // in the browser, so this is a gate and not real security. TODO: replace with
  // a server-side check before the cabinet holds anything sensitive.
  var signInForm = signInModal.querySelector('form');
  var errorMsg = document.getElementById('signInError');

  if (signInForm) {
    signInForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var username = document.getElementById('modalUsername').value;
      var password = document.getElementById('modalPassword').value;
      var session = Hostera.signIn(username, password);

      if (!session) {
        if (errorMsg) errorMsg.hidden = false;
        document.getElementById('modalPassword').value = '';
        return;
      }
      window.location.href = Hostera.homeFor(session.role);
    });

    // Clear the error as soon as the visitor starts correcting the input.
    signInForm.addEventListener('input', function () {
      if (errorMsg) errorMsg.hidden = true;
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
