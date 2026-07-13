(function(){
  // Account — the guard in <head> already redirected anyone without a
  // Restaurant session, so by this point there is one.
  var session = Hostera.getSession();
  if(session){
    var fields = {
      accountName: session.name,
      accountRole: session.role + ' · Active',
      accountInitials: session.initials,
      topbarInitials: session.initials
    };
    Object.keys(fields).forEach(function(id){
      var el = document.getElementById(id);
      if(el) el.textContent = fields[id];
    });

    // Both entrances into the menu app belong to the signed-in restaurant, and
    // each opens its own surface directly — the guest menu and Waste Mode are
    // separate tools, so neither should land on a chooser screen.
    // Route format: winegallery/index.html#/<restaurantId>/<menu|waste>
    var base = 'winegallery/index.html#/' + session.restaurantId + '/';
    var links = {
      liveMenuLink: session.defaultMenu || 'bar',
      wasteModeLink: 'waste'
    };
    if(session.restaurantId){
      Object.keys(links).forEach(function(id){
        var el = document.getElementById(id);
        if(el) el.href = base + links[id];
      });
    }

    // The menu app remembers the guest's theme choice under localStorage
    // 'theme', and it now shares an origin with the backoffice. Clearing the key
    // means the menu always opens light, whatever the last guest picked.
    var menuLink = document.getElementById('liveMenuLink');
    if(menuLink){
      menuLink.addEventListener('click', function(){
        try { localStorage.removeItem('theme'); } catch(e) {}
      });
    }
  }

  var signOutBtn = document.getElementById('signOutBtn');
  if(signOutBtn){
    signOutBtn.addEventListener('click', function(){ Hostera.signOut(); });
  }

  // Theme toggle
  var root = document.documentElement;
  var toggle = document.getElementById('themeToggle');
  function setTheme(dark){
    root.setAttribute('data-theme', dark ? 'dark' : 'light');
    if(toggle) toggle.setAttribute('aria-checked', dark ? 'true' : 'false');
  }
  if(toggle){
    toggle.addEventListener('click', function(){
      setTheme(root.getAttribute('data-theme') !== 'dark');
    });
    toggle.addEventListener('keydown', function(e){
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        setTheme(root.getAttribute('data-theme') !== 'dark');
      }
    });
  }

  // Page navigation
  var links = document.querySelectorAll('.dash-navlink[data-page]');
  var pages = document.querySelectorAll('.dash-page');
  links.forEach(function(link){
    link.addEventListener('click', function(){
      var target = link.getAttribute('data-page');
      links.forEach(function(l){ l.classList.remove('active'); });
      link.classList.add('active');
      pages.forEach(function(p){
        p.classList.toggle('active', p.id === 'page-' + target);
      });
      document.querySelector('.dash-content').scrollTo({top:0, behavior:'instant'});
      window.scrollTo({top:0, behavior:'instant'});
    });
  });

  // Module-local tab switching (re-bound after content injection if needed)
  document.addEventListener('click', function(e){
    var tab = e.target.closest('.module-tab');
    if(!tab) return;
    var group = tab.closest('.module-tabs');
    if(!group) return;
    group.querySelectorAll('.module-tab').forEach(function(t){ t.classList.remove('active'); });
    tab.classList.add('active');
    var panelGroup = group.parentElement;
    var targetPanel = tab.getAttribute('data-tab-target');
    if(targetPanel){
      panelGroup.querySelectorAll('[data-tab-panel]').forEach(function(p){
        p.style.display = (p.getAttribute('data-tab-panel') === targetPanel) ? '' : 'none';
      });
    }
  });
})();
