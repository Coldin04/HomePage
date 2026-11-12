document.querySelectorAll(".friend-avatar img").forEach((image) => {
    const showFallback = () => {
        image.closest(".friend-avatar").classList.add("friend-avatar-image-failed");
    };

    image.addEventListener("error", showFallback);
    if (image.complete && image.naturalWidth === 0) {
        showFallback();
    }
});

const nativePopover = "popover" in HTMLElement.prototype;
const fallbackPopovers = [];

document.querySelectorAll(".friend-card").forEach((card) => {
    const description = card.querySelector(".friend-description");
    const button = card.querySelector(".friend-description-tooltip-toggle");
    const popover = card.querySelector(".friend-description-popover");
    let pinned = false;
    const isOpen = () => nativePopover
        ? popover.matches(":popover-open")
        : card.classList.contains("friend-card-tooltip-open");

    const position = () => {
        const rect = card.getBoundingClientRect();
        const width = Math.min(352, rect.width - 24, window.innerWidth - 16);
        popover.style.setProperty("--popover-width", `${width}px`);
        popover.style.setProperty("--popover-left", `${Math.max(8, Math.min(rect.right - width - 12, window.innerWidth - width - 8))}px`);
        const above = rect.top - popover.offsetHeight - 6;
        const top = above >= 8 ? above : rect.bottom + 6;
        popover.style.setProperty("--popover-top", `${Math.max(8, Math.min(top, window.innerHeight - popover.offsetHeight - 8))}px`);
    };

    const close = () => {
        pinned = false;
        if (nativePopover && isOpen()) popover.hidePopover();
        card.classList.remove("friend-card-tooltip-open");
        button.setAttribute("aria-expanded", "false");
    };

    const open = () => {
        if (nativePopover) {
            if (!isOpen()) popover.showPopover();
            position();
        } else {
            card.classList.add("friend-card-tooltip-open");
        }
        button.setAttribute("aria-expanded", "true");
    };

    if (nativePopover) {
        popover.setAttribute("data-native-popover", "");
        popover.addEventListener("toggle", () => {
            const visible = isOpen();
            button.setAttribute("aria-expanded", String(visible));
            if (!visible) pinned = false;
        });
    } else {
        popover.removeAttribute("popover");
        fallbackPopovers.push({card, close});
    }

    // The entire card is the hover/focus target; the arrow remains a touch toggle.
    card.addEventListener("pointerenter", (event) => {
        if (event.pointerType === "mouse") open();
    });
    card.addEventListener("pointerleave", () => {
        if (!pinned && !card.contains(document.activeElement)) close();
    });
    card.addEventListener("focusin", open);
    card.addEventListener("focusout", () => {
        requestAnimationFrame(() => {
            if (!pinned && !card.matches(":hover") && !card.contains(document.activeElement)) close();
        });
    });
    button.addEventListener("click", () => {
        if (pinned) close();
        else { pinned = true; open(); }
    });

    description.classList.add("friend-description-truncated");
    const update = () => {
        const truncated = description.scrollHeight > description.clientHeight + 1;
        if (!truncated) close();
        button.hidden = !truncated;
        if (nativePopover && isOpen()) position();
    };
    new ResizeObserver(update).observe(description);
    window.addEventListener("scroll", () => { if (nativePopover && isOpen()) position(); }, {passive: true});
    update();
});

// Older browsers retain the same outside-click and Escape dismissal behavior.
if (!nativePopover) {
    document.addEventListener("click", (event) => {
        fallbackPopovers.forEach(({card, close}) => {
            if (!card.contains(event.target)) close();
        });
    });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") fallbackPopovers.forEach(({close}) => close());
    });
}
