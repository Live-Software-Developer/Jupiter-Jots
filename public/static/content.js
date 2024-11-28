(() => {
    // if (!window.hasRunContentScript) {
    //     window.hasRunContentScript = true;

        // Fetch meta tags
        const descriptionMetaTag = document.querySelector('meta[name="description"]');
        const description = descriptionMetaTag ? descriptionMetaTag.content : null;

        const ogImageMetaTag = document.querySelector('meta[property="og:image"]');
        const ogImage = ogImageMetaTag ? ogImageMetaTag.content : null;

        // Send data back to the extension
        chrome.runtime.sendMessage({ description, ogImage }).then(() => {
            console.log("Sent");
        });
    // }
})();
