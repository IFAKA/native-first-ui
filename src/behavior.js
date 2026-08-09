const initializedRoots = new WeakSet();
const menuStates = new WeakMap();

function closeOpenMenus(root, except = null) {
  root.querySelectorAll(".nf-navigation details[open]").forEach((menu) => {
    if (!except || !except.contains(menu)) menu.removeAttribute("open");
  });
  root.querySelectorAll(".nf-navigation [popover]").forEach((menu) => {
    if (!except || !except.contains(menu)) {
      try { menu.hidePopover(); } catch {}
      menu.style.removeProperty("top");
      menu.style.removeProperty("left");
      menu.style.removeProperty("position");
    }
  });
}

function getMenuPopover(root, invoker) {
  const id = invoker.getAttribute("data-menu-target");
  if (!id) return null;
  return root.querySelector(`#${CSS.escape(id)}`);
}

function showMenuPopover(root, invoker) {
  const popover = getMenuPopover(root, invoker);
  if (!popover?.showPopover) return null;
  try {
    if (!popover.matches(":popover-open")) popover.showPopover({ source: invoker });
  } catch {
    try { popover.showPopover(); } catch { return null; }
  }

  const trigger = invoker.getBoundingClientRect();
  const nested = invoker.closest("[popover]");
  const menu = popover.getBoundingClientRect();
  const gap = 8;
  let left = nested ? trigger.right + gap : trigger.left;
  let top = nested ? trigger.top : trigger.bottom + gap;
  left = Math.max(gap, Math.min(left, window.innerWidth - menu.width - gap));
  top = Math.max(gap, Math.min(top, window.innerHeight - menu.height - gap));
  popover.style.position = "fixed";
  popover.style.left = `${left}px`;
  popover.style.top = `${top}px`;
  return popover;
}

function clearMenuTimers(root) {
  const state = menuStates.get(root);
  if (!state) return;
  clearTimeout(state.open);
  clearTimeout(state.close);
  state.open = null;
  state.close = null;
}

function openMenuSoon(root, invoker) {
  const state = menuStates.get(root) ?? { open: null, close: null };
  menuStates.set(root, state);
  clearTimeout(state.open);
  clearTimeout(state.close);
  state.open = setTimeout(() => {
    const popover = showMenuPopover(root, invoker);
    if (popover) closeOpenMenus(root, popover);
  }, 120);
}

function closeMenusSoon(root) {
  const state = menuStates.get(root) ?? { open: null, close: null };
  menuStates.set(root, state);
  clearTimeout(state.open);
  clearTimeout(state.close);
  state.close = setTimeout(() => closeOpenMenus(root), 180);
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
      const invoker = target.closest("[data-menu-target]");
      if (summary) closeOpenMenus(root, summary.closest("details"));
      if (invoker) closeOpenMenus(root, invoker);
      if (!summary && !invoker && !target.closest("[popover]")) closeOpenMenus(root);
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
    const invoker = target?.closest(".nf-navigation [data-menu-target]");
    if (menu) {
      menu.setAttribute("open", "");
      closeOpenMenus(root, menu);
    } else if (invoker) {
      openMenuSoon(root, invoker);
    } else if (!target?.closest("[popover]")) {
      closeOpenMenus(root);
    }
  });

  root.addEventListener("focusin", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const invoker = target?.closest(".nf-navigation [data-menu-target]");
    if (invoker) {
      clearMenuTimers(root);
      const popover = showMenuPopover(root, invoker);
      if (popover) closeOpenMenus(root, popover);
    } else if (!target?.closest("[popover]")) {
      closeOpenMenus(root);
    }
  });

  root.addEventListener("pointerout", (event) => {
    if (event.pointerType && event.pointerType !== "mouse" && event.pointerType !== "pen") return;
    const target = event.target instanceof Element ? event.target : null;
    const navigation = target?.closest(".nf-navigation");
    const next = event.relatedTarget instanceof Node ? event.relatedTarget : null;
    const insidePopover = next && [...navigation?.querySelectorAll("[popover]") ?? []].some((popover) => popover.contains(next));
    if (navigation && (!next || (!navigation.contains(next) && !insidePopover))) closeMenusSoon(root);
    else clearMenuTimers(root);
  });

  root.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    clearMenuTimers(root);
    const openMenus = [...root.querySelectorAll(".nf-navigation details[open]")];
    const openPopovers = [...root.querySelectorAll(".nf-navigation [popover]")].filter((popover) => {
      try { return popover.matches(":popover-open"); } catch { return false; }
    });
    const menu = openMenus.at(-1) ?? openPopovers.at(-1);
    if (!menu) return;
    event.preventDefault();
    if (menu.matches("details")) {
      menu.removeAttribute("open");
      menu.querySelector("summary")?.focus();
    } else {
      const trigger = root.querySelector(`[data-menu-target="${CSS.escape(menu.id)}"]`);
      menu.hidePopover();
      trigger?.focus();
    }
  });
}
