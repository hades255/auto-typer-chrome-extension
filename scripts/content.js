const specialInput = document.querySelector("#special-input-id"); // Replace with your actual selector

if (specialInput) {
  specialInput.addEventListener("focus", () => {
    console.log("Special input is focused!");
  });

  specialInput.addEventListener("blur", () => {
    console.log("Special input lost focus.");
  });
}
