// Saves options to chrome.storage
const saveOptions = () => {
  const queryParams = document.getElementById('queryParams').value;

  chrome.storage.sync.set(
    { queryParams: queryParams },
    () => {
      // Update status to let user know options were saved.
      const status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(() => {
        status.textContent = '';
      }, 750);
    }
  );
};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
  chrome.storage.sync.get(
    { queryParams: "?q=is%3Apr+is%3Aopen+team-review-requested%3Asky-uk%2Fds-coolcats" },
    (items) => {
      document.getElementById('queryParams').value = items.queryParams;
    }
  );
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);