// popup.js — Toggle logic for NBA Dark Mode

const toggle = document.getElementById('toggle');
const status = document.getElementById('status');

// Load saved state
chrome.storage.sync.get({ darkModeEnabled: true }, (data) => {
  toggle.checked = data.darkModeEnabled;
  updateStatus(data.darkModeEnabled);
});

// Handle toggle
toggle.addEventListener('change', () => {
  const enabled = toggle.checked;
  chrome.storage.sync.set({ darkModeEnabled: enabled });
  updateStatus(enabled);

  // Send message to active NBA tab
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0] && tabs[0].url && tabs[0].url.includes('nba.com')) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: 'toggle',
        enabled: enabled
      });
    }
  });
});

function updateStatus(enabled) {
  if (enabled) {
    status.textContent = '● Active';
    status.className = 'status active';
  } else {
    status.textContent = '○ Inactive';
    status.className = 'status';
  }
}
