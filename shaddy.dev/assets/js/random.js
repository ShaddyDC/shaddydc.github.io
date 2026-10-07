// "Random note" links pick a note from /previews.json; without JS they lead to /notes/.
(() => {
    document.addEventListener("click", async (event) => {
        const link = event.target.closest("a[data-random-note]");
        if (!link || event.ctrlKey || event.metaKey || event.shiftKey) return;
        event.preventDefault();
        try {
            const previews = await fetch("/previews.json").then((r) => r.json());
            const notes = Object.keys(previews).filter(
                (path) => path.startsWith("/notes/") && path !== location.pathname,
            );
            location.href = notes.length
                ? notes[Math.floor(Math.random() * notes.length)]
                : link.href;
        } catch {
            location.href = link.href;
        }
    });
})();
