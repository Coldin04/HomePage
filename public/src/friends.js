document.querySelectorAll(".friend-avatar img").forEach((image) => {
    const showFallback = () => {
        image.closest(".friend-avatar").classList.add("friend-avatar-image-failed");
    };

    image.addEventListener("error", showFallback);
    if (image.complete && image.naturalWidth === 0) {
        showFallback();
    }
});

const descriptionToggles = [...document.querySelectorAll(".friend-description-tooltip-toggle")];

const updateDescriptionToggle = (button) => {
    const card = button.closest(".friend-card");
    const description = card.querySelector(".friend-description");

    card.classList.remove("friend-card-tooltip-open");
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", `查看 ${card.querySelector(".friend-name").textContent} 的完整简介`);
    button.title = "查看完整简介";
    button.hidden = description.scrollHeight <= description.clientHeight + 1;
};

const updateDescriptionToggles = () => {
    descriptionToggles.forEach(updateDescriptionToggle);
};

descriptionToggles.forEach((button) => {
    button.addEventListener("click", () => {
        const card = button.closest(".friend-card");
        const isOpen = card.classList.toggle("friend-card-tooltip-open");

        button.setAttribute("aria-expanded", String(isOpen));
    });
});

requestAnimationFrame(updateDescriptionToggles);
window.addEventListener("resize", updateDescriptionToggles);
document.addEventListener("click", (event) => {
    document.querySelectorAll(".friend-card-tooltip-open").forEach((card) => {
        if (!card.contains(event.target)) {
            card.classList.remove("friend-card-tooltip-open");
            card.querySelector(".friend-description-tooltip-toggle").setAttribute("aria-expanded", "false");
        }
    });
});
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        document.querySelectorAll(".friend-card-tooltip-open").forEach((card) => {
            card.classList.remove("friend-card-tooltip-open");
            card.querySelector(".friend-description-tooltip-toggle").setAttribute("aria-expanded", "false");
        });
    }
});
