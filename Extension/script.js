
async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

const reloadWindow = () => {
    chrome.storage.sync.get(
      { queryParams: "?q=is%3Apr+is%3Aopen+team-review-requested%3Asky-uk%2Fds-coolcats" },
      (items) => {
        window.location.href = window.location.pathname + items.queryParams;
      }
    );
  };

async function scriptExec() {
    let tab = await getCurrentTab();
    chrome.scripting
        .executeScript({
            target : {tabId : tab.id},
            func : reloadWindow,
        })
    .then(() => console.log("reloaded table"));
}

scriptExec();