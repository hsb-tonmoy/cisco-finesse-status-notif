// const url = "https://uccx1.tcom.wmich.edu:8445/desktop/container";

// chrome.action.onClicked.addListener(async (tab) => {
//   if (tab.url.startsWith(url)) {
//     const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
//     const nextState = prevState === "ON" ? "OFF" : "ON";

//     await chrome.action.setBadgeText({
//       tabId: tab.id,
//       text: nextState,
//     });
//     if (nextState === "ON") {
//       await chrome.scripting.executeScript({
//         target: { tabId: tab.id },
//         files: ["content_script.js"],
//       });
//     }
//   }
// });

chrome.scripting.executeScript({
  target: { tabId: tab.id },
  files: ["content_script.js"],
});
