const SEARCH_URL = `https://translate.google.com/`;

browser.omnibox.setDefaultSuggestion({
    description: `Google Translate (e.g. en es hello)`
});

browser.omnibox.onInputEntered.addListener((text, disposition) => {
    let url = buildSearchURL(text);

    switch (disposition) {
        case "currentTab":
            browser.tabs.update({url});
            break;
        case "newForegroundTab":
            browser.tabs.create({url});
            break;
        case "newBackgroundTab":
            browser.tabs.create({url, active: false});
            break;
    }
});

function buildSearchURL(text) {
    let parts = text.split(' ');

    return `${SEARCH_URL}#${parts[0]}/${parts[1]}/${parts.slice(2).join(" ")}`;
}


