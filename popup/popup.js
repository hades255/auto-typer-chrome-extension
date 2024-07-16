console.log("this is popup");

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("bid").focus();

  document.getElementById("fillbid").addEventListener("click", function () {
    const bid = document.getElementById("bid").value;

    // Send a message to the content script with the email
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: fillBid,
        args: [bid],
      });
    });
  });

  function fillBid(bid) {
    const activeElement = document.activeElement;

    function simulateKeyPress(element, text, index) {
      if (index < text.length) {
        const char = text[index];
        element.value += char;

        const eventOptions = {
          key: char,
          char: char,
          keyCode: char.charCodeAt(0),
        };
        const keyDownEvent = new KeyboardEvent("keydown", eventOptions);
        const keyUpEvent = new KeyboardEvent("keyup", eventOptions);
        element.dispatchEvent(keyDownEvent);
        element.dispatchEvent(keyUpEvent);

        setTimeout(() => simulateKeyPress(element, text, index + 1), 20); // adjust delay as needed
      } else {
        const inputEvent = new Event("input", { bubbles: true });
        element.dispatchEvent(inputEvent);
      }
    }

    if (
      activeElement &&
      (activeElement.tagName === "INPUT" ||
        activeElement.tagName === "TEXTAREA")
    ) {
      simulateKeyPress(activeElement, bid, 0);
    } else {
      console.error("No input or textarea element is currently focused.");
    }
  }
});
