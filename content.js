// ============================================================
// NBA Dark Mode — content.js
// A clean, carefully crafted dark theme for NBA.com
// Two-pronged approach:
//   1. CSS injection (document_start) — prevents white flash
//   2. JS runtime scanner — reads computed styles and replaces
//      light backgrounds with the correct dark shade
// ============================================================

(function () {
  'use strict';

  // ── Color Palette ──────────────────────────────────────────
  const COLORS = {
    pageBg:       '#0d0d0d',   // deepest black — page background
    evenRow:      '#151515',   // data rows (even)
    headerBg:     '#1c1c1c',   // headers, scoreboard panels
    cardBg:       '#1a1a1a',   // cards, containers
    elevatedBg:   '#242424',   // team name rows, elevated panels
    hoverBg:      '#2e2e2e',   // hover states
    surfaceBg:    '#333333',   // lighter surface elements
    text:         '#e0e0e0',   // primary text
    textMuted:    '#a0a0a0',   // secondary text
    link:         '#6eaaff',   // links
    nbaAccent:    '#1d6fef',   // NBA blue (brightened for dark bg)
    border:       '#2a2a2a',   // subtle borders
    borderLight:  '#3a3a3a',   // lighter borders
  };

  // ── CSS Stylesheet (injected at document_start) ────────────
  const CSS = `
    /* ===== ROOT OVERRIDE ===== */
    html, body {
      background-color: ${COLORS.pageBg} !important;
      color: ${COLORS.text} !important;
    }

    /* ===== GLOBAL TEXT ===== */
    body, div, span, p, h1, h2, h3, h4, h5, h6,
    td, th, li, label, figcaption, caption, summary,
    article, section, aside, main, footer, header, nav,
    blockquote, pre, code, small, strong, em, b, i, u,
    button, input, select, textarea, option {
      color: ${COLORS.text} !important;
      /* NOTE: no global border-color here. Forcing border-color on every
         div/span repaints the transparent sides of CSS border-triangles
         (e.g. the scoreboard winner arrow) into grey squares. Light
         borders are darkened per-element by the JS scanner instead. */
    }

    /* ===== LINKS ===== */
    a, a:visited {
      color: ${COLORS.link} !important;
    }
    a:hover {
      color: #8ec5ff !important;
    }

    /* ===== BACKGROUNDS — broad reset =====
       EXCLUDES nav, header, and scoreboard areas
       which are already dark on NBA.com natively */
    section, article, aside, main,
    figure, figcaption, form, fieldset, details,
    summary, dialog, dl, dd, dt,
    blockquote, pre {
      background-color: transparent !important;
    }

    /* ===== NAVIGATION DROPDOWNS (only dropdowns need override) ===== */
    [class*="Dropdown"],
    [class*="dropdown"],
    [class*="SubNav"],
    [class*="subnav"],
    [class*="Menu_menu"],
    [class*="Flyout"],
    [role="menu"],
    [role="listbox"] {
      background-color: ${COLORS.elevatedBg} !important;
    }

    /* ===== CARDS / CONTAINERS (non-scoreboard) ===== */
    [class*="ContentBlock"],
    [class*="Block_block"] {
      background-color: ${COLORS.cardBg} !important;
    }

    /* ===== STAT TABLES ===== */
    table {
      background-color: ${COLORS.pageBg} !important;
    }
    thead tr, th {
      background-color: ${COLORS.headerBg} !important;
      color: ${COLORS.textMuted} !important;
      font-weight: 600 !important;
    }
    /* Rows AND cells: NBA.com can paint the stripe on the <td> (or on a
       layer behind it), which shows through a <tr>-only override as
       white rows with light text. Painting the cells covers every case. */
    tbody tr:nth-child(odd),
    tbody tr:nth-child(odd) > td {
      background-color: ${COLORS.evenRow} !important;
    }
    tbody tr:nth-child(even),
    tbody tr:nth-child(even) > td {
      background-color: ${COLORS.pageBg} !important;
    }
    tbody tr:hover,
    tbody tr:hover > td {
      background-color: ${COLORS.hoverBg} !important;
    }
    td, th {
      border-color: ${COLORS.border} !important;
    }

    /* ===== STANDINGS / STATS TABLES (NBA specific) ===== */
    [class*="StatsTable"],
    [class*="statstable"],
    [class*="Standings"],
    [class*="standings_"] {
      background-color: ${COLORS.pageBg} !important;
    }

    /* ===== BUTTONS =====
       Not applied inside the natively dark top nav/header — doing so
       drew grey boxes behind the apps-grid and profile icons. */
    :is(button, [role="button"], .btn,
        [class*="Button"],
        [class*="button_"],
        input[type="submit"],
        input[type="button"]):not(header *, nav *) {
      background-color: ${COLORS.elevatedBg} !important;
      color: ${COLORS.text} !important;
      border-color: ${COLORS.borderLight} !important;
    }
    :is(button, [role="button"]):not(header *, nav *):hover {
      background-color: ${COLORS.hoverBg} !important;
    }

    /* ===== TAB BARS / PILL NAVS ===== */
    [role="tab"] {
      color: ${COLORS.textMuted} !important;
    }
    [role="tab"][aria-selected="true"],
    [class*="active"],
    [class*="Active"] {
      color: #ffffff !important;
    }

    /* ===== SEARCH / INPUTS ===== */
    input, select, textarea {
      background-color: ${COLORS.elevatedBg} !important;
      color: ${COLORS.text} !important;
      border-color: ${COLORS.borderLight} !important;
    }
    input::placeholder, textarea::placeholder {
      color: ${COLORS.textMuted} !important;
    }

    /* ===== FOOTER — left to native dark styling ===== */

    /* ===== MODALS / OVERLAYS ===== */
    [class*="Modal"],
    [class*="modal_"],
    [class*="Overlay"],
    [class*="Dialog"],
    [role="dialog"] {
      background-color: ${COLORS.cardBg} !important;
    }

    /* ===== BREADCRUMBS / SUBNAV — left to native styling ===== */

    /* ===== LEAGUE PASS / VIDEO PLAYER ===== */
    [class*="VideoPlayer"],
    [class*="videoplayer"],
    [class*="LeaguePass"],
    video, iframe {
      background-color: #000 !important;
    }

    /* ===== PRESERVE MEDIA ===== */
    img, svg, video, canvas, picture, figure img,
    [class*="Logo"], [class*="logo"],
    [class*="Avatar"], [class*="avatar"],
    [class*="Headshot"], [class*="headshot"],
    [class*="TeamLogo"], [class*="teamlogo"],
    [class*="PlayerImage"], [class*="playerimage"] {
      filter: none !important;
      background-color: transparent !important;
    }

    /* ===== SCROLLBAR ===== */
    ::-webkit-scrollbar {
      width: 10px;
      background: ${COLORS.pageBg};
    }
    ::-webkit-scrollbar-thumb {
      background: ${COLORS.surfaceBg};
      border-radius: 5px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: ${COLORS.hoverBg};
    }

    /* ===== HORIZONTAL RULES / DIVIDERS ===== */
    hr {
      border-color: ${COLORS.border} !important;
      background-color: ${COLORS.border} !important;
    }

    /* ===== STICKY ELEMENTS =====
       Intentionally NOT overriding sticky/fixed elements
       since NBA.com's nav and scoreboard are natively dark */

    /* ===== TOOLTIP / POPOVER ===== */
    [class*="Tooltip"],
    [class*="tooltip"],
    [class*="Popover"],
    [class*="popover"],
    [role="tooltip"] {
      background-color: ${COLORS.elevatedBg} !important;
      color: ${COLORS.text} !important;
    }

    /* ===== LOADING / SKELETON ===== */
    [class*="Skeleton"],
    [class*="skeleton"],
    [class*="Loading"],
    [class*="Placeholder"] {
      background-color: ${COLORS.headerBg} !important;
    }

    /* ===== BANNER / HERO — left to native styling ===== */

    /* ===== SELECTION ===== */
    ::selection {
      background-color: ${COLORS.nbaAccent} !important;
      color: #fff !important;
    }
  `;

  // ── Inject CSS immediately ─────────────────────────────────
  // Idempotent: creates the <style> if missing (e.g. removed when the
  // site re-renders <head>), and keeps it as the LAST child of <head>
  // so it wins cascade ties against site stylesheets.
  function injectCSS() {
    let style = document.getElementById('nba-dark-mode-css');
    if (!style) {
      style = document.createElement('style');
      style.id = 'nba-dark-mode-css';
      style.textContent = CSS;
    }
    const parent = document.head || document.documentElement;
    if (!parent) {
      // No <html> yet: inject the moment it is created.
      const mo = new MutationObserver(() => {
        if (document.documentElement) { mo.disconnect(); if (isActive) injectCSS(); }
      });
      mo.observe(document, { childList: true });
      return;
    }
    if (style.parentNode !== parent || parent.lastElementChild !== style) {
      parent.appendChild(style);
    }
  }

  // ── Remove CSS ─────────────────────────────────────────────
  function removeCSS() {
    const el = document.getElementById('nba-dark-mode-css');
    if (el) el.remove();
  }

  // ── JS Runtime Scanner ─────────────────────────────────────
  // Reads getComputedStyle() on elements and replaces light
  // backgrounds with the correct dark shade based on context
  // ────────────────────────────────────────────────────────────

  function parseColor(str) {
    const m = str.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (!m) return null;
    return { r: +m[1], g: +m[2], b: +m[3] };
  }

  function luminance(c) {
    return 0.299 * c.r + 0.587 * c.g + 0.114 * c.b;
  }

  function isLight(c) {
    return luminance(c) > 170;
  }

  function isDark(c) {
    return luminance(c) < 50;
  }

  function isMediumLight(c) {
    const l = luminance(c);
    return l > 100 && l <= 170;
  }

  function isNBABlue(c) {
    // NBA primary blue ~#1d428a → r:29, g:66, b:138
    return c.b > 100 && c.b > c.r * 1.5 && c.b > c.g * 1.2;
  }

  function isWhiteish(c) {
    return c.r > 230 && c.g > 230 && c.b > 230;
  }

  function isPreservedElement(el) {
    const tag = el.tagName.toLowerCase();
    if (['img', 'svg', 'video', 'canvas', 'picture', 'iframe'].includes(tag)) return true;
    const cl = el.className || '';
    if (typeof cl === 'string') {
      const lower = cl.toLowerCase();
      if (/logo|avatar|headshot|teamlogo|playerimage|icon/.test(lower)) return true;
    }
    return false;
  }

  function getDarkReplacement(el, color) {
    if (isPreservedElement(el)) return null;

    // Skip elements that are already dark — don't fight native dark styling
    if (isDark(color)) return null;

    const cl = (el.className || '').toString().toLowerCase();
    const tag = el.tagName.toLowerCase();

    // Headers, nav, scoreboard
    if (tag === 'header' || tag === 'nav' ||
        /nav|header|scoreboard|gamestrip|scorestrip/.test(cl)) {
      return COLORS.headerBg;
    }

    // Cards, panels, containers
    if (/card|tile|panel|module|widget|block|content/.test(cl)) {
      return COLORS.cardBg;
    }

    // Table headers
    if (tag === 'th' || tag === 'thead') {
      return COLORS.headerBg;
    }

    // Table rows
    if (tag === 'tr' || tag === 'td') {
      return COLORS.evenRow;
    }

    // Elevated panels / team rows
    if (/team|elevated|active|selected|highlight/.test(cl)) {
      return COLORS.elevatedBg;
    }

    // Footer
    if (tag === 'footer' || /footer/.test(cl)) {
      return COLORS.headerBg;
    }

    // NBA blue elements — darken but keep blue tint
    if (isNBABlue(color)) {
      return '#0e2444';
    }

    // Generic light backgrounds
    if (isWhiteish(color)) {
      return COLORS.pageBg;
    }

    if (isLight(color)) {
      return COLORS.cardBg;
    }

    if (isMediumLight(color)) {
      return COLORS.elevatedBg;
    }

    return null;
  }

  // Only write when the value actually changes — otherwise every write
  // fires a style mutation, which would re-trigger the scanner forever.
  function setImportant(el, prop, value) {
    if (el.style.getPropertyValue(prop) === value &&
        el.style.getPropertyPriority(prop) === 'important') return;
    el.style.setProperty(prop, value, 'important');
  }

  const BORDER_SIDES = ['top', 'right', 'bottom', 'left'];

  // Darken light borders. Zero-width/height elements are skipped: those
  // are CSS border-triangles (winner arrow, carets) whose coloured side
  // IS the visible shape and must stay untouched.
  function fixBorders(el, computed) {
    if (computed.width === '0px' || computed.height === '0px') return;
    for (const side of BORDER_SIDES) {
      if (parseFloat(computed.getPropertyValue(`border-${side}-width`)) === 0) continue;
      const c = parseColor(computed.getPropertyValue(`border-${side}-color`));
      if (c && luminance(c) > 120) {
        setImportant(el, `border-${side}-color`, COLORS.border);
      }
    }
  }

  function scanElements() {
    if (!isActive) return;
    injectCSS();
    const all = document.querySelectorAll('*');
    for (const el of all) {
      if (isPreservedElement(el)) continue;

      try {
        const computed = getComputedStyle(el);
        fixBorders(el, computed);
        const bg = computed.backgroundColor;
        if (!bg || bg === 'transparent' || bg === 'rgba(0, 0, 0, 0)') continue;

        const color = parseColor(bg);
        if (!color) continue;

        const replacement = getDarkReplacement(el, color);
        if (replacement) {
          setImportant(el, 'background-color', replacement);
        }

        // Fix text color if it's dark on our dark bg
        const fg = parseColor(computed.color);
        if (fg && luminance(fg) < 80) {
          setImportant(el, 'color', COLORS.text);
        }
      } catch (e) {
        // Skip elements that can't be styled
      }
    }
  }

  // ── MutationObserver for SPA navigation ────────────────────
  // Debounce with a max-wait: NBA.com mutates the DOM almost constantly
  // (ads, live scores, video). A pure 150ms debounce got reset forever
  // and the scan never ran — the "sometimes it works" behaviour.
  const SCAN_DELAY = 150;
  const SCAN_MAX_WAIT = 1000;
  let scanTimeout = null;
  let firstQueuedAt = 0;
  function debouncedScan() {
    const now = Date.now();
    if (!scanTimeout) firstQueuedAt = now;
    else clearTimeout(scanTimeout);
    const wait = Math.max(0, Math.min(SCAN_DELAY, firstQueuedAt + SCAN_MAX_WAIT - now));
    scanTimeout = setTimeout(() => {
      scanTimeout = null;
      scanElements();
    }, wait);
  }

  let observer = null;

  function startObserver() {
    if (observer) return;
    observer = new MutationObserver((mutations) => {
      let shouldScan = false;
      for (const m of mutations) {
        if (m.addedNodes.length > 0 || m.removedNodes.length > 0) { shouldScan = true; break; }
        // 'style' included: React re-renders can wipe the scanner's inline
        // overrides. setImportant() makes the scanner's own writes no-ops
        // on the next pass, so this does not loop.
        if (m.type === 'attributes') { shouldScan = true; break; }
      }
      if (shouldScan) debouncedScan();
    });
    // documentElement (not body) so a removed/reordered <style> in
    // <head> is also detected and re-injected.
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style']
    });
  }

  function stopObserver() {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  }

  // ── Activation Logic ───────────────────────────────────────

  let isActive = false;

  function activate() {
    if (isActive) return;
    isActive = true;
    injectCSS();

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        scanElements();
        // Multiple sweeps during load
        setTimeout(scanElements, 500);
        setTimeout(scanElements, 1500);
        setTimeout(scanElements, 3000);
        startObserver();
      });
    } else {
      scanElements();
      setTimeout(scanElements, 500);
      setTimeout(scanElements, 1500);
      startObserver();
    }
  }

  function deactivate() {
    if (!isActive) return;
    isActive = false;
    removeCSS();
    stopObserver();
    // Remove inline styles set by scanner
    const all = document.querySelectorAll('[style]');
    for (const el of all) {
      el.style.removeProperty('background-color');
      el.style.removeProperty('color');
      for (const side of BORDER_SIDES) el.style.removeProperty(`border-${side}-color`);
    }
  }

  // ── Storage: check toggle state ────────────────────────────

  chrome.storage.sync.get({ darkModeEnabled: true }, (data) => {
    if (data.darkModeEnabled) {
      activate();
    }
  });

  // Listen for toggle messages from popup
  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.action === 'toggle') {
      if (msg.enabled) {
        activate();
      } else {
        deactivate();
        // Force reload for clean removal
        location.reload();
      }
    }
  });

})();
