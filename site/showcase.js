const saveButton = document.querySelector("[data-demo-save]");
const saveStatus = document.querySelector("[data-demo-save-status]");
saveButton?.addEventListener("click", () => {
  saveButton.textContent = "Saved";
  saveButton.dataset.variant = "secondary";
  if (saveStatus) saveStatus.textContent = "Changes saved successfully.";
});

const demoForm = document.querySelector("[data-demo-form]");
const formStatus = demoForm?.querySelector("[data-demo-form-status]");
demoForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!demoForm.reportValidity()) return;
  if (formStatus) formStatus.textContent = "Thanks — your preferences are ready to send.";
});

const range = document.querySelector("[data-demo-range]");
const rangeOutput = document.querySelector("[data-demo-range-output]");
range?.addEventListener("input", () => {
  if (rangeOutput) rangeOutput.value = range.value;
});
