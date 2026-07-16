/* ============================================================================
   Hostera PWA bootstrap — единый для всех страниц сайта.
   1) Регистрирует корневой service worker /sw.js (scope '/').
   2) На iOS/iPadOS Safari показывает подсказку «На экран „Домой“»
      (у iOS нет beforeinstallprompt). Разметка и стили самодостаточны —
      скрипт не зависит от CSS конкретной страницы.
   Подключение:  <script src="/assets/js/pwa.js" defer></script>
   ========================================================================== */
(function () {
  'use strict';

  // --- Регистрация Service Worker ---
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('/sw.js', { scope: '/' })
        .catch(function (err) { console.warn('[PWA] SW registration failed:', err); });
    });
  }

  // --- Add-to-Home-Screen подсказка для iOS/iPadOS Safari ---
  try {
    var ua = window.navigator.userAgent;
    var isIOS = /iP(hone|od|ad)/.test(ua) ||
                (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1); // iPadOS 13+
    var isSafari = /^((?!chrome|android|crios|fxios|edgios|opios).)*safari/i.test(ua);
    var isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                       window.navigator.standalone === true;
    var DISMISS_KEY = 'hostera_a2hs_dismissed';
    var dismissed = false;
    try { dismissed = localStorage.getItem(DISMISS_KEY) === '1'; } catch (e) {}

    if (!isIOS || !isSafari || isStandalone || dismissed) return;

    var css = [
      '.hostera-a2hs{position:fixed;left:50%;bottom:calc(16px + env(safe-area-inset-bottom));',
      'transform:translateX(-50%) translateY(8px);z-index:9999;display:none;align-items:center;gap:10px;',
      'max-width:min(420px,calc(100vw - 24px));padding:12px 14px;border-radius:16px;',
      'background:#FFFFFF;color:#1C1C1E;border:1px solid #E0E0E0;box-shadow:0 8px 30px rgba(0,0,0,0.18);',
      'font-family:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;',
      'font-size:13.5px;line-height:1.35;opacity:0;',
      'transition:opacity 220ms cubic-bezier(0.2,0,0,1),transform 220ms cubic-bezier(0.2,0,0,1);}',
      '@media (prefers-color-scheme:dark){.hostera-a2hs{background:#2C2C2E;color:#F5F5F7;border-color:#3A3A3C;}}',
      '.hostera-a2hs.show{display:flex;opacity:1;transform:translateX(-50%) translateY(0);}',
      '.hostera-a2hs .a2hs-ico{color:#C76B28;flex-shrink:0;}',
      '.hostera-a2hs .a2hs-ico svg{width:22px;height:22px;display:block;}',
      '.hostera-a2hs b{font-weight:600;}',
      '.hostera-a2hs .a2hs-close{margin-left:4px;flex-shrink:0;width:30px;height:30px;border:none;',
      'border-radius:999px;background:transparent;color:#6E6E73;font-size:18px;line-height:1;cursor:pointer;',
      'display:inline-flex;align-items:center;justify-content:center;touch-action:manipulation;}'
    ].join('');

    var mount = function () {
      var style = document.createElement('style');
      style.textContent = css;
      document.head.appendChild(style);

      var hint = document.createElement('div');
      hint.className = 'hostera-a2hs';
      hint.setAttribute('role', 'dialog');
      hint.setAttribute('aria-live', 'polite');
      hint.setAttribute('aria-label', 'Установка на домашний экран');
      hint.innerHTML =
        '<span class="a2hs-ico" aria-hidden="true">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M12 15V3"/><path d="M8 7l4-4 4 4"/>' +
        '<path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/></svg></span>' +
        '<span>Установите Hostera: нажмите <b>Поделиться</b>, затем <b>«На экран „Домой“»</b>.</span>' +
        '<button class="a2hs-close" type="button" aria-label="Закрыть">×</button>';
      document.body.appendChild(hint);

      var hide = function (persist) {
        hint.classList.remove('show');
        if (persist) { try { localStorage.setItem(DISMISS_KEY, '1'); } catch (e) {} }
      };
      // показываем с небольшой задержкой, чтобы не мешать первому впечатлению
      setTimeout(function () { hint.classList.add('show'); }, 2600);
      hint.querySelector('.a2hs-close').addEventListener('click', function () { hide(true); });
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', mount);
    } else {
      mount();
    }
  } catch (e) { /* подсказка не критична */ }
})();
