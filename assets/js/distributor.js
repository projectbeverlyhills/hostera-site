/* Hostera — Distributor Cabinet interactions.
   Same behavior contract as dash.js (Restaurant Backoffice):
   theme toggle via data-theme on <html>, sidebar page switching,
   module-local tabs. Adds two demo-only interactions: order
   confirmation and availability confirmation (front-end state
   only — TODO: replace with real API calls; status changes must
   sync to the restaurant's Procurement module in Segment 2). */
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

  // Page navigation (sidebar)
  var links = document.querySelectorAll('.dist-navlink[data-page]');
  var pages = document.querySelectorAll('.dist-page');
  function goTo(target){
    links.forEach(function(l){
      l.classList.toggle('active', l.getAttribute('data-page') === target);
    });
    pages.forEach(function(p){
      p.classList.toggle('active', p.id === 'page-' + target);
    });
    var content = document.querySelector('.dist-content');
    if(content) content.scrollTo({top:0, behavior:'instant'});
    window.scrollTo({top:0, behavior:'instant'});
  }
  links.forEach(function(link){
    link.addEventListener('click', function(){
      goTo(link.getAttribute('data-page'));
    });
  });

  // Cross-module deep links (e.g. "Open Demand Signals" on Overview)
  document.addEventListener('click', function(e){
    var jump = e.target.closest('[data-goto]');
    if(jump) goTo(jump.getAttribute('data-goto'));
  });

  // Module-local tab switching
  document.addEventListener('click', function(e){
    var tab = e.target.closest('.ds-module-tab');
    if(!tab) return;
    var group = tab.closest('.ds-module-tabs');
    if(!group) return;
    group.querySelectorAll('.ds-module-tab').forEach(function(t){ t.classList.remove('active'); });
    tab.classList.add('active');
    var panelGroup = group.parentElement;
    var targetPanel = tab.getAttribute('data-tab-target');
    if(targetPanel){
      panelGroup.querySelectorAll('[data-tab-panel]').forEach(function(p){
        p.style.display = (p.getAttribute('data-tab-panel') === targetPanel) ? '' : 'none';
      });
    }
  });

  // Demo: confirm an order in the pipeline (front-end only).
  // TODO: backend — POST order confirmation; webhook status to Segment 2 Procurement.
  document.addEventListener('click', function(e){
    var btn = e.target.closest('[data-confirm-order]');
    if(!btn) return;
    var row = btn.closest('tr');
    var statusCell = row && row.querySelector('[data-order-status]');
    if(statusCell){
      statusCell.innerHTML = '<span class="ds-pill good">Confirmed</span>';
    }
    var newBtn = document.createElement('button');
    newBtn.className = 'dsbtn dsbtn-line dsbtn-sm';
    newBtn.textContent = 'Mark in transit';
    btn.replaceWith(newBtn);
  });

  // Demo: confirm availability on a Connector lead (front-end only).
  // TODO: backend — availability response API; notify the requesting restaurant.
  document.addEventListener('click', function(e){
    var btn = e.target.closest('[data-confirm-availability]');
    if(!btn) return;
    var pill = document.createElement('span');
    pill.className = 'ds-pill good';
    pill.textContent = 'Availability confirmed';
    var oldPill = btn.closest('.ds-lead-row').querySelector('.ds-pill.warn');
    if(oldPill) oldPill.remove();
    btn.replaceWith(pill);
  });
})();
