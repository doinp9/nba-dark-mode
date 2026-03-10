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
      border-color: ${COLORS.border} !important;
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
    tbody tr:nth-child(odd) {
      background-color: ${COLORS.evenRow} !important;
    }
    tbody tr:nth-child(even) {
      background-color: ${COLORS.pageBg} !important;
    }
    tbody tr:hover {
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

    /* ===== BUTTONS ===== */
    button, [role="button"], .btn,
    [class*="Button"],
    [class*="button_"],
    input[type="submit"],
    input[type="button"] {
      background-color: ${COLORS.elevatedBg} !important;
      color: ${COLORS.text} !important;
      border-color: ${COLORS.borderLight} !important;
    }
    button:hover, [role="button"]:hover {
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
  function injectCSS() {
    const style = document.createElement('style');
    style.id = 'nba-dark-mode-css';
    style.textContent = CSS;
    (document.head || document.documentElement).appendChild(style);
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

  function scanElements() {
    const all = document.querySelectorAll('*');
    for (const el of all) {
      if (isPreservedElement(el)) continue;

      try {
        const computed = getComputedStyle(el);
        const bg = computed.backgroundColor;
        if (!bg || bg === 'transparent' || bg === 'rgba(0, 0, 0, 0)') continue;

        const color = parseColor(bg);
        if (!color) continue;

        const replacement = getDarkReplacement(el, color);
        if (replacement) {
          el.style.setProperty('background-color', replacement, 'important');
        }

        // Fix text color if it's dark on our dark bg
        const fg = parseColor(computed.color);
        if (fg && luminance(fg) < 80) {
          el.style.setProperty('color', COLORS.text, 'important');
        }
      } catch (e) {
        // Skip elements that can't be styled
      }
    }
  }

  // ── MutationObserver for SPA navigation ────────────────────
  let scanTimeout = null;
  function debouncedScan() {
    if (scanTimeout) clearTimeout(scanTimeout);
    scanTimeout = setTimeout(scanElements, 150);
  }

  let observer = null;

  function startObserver() {
    if (observer) return;
    observer = new MutationObserver((mutations) => {
      let shouldScan = false;
      for (const m of mutations) {
        if (m.addedNodes.length > 0) { shouldScan = true; break; }
        if (m.type === 'attributes' && m.attributeName === 'class') { shouldScan = true; break; }
      }
      if (shouldScan) debouncedScan();
    });
    observer.observe(document.body, {
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
