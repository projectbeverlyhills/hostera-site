(function(){
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
