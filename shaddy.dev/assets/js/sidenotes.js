// Show footnotes as sidenotes in the right margin when there is room for them.
// The regular footnote list stays in place for narrow screens and feed readers.
(() => {
    const article = document.querySelector(".wrapper.post article");
    const footnotes = article && article.querySelector(".footnotes");
    if (!footnotes) return;

    const wide = window.matchMedia("(min-width: 1250px)");
    const gap = 12; // minimum vertical space between two sidenotes
    let notes = [];

    const build = () => {
        notes = [...article.querySelectorAll("a.footnote-ref")].flatMap((ref) => {
            const item = footnotes.querySelector(`li[id="${CSS.escape(ref.hash.slice(1))}"]`);
            if (!item) return [];
            const note = document.createElement("aside");
            note.className = "sidenote";
            note.innerHTML = item.innerHTML;
            note.querySelectorAll(".footnote-backref").forEach((el) => el.remove());
            (note.querySelector("p") || note).insertAdjacentHTML(
                "afterbegin",
                `<span class="sidenote-number">${ref.textContent}</span>`,
            );
            article.appendChild(note);
            return [{ ref, note }];
        });
    };

    const layout = () => {
        const top = article.getBoundingClientRect().top;
        let minTop = 0;
        for (const { ref, note } of notes) {
            const wanted = ref.getBoundingClientRect().top - top;
            const placed = Math.max(wanted, minTop);
            note.style.top = `${placed}px`;
            minTop = placed + note.offsetHeight + gap;
        }
    };

    const update = () => {
        article.classList.toggle("has-sidenotes", wide.matches);
        if (!wide.matches) return;
        if (!notes.length) build();
        layout();
    };

    // With the list hidden, clicking a footnote number highlights its sidenote instead
    article.addEventListener("click", (event) => {
        const ref = event.target.closest("a.footnote-ref");
        if (!ref || !wide.matches) return;
        const entry = notes.find((n) => n.ref === ref);
        if (!entry) return;
        event.preventDefault();
        entry.note.classList.remove("flash");
        void entry.note.offsetWidth; // restart the animation
        entry.note.classList.add("flash");
    });

    wide.addEventListener("change", update);
    new ResizeObserver(() => wide.matches && layout()).observe(article);
    update();
})();
