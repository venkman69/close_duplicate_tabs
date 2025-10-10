chrome.action.onClicked.addListener(async (initiatingTab) => {
  try {
    // Query for all tabs across all windows
    const tabs = await chrome.tabs.query({});
    
    const urlMap = new Map();
    // Group tabs by URL
    for (const tab of tabs) {
      // We only care about tabs with http/https urls to avoid closing special pages
      if (tab.url && (tab.url.startsWith('http:') || tab.url.startsWith('https:'))) {
        if (!urlMap.has(tab.url)) {
          urlMap.set(tab.url, []);
        }
        urlMap.get(tab.url).push(tab.id);
      }
    }

    const tabsToClose = [];

    // Identify tabs to close
    for (const [url, tabIds] of urlMap.entries()) {
      if (tabIds.length > 1) {
        // Keep the last tab, and add the rest to the list of tabs to close
        const tabsToCloseForUrl = tabIds.slice(0, -1);
        tabsToClose.push(...tabsToCloseForUrl);
      }
    }

    // Close the identified tabs in a single operation
    if (tabsToClose.length > 0) {
      await chrome.tabs.remove(tabsToClose);
    }

  } catch (error) {
    console.error('Error closing duplicate tabs:', error);
  }
});