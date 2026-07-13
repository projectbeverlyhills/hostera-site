/* ==========================================================================
   Hostera — session
   Front-end-only demo session: the sign-in form checks no credentials and
   there is no backend. The session is a single localStorage record so that
   every surface agrees on who is signed in and "Sign out" actually works.

   TODO: replace the body of signIn()/getSession() with real auth calls before
   launch. The rest of the site only talks to this module, so the surfaces
   should not need to change.

   A page can require a role declaratively, which redirects signed-out
   visitors away before any content paints:

     <script src="auth.js" data-require="Restaurant"></script>
   ========================================================================== */
(function () {
  var KEY = 'hostera_session';

  // Where each role lands after signing in. Guest and Distributor are not part
  // of the current release — see the disabled role tabs in index.html.
  var HOME = {
    Guest: 'explore.html',
    Restaurant: 'dashboard.html',
    Distributor: 'distributor.html'
  };

  // The pilot accounts. These credentials sit in a file the browser downloads,
  // so anyone who opens the page source can read them: this gate keeps the
  // cabinet out of reach of a passer-by, it is NOT security. Nothing sensitive
  // may live behind it until a real backend checks the password server-side.
  var ACCOUNTS = [
    {
      username: 'Novikov',
      password: 'La24',
      role: 'Restaurant',
      name: 'Novikov Beverly Hills',
      initials: 'NV',
      restaurantId: 'novikov_bh',
      // Which of the restaurant's menus the "Open live menu" button lands on.
      // Must match a menu key in winegallery/configs/<restaurantId>.json.
      defaultMenu: 'bar'
    }
  ];

  function getSession() {
    try {
      var raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      // Private-mode Safari and corrupted records both land here.
      return null;
    }
  }

  // Returns the new session, or null when the credentials don't match.
  // The username is matched case-insensitively, the password exactly.
  function signIn(username, password) {
    var candidate = String(username || '').trim().toLowerCase();
    var account = ACCOUNTS.filter(function (a) {
      return a.username.toLowerCase() === candidate && a.password === password;
    })[0];

    if (!account) return null;

    var session = {
      role: account.role,
      username: account.username,
      name: account.name,
      initials: account.initials,
      restaurantId: account.restaurantId,
      defaultMenu: account.defaultMenu,
      signedInAt: Date.now()
    };
    try {
      localStorage.setItem(KEY, JSON.stringify(session));
    } catch (e) {
      // Storage unavailable: still route the user through, they just won't
      // stay signed in across page loads.
    }
    return session;
  }

  // Pass stay = true when the caller is already on the landing page and only
  // needs the session dropped, without a redirect.
  function signOut(stay) {
    try {
      localStorage.removeItem(KEY);
    } catch (e) {}
    if (!stay) window.location.href = 'index.html';
  }

  // Returns the session if it matches the role, otherwise sends the visitor to
  // the landing page. replace() keeps the protected page out of the back stack,
  // so Back from the landing page doesn't bounce them here again.
  function requireRole(role) {
    var session = getSession();
    if (!session || session.role !== role) {
      window.location.replace('index.html');
      return null;
    }
    return session;
  }

  function homeFor(role) {
    return HOME[role] || 'index.html';
  }

  window.Hostera = {
    getSession: getSession,
    signIn: signIn,
    signOut: signOut,
    requireRole: requireRole,
    homeFor: homeFor
  };

  // Declarative guard — runs while <head> is still parsing, before paint.
  var self = document.currentScript;
  var required = self && self.getAttribute('data-require');
  if (required) requireRole(required);
})();
