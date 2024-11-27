chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "GET_ACTIVE_TAB_INFO") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length > 0) {
                const activeTab = tabs[0];
                sendResponse({
                    title: activeTab.title,
                    url: activeTab.url,
                    favIconUrl: activeTab.favIconUrl
                });
            } else {
                sendResponse({ error: "No active tab found." });
            }
        });
        return true; // Keep the message channel open for asynchronous response
    }
});