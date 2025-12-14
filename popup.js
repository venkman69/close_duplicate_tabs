async function findAndCloseDuplicates() {
  const statusDiv = document.getElementById('status');

  try {
    // Query for all tabs across all windows
    const tabs = await chrome.tabs.query({});
    const empty_or_zoom_tabs = [];
    const tabsToClose = [];
    const urlMap = new Map();
    try{
    // Group tabs by URL
    for (const tab of tabs) {
      if (!tab.url || tab.url === 'about:blank' || tab.url === 'chrome://newtab/' || tab.url.includes('zoom')) {
        // Tabs without urls are special pages, close them
        empty_or_zoom_tabs.push(tab.id);
        continue;
      }
      // We only care about tabs with http/https urls to avoid closing special pages
      if (tab.url && (tab.url.startsWith('http:') || tab.url.startsWith('https:'))) {
        if (!urlMap.has(tab.url)) {
          urlMap.set(tab.url, []);
        }
        urlMap.get(tab.url).push(tab.id);
      }
    }
    }catch(error){
      console.error('Error grouping tabs by URL:', error);
    }

    try{
    // Identify tabs to close
    for (const tabIds of urlMap.values()) {
      if (tabIds.length > 1) {
        // Keep the last tab, and add the rest to the list of tabs to close
        tabsToClose.push(...tabIds.slice(0, -1));
      }
    }
    }catch(error){
      console.error('Error identifying tabs to close:', error);
    }

    try{
    // Close the identified tabs in a single operation
    if (tabsToClose.length > 0 || empty_or_zoom_tabs.length > 0) {
      await chrome.tabs.remove(tabsToClose);
      await chrome.tabs.remove(empty_or_zoom_tabs);
      statusDiv.textContent = `Closed ${tabsToClose.length} duplicate tab(s) and ${empty_or_zoom_tabs.length} empty or zoom tab(s).`;
    } else {
      statusDiv.textContent = 'No duplicates found.';
    }
    }catch(error){
      console.error('Error closing tabs:', error);
      statusDiv.textContent = 'An error occurred.';
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
