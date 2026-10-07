// Show a small preview card when hovering or focusing a link to another post or note.
// The previews come from /previews.json, which is only fetched on first use.
(() => {
    if (!window.matchMedia("(hover: hover)").matches) return;

    let index = null;
    const loadIndex = () =>
        (index ??= fetch("/previews.json")
            .then((r) => (r.ok ? r.json() : {}))
            .catch(() => ({})));

    const card = document.createElement("div");
    card.className = "link-preview";
    card.setAttribute("role", "tooltip");
    card.hidden = true;
    document.body.appendChild(card);

    let showTimer = null;
    let current = null;

    const previewPath = (link) => {
        const url = new URL(link.href, location.href);
        if (url.origin !== location.origin || url.pathname === location.pathname) return null;
        return url.pathname.endsWith("/") ? url.pathname : `${url.pathname}/`;
    };

    const place = (link) => {
        const rect = link.getBoundingClientRect();
        const width = card.offsetWidth;
        const left = Math.min(
            Math.max(8, rect.left + rect.width / 2 - width / 2),
            document.documentElement.clientWidth - width - 8,
        );
        const below = rect.bottom + 8;
        const top = below + card.offsetHeight > window.innerHeight
            ? rect.top - card.offsetHeight - 8
            : below;
        card.style.left = `${left + window.scrollX}px`;
        card.style.top = `${top + window.scrollY}px`;
    };

    const show = async (link) => {
        const path = previewPath(link);
        if (!path) return;
        const preview = (await loadIndex())[path];
        if (!preview || current !== link) return;
        card.replaceChildren();
        const title = card.appendChild(document.createElement("strong"));
        title.textContent = preview.title;
        const date = card.appendChild(document.createElement("time"));
        date.textContent = preview.date;
        if (preview.summary) {
            card.appendChild(document.createElement("p")).textContent = preview.summary;
        }
        card.hidden = false;
        place(link);
    };

    const start = (event) => {
        const link = event.target.closest("a[href]");
        if (!link || link === current || !previewPath(link)) return;
        current = link;
        clearTimeout(showTimer);
        loadIndex();
        showTimer = setTimeout(() => show(link), 350);
    };

    const stop = (event) => {
        const link = event.target.closest("a[href]");
        if (!link || link !== current) return;
        if (event.relatedTarget && link.contains(event.relatedTarget)) return;
        clearTimeout(showTimer);
        current = null;
        card.hidden = true;
    };

    const content = document.querySelector("main");
    if (!content) return;
    content.addEventListener("mouseover", start);
    content.addEventListener("mouseout", stop);
    content.addEventListener("focusin", start);
    content.addEventListener("focusout", stop);
    window.addEventListener("scroll", () => {
        clearTimeout(showTimer);
        current = null;
        card.hidden = true;
    }, { passive: true });
})();
