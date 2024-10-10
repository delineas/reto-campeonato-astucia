chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "trackPrice",
        title: "Track Price on Amazon",
        contexts: ["page"],
        documentUrlPatterns: ["*://*.amazon.com/*", "*://*.amazon.es/*"],
    });

    chrome.storage.sync.set({
      apiUrl: "https://amazon-price-tracker-malandriner.test/api",
    });

});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "trackPrice") {
        chrome.tabs.sendMessage(tab.id, { action: "getProductUrl" });
    }
});
