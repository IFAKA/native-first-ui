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

const layoutPreview = document.querySelector("[data-layout-preview]");
const layoutStatus = document.querySelector("[data-layout-status]");
document.querySelectorAll('input[name="layout-preview"]').forEach((control) => {
  control.addEventListener("change", () => {
    if (!layoutPreview || !control.checked) return;
    layoutPreview.classList.remove("nf-stack", "nf-cluster", "nf-grid");
    layoutPreview.classList.add(`nf-${control.value}`);
    if (layoutStatus) layoutStatus.textContent = `${control.value[0].toUpperCase()}${control.value.slice(1)} preview active.`;
  });
});

const archiveButton = document.querySelector("[data-demo-archive]");
const actionsStatus = document.querySelector("[data-demo-actions-status]");
archiveButton?.addEventListener("click", () => {
  const archived = archiveButton.dataset.archived === "true";
  archiveButton.dataset.archived = String(!archived);
  archiveButton.textContent = archived ? "Undo archive" : "Archive draft";
  archiveButton.dataset.variant = archived ? "" : "secondary";
  if (actionsStatus) actionsStatus.textContent = archived ? "Draft restored to the active list." : "Draft moved to Archived. Choose Undo archive to restore it.";
  archiveButton.closest("[popover]")?.hidePopover?.();
});
