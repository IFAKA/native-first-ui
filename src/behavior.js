const initializedRoots = new WeakSet();

function closeOpenMenus(root, except = null) {
  root.querySelectorAll(".nf-navigation details[open]").forEach((menu) => {
    if (!except || !except.contains(menu)) menu.removeAttribute("open");
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
      if (summary) closeOpenMenus(root, summary.closest("details"));
    } else {
      closeOpenMenus(root);
    }

    const dialog = target.closest("dialog[open]");
    if (dialog && target === dialog) dialog.close("dismiss");
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
