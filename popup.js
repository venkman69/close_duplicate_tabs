async function findAndCloseDuplicates() {
  const statusDiv = document.getElementById('status');

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
    for (const tabIds of urlMap.values()) {
      if (tabIds.length > 1) {
        // Keep the last tab, and add the rest to the list of tabs to close
        tabsToClose.push(...tabIds.slice(0, -1));
      }
    }

    // Close the identified tabs in a single operation
    if (tabsToClose.length > 0) {
      await chrome.tabs.remove(tabsToClose);
      statusDiv.textContent = `Closed ${tabsToClose.length} tab(s).`;
    } else {
      statusDiv.textContent = 'No duplicates found.';
    }
  } catch (error) {
    console.error('Error closing duplicate tabs:', error);
    statusDiv.textContent = 'An error occurred.';
  } finally {
    // Close the popup automatically after 2 seconds
    setTimeout(() => window.close(), 2000);
  }
}

document.addEventListener('DOMContentLoaded', findAndCloseDuplicates);
