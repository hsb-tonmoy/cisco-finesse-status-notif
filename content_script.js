let audio = new Audio(chrome.runtime.getURL("beep.mp3"));

let interval;

function playBeep() {
  audio.play();
}

function stopBeep() {
  audio.pause();
}

const statusText = document.getElementById("state-text");

const config = { attributes: true, childList: true, subtree: true };

const callback = (mutationList, observer) => {
  for (const mutation of mutationList) {
    if (mutation.type === "attributes" && mutation.attributeName === "class") {
      const statusTextClasses = document.getElementById("state-text").classList;
      if (statusTextClasses.contains("yellowText")) {
        console.log("Phone down");
        interval = setInterval(playBeep, 5000);
      } else {
        clearInterval(interval);
        console.log("Phone up");
        stopBeep();
      }
    }
  }
};

let observing = false;

const observer = new MutationObserver(callback);

const parentDiv = document.getElementById("signout-area");
let notifyButton = document.createElement("button");
notifyButton.textContent = "Notify";
notifyButton.classList.add("btn");
notifyButton.classList.add("btn-default");

parentDiv.appendChild(notifyButton);

notifyButton.addEventListener("click", () => {
  if (!observing) {
    observer.observe(statusText, config);
    observing = true;
    notifyButton.textContent = "Stop Notifying";
  } else {
    observer.disconnect();
    observing = false;
    stopBeep();
    notifyButton.textContent = "Notify";
  }
});
