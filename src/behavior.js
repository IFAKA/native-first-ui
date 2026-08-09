const initializedRoots = new WeakSet();

function closeOpenMenus(root, except = null) {
  root.querySelectorAll(".nf-navigation details[open]").forEach((menu) => {
    if (!except || !except.contains(menu)) menu.removeAttribute("open");
  });
  root.querySelectorAll(".nf-navigation [popover]").forEach((menu) => {
    if (!except || !except.contains(menu)) {
      try { menu.hidePopover(); } catch {}
    }
  });
}

export function enhanceNativeInteractions(root = document) {
  if (initializedRoots.has(root)) return;
  initializedRoots.add(root);

  root.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;

    const navigation = target.closest(".nf-navigation");
    if (navigation) {
      const summary = target.closest("summary");
      const invoker = target.closest("[interestfor]");
      if (summary) closeOpenMenus(root, summary.closest("details"));
      if (invoker) closeOpenMenus(root, invoker);
    } else {
      closeOpenMenus(root);
    }

    const dialog = target.closest("dialog[open]");
    if (dialog && target === dialog) dialog.close("dismiss");
  });

  root.addEventListener("pointerover", (event) => {
    if (event.pointerType && event.pointerType !== "mouse" && event.pointerType !== "pen") return;
    const target = event.target instanceof Element ? event.target : null;
    const summary = target?.closest(".nf-navigation summary");
    const menu = summary?.closest("details");
    const invoker = target?.closest(".nf-navigation [interestfor]");
    const popover = invoker && root.querySelector(`#${CSS.escape(invoker.getAttribute("interestfor"))}`);
    if (menu) {
      menu.setAttribute("open", "");
      closeOpenMenus(root, menu);
    } else if (popover?.showPopover) {
      popover.showPopover({ source: invoker });
      closeOpenMenus(root, popover);
    }
  });

  root.addEventListener("pointerout", (event) => {
    if (event.pointerType && event.pointerType !== "mouse" && event.pointerType !== "pen") return;
    const target = event.target instanceof Element ? event.target : null;
    const navigation = target?.closest(".nf-navigation");
    const next = event.relatedTarget instanceof Node ? event.relatedTarget : null;
    if (navigation && (!next || !navigation.contains(next))) closeOpenMenus(root);
  });

  root.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    const openMenus = [...root.querySelectorAll(".nf-navigation details[open]")];
    const menu = openMenus.at(-1);
    if (!menu) return;
    event.preventDefault();
    menu.removeAttribute("open");
    menu.querySelector("summary")?.focus();
  });
}
