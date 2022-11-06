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
  if (mutationList[0].type === "childList") {
    const statusTextValue = document.getElementById("state-text").textContent;
    if (
      statusTextValue === "Not Ready - Phone Failure" ||
      statusTextValue === "Not Ready - Phone Working" ||
    ) {
      interval = setInterval(playBeep, 5000);
    } else {
      clearInterval(interval);
      stopBeep();
    }
  }
};

const observer = new MutationObserver(callback);

observer.observe(statusText, config);
