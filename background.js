// background.js — Service worker for NBA Dark Mode

// Initialize default storage on install
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get({ darkModeEnabled: true }, (data) => {
    if (data.darkModeEnabled === undefined) {
      chrome.storage.sync.set({ darkModeEnabled: true });
    }
  });
});
