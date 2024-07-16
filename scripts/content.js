console.log("content.js");
const specialInput = document.querySelector("#email-login"); // Replace with your actual selector

console.log(specialInput);
if (specialInput) {
  specialInput.addEventListener("focus", () => {
    console.log("Special input is focused!");
  });

  specialInput.addEventListener("blur", () => {
    console.log("Special input lost focus.");
  });
}
