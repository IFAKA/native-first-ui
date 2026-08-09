const initializedRoots = new WeakSet();

function getRootElements(root, selector) {
  return root.matches?.(selector) ? [root, ...root.querySelectorAll(selector)] : [...root.querySelectorAll(selector)];
}

function enhanceTabs(root) {
  getRootElements(root, '[data-nf-tabs]').forEach((tabs) => {
    const tablist = tabs.querySelector('[role="tablist"]');
    const tabItems = [...tabs.querySelectorAll('[role="tab"]')];
    const panels = [...tabs.querySelectorAll('[role="tabpanel"]')];
    if (!tablist || !tabItems.length || tabs.dataset.nfTabsReady) return;
    tabs.dataset.nfTabsReady = "true";
    const select = (tab, moveFocus = false) => {
      tabItems.forEach((item) => {
        const selected = item === tab;
        item.setAttribute("aria-selected", String(selected));
        item.tabIndex = selected ? 0 : -1;
      });
      panels.forEach((panel) => { panel.hidden = panel.id !== tab.getAttribute("aria-controls"); });
      if (moveFocus) tab.focus();
    };
    tablist.addEventListener("click", (event) => {
      const tab = event.target.closest('[role="tab"]');
      if (tab) select(tab);
    });
    tablist.addEventListener("keydown", (event) => {
      const index = tabItems.indexOf(event.target);
      if (index < 0) return;
      let next = index;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % tabItems.length;
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + tabItems.length) % tabItems.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = tabItems.length - 1;
      if (next !== index) { event.preventDefault(); select(tabItems[next], true); }
      if (event.key === "Enter" || event.key === " ") { event.preventDefault(); select(event.target); }
    });
    select(tabItems.find((tab) => tab.getAttribute("aria-selected") === "true") ?? tabItems[0]);
  });
}

function enhanceComboboxes(root) {
  getRootElements(root, '[data-nf-combobox]').forEach((combobox) => {
    const input = combobox.querySelector('input[list]');
    const list = input && document.getElementById(input.getAttribute("list"));
    if (!input || !list || combobox.dataset.nfComboboxReady) return;
    combobox.dataset.nfComboboxReady = "true";
    const options = [...list.querySelectorAll("option")];
    const filter = () => {
      const query = input.value.trim().toLowerCase();
      options.forEach((option) => { option.hidden = query.length > 0 && !option.value.toLowerCase().includes(query); });
      const status = combobox.querySelector('[data-nf-combobox-status]');
      if (status) status.textContent = `${options.filter((option) => !option.hidden).length} suggestions available.`;
    };
    input.addEventListener("input", filter);
    input.addEventListener("focus", filter);
  });
}

function enhanceCommandPalette(root) {
  getRootElements(root, '[data-nf-command-palette]').forEach((palette) => {
    const input = palette.querySelector("input");
    if (!input || palette.dataset.nfCommandReady) return;
    palette.dataset.nfCommandReady = "true";
    const getItems = () => [...palette.querySelectorAll("[data-nf-command-item], [role='option']")];
    const dialog = palette.closest("dialog");
    const visibleItems = () => getItems().filter((item) => !item.hidden);
    const focusItem = (index) => {
      const visible = visibleItems();
      if (!visible.length) return;
      visible[(index + visible.length) % visible.length].focus();
    };
    input.addEventListener("input", () => {
      const query = input.value.toLowerCase();
      getItems().forEach((item) => { item.hidden = !item.textContent.toLowerCase().includes(query); });
    });
    input.addEventListener("keydown", (event) => {
      if (event.key === "Escape") dialog?.close?.();
      if (event.key === "ArrowDown") { event.preventDefault(); focusItem(0); }
      if (event.key === "ArrowUp") { event.preventDefault(); focusItem(-1); }
    });
    palette.addEventListener("keydown", (event) => {
      const item = event.target.closest("[data-nf-command-item], [role='option']");
      if (!item) return;
      const visible = visibleItems();
      const index = visible.indexOf(item);
      if (event.key === "ArrowDown" || event.key === "ArrowRight") { event.preventDefault(); focusItem(index + 1); }
      if (event.key === "ArrowUp" || event.key === "ArrowLeft") { event.preventDefault(); focusItem(index - 1); }
      if (event.key === "Home") { event.preventDefault(); focusItem(0); }
      if (event.key === "End") { event.preventDefault(); focusItem(-1); }
      if (event.key === "Enter") { event.preventDefault(); item.click(); }
    });
    palette.addEventListener("click", (event) => {
      if (event.target.closest("[data-nf-command-item], [role='option']")) dialog?.close?.();
    });
  });
}

function enhancePressableStates(root) {
  getRootElements(root, '[aria-pressed]').forEach((control) => {
    if (control.dataset.nfPressedReady) return;
    control.dataset.nfPressedReady = "true";
    control.addEventListener("click", () => {
      const next = control.getAttribute("aria-pressed") !== "true";
      control.setAttribute("aria-pressed", String(next));
      const group = control.closest('[role="group"]');
      if (group?.dataset.nfSingleSelect === "true" && next) {
        group.querySelectorAll('[aria-pressed="true"]').forEach((peer) => {
          if (peer !== control) peer.setAttribute("aria-pressed", "false");
        });
      }
    });
  });
}

function enhanceOtp(root) {
  getRootElements(root, '[data-nf-otp]').forEach((group) => {
    if (group.dataset.nfOtpReady) return;
    group.dataset.nfOtpReady = "true";
    const inputs = [...group.querySelectorAll("input")];
    inputs.forEach((input, index) => {
      input.addEventListener("input", () => {
        input.value = input.value.replace(/\\D/g, "").slice(-1);
        if (input.value && inputs[index + 1]) inputs[index + 1].focus();
      });
      input.addEventListener("keydown", (event) => {
        if (event.key === "Backspace" && !input.value && inputs[index - 1]) inputs[index - 1].focus();
      });
      input.addEventListener("paste", (event) => {
        const value = event.clipboardData?.getData("text").replace(/\\D/g, "").slice(0, inputs.length);
        if (!value) return;
        event.preventDefault();
        inputs.forEach((field, fieldIndex) => { field.value = value[fieldIndex] ?? ""; });
        inputs[Math.min(value.length, inputs.length) - 1]?.focus();
      });
    });
  });
}

function enhanceCarousels(root) {
  getRootElements(root, '[data-nf-carousel-prev], [data-nf-carousel-next]').forEach((control) => {
    if (control.dataset.nfCarouselReady) return;
    control.dataset.nfCarouselReady = "true";
    control.addEventListener("click", () => {
      const track = control.closest(".nf-carousel")?.querySelector(".nf-carousel-track");
      if (!track) return;
      const direction = control.hasAttribute("data-nf-carousel-next") ? 1 : -1;
      track.scrollBy({ left: direction * track.clientWidth * 0.82, behavior: "smooth" });
    });
  });
}

function enhanceToasts(root) {
  getRootElements(root, '[data-nf-toast][data-nf-dismiss-after]').forEach((toast) => {
    if (toast.dataset.nfToastReady) return;
    toast.dataset.nfToastReady = "true";
    const delay = Number(toast.dataset.nfDismissAfter);
    if (Number.isFinite(delay) && delay > 0) window.setTimeout(() => toast.remove(), delay);
  });
}

function enhanceThemeToggle(root) {
  getRootElements(root, '[data-nf-theme-toggle]').forEach((toggle) => {
    if (toggle.dataset.nfThemeReady) return;
    toggle.dataset.nfThemeReady = "true";
    const status = toggle.form?.querySelector('[data-nf-theme-status]') || root.querySelector('[data-nf-theme-status]');
    try { toggle.checked = localStorage.getItem("nf-theme") === "dark"; } catch {}
    const update = () => {
      const dark = toggle.checked;
      document.documentElement.dataset.theme = dark ? "dark" : "light";
      try { localStorage.setItem("nf-theme", dark ? "dark" : "light"); } catch {}
      if (status) status.textContent = `${dark ? "Dark" : "Light"} theme is active.`;
    };
    toggle.addEventListener("change", update);
    if (toggle.checked || document.documentElement.dataset.theme) update();
  });
}

function enhanceDeclarativeInvokers(root) {
  getRootElements(root, '[commandfor][command]').forEach((trigger) => {
    if ("commandForElement" in trigger || trigger.dataset.nfInvokerReady) return;
    const target = document.getElementById(trigger.getAttribute("commandfor"));
    if (!target || typeof target.showModal !== "function") return;
    trigger.dataset.nfInvokerReady = "true";
    trigger.addEventListener("click", () => {
      if (trigger.getAttribute("command") === "show-modal" && !target.open) {
        target.showModal();
        window.setTimeout(() => target.querySelector("input, button, [tabindex]")?.focus(), 0);
      }
    });
  });
}

/** Optional, dependency-free progressive enhancement for explicitly marked recipes. */
export function enhanceNativeInteractions(root = document) {
  initializedRoots.add(root);
  enhanceTabs(root);
  enhanceComboboxes(root);
  enhanceCommandPalette(root);
  enhancePressableStates(root);
  enhanceOtp(root);
  enhanceCarousels(root);
  enhanceToasts(root);
  enhanceThemeToggle(root);
  enhanceDeclarativeInvokers(root);
}

if (typeof document !== "undefined") enhanceNativeInteractions();
