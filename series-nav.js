(function() {
  const links = [{"title": "Introduction", "href": "index.html", "filename": "index.html"}, {"title": "Endurant vs. Perdurant", "href": "endurant-vs-perdurant.html", "filename": "endurant-vs-perdurant.html"}, {"title": "From Clear Flows to Complex Systems", "href": "endurants-and-perdurants-across-types-of-systems.html", "filename": "endurants-and-perdurants-across-types-of-systems.html"}, {"title": "Static vs. Dynamic Optimization", "href": "static-vs-dynamic-optimization.html", "filename": "static-vs-dynamic-optimization.html"}, {"title": "RAG Status, Endurants, and Perdurants", "href": "rag-status-endurants-and-perdurants.html", "filename": "rag-status-endurants-and-perdurants.html"}, {"title": "Containers vs. Anchors", "href": "containers-vs-anchors.html", "filename": "containers-vs-anchors.html"}, {"title": "The Limits of Cascades", "href": "limits-of-cascades.html", "filename": "limits-of-cascades.html"}, {"title": "Métis vs. Legibility", "href": "metis-vs-legibility.html", "filename": "metis-vs-legibility.html"}, {"title": "Case Study: Event Storming Perdurants", "href": "case-study-event-storming-perdurants.html", "filename": "case-study-event-storming-perdurants.html"}, {"title": "Theoretical SDLC vs. Real SDLC(s)", "href": "theoretical-sdlc-vs-real-sdlcs.html", "filename": "theoretical-sdlc-vs-real-sdlcs.html"}, {"title": "Transformation Journey as Ontology Shifts", "href": "transformation-journey-as-ontology-shifts.html", "filename": "transformation-journey-as-ontology-shifts.html"}, {"title": "Coupling, Legibility, and Métis", "href": "coupling-legibility-and-metis.html", "filename": "coupling-legibility-and-metis.html"}, {"title": "Factors Shaping Legibility and Métis", "href": "factors-shaping-legibility-and-metis.html", "filename": "factors-shaping-legibility-and-metis.html"}, {"title": "Will It Scale?", "href": "will-it-scale.html", "filename": "will-it-scale.html"}, {"title": "Context Is Not Just Transmitted", "href": "context-is-not-just-transmitted.html", "filename": "context-is-not-just-transmitted.html"}, {"title": "AI Opportunities (and Caveats)", "href": "ai-opportunities-and-caveats.html", "filename": "ai-opportunities-and-caveats.html"}, {"title": "Twelve Practical Moves", "href": "twelve-practical-moves.html", "filename": "twelve-practical-moves.html"}, {"title": "Glossary", "href": "glossary.html", "filename": "glossary.html"}];
  const root = document.getElementById("series-nav-root");
  if (!root || !links.length) return;

  const current = decodeURIComponent(window.location.pathname.split("/").pop() || "");

  function escapeHtml(value) {
    return value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function renderLink(label, title, href) {
    return `<a href="${escapeHtml(href)}" class="inline-flex min-w-0 items-center gap-2 text-sm text-slate-600 transition hover:text-slate-950">
      <span class="shrink-0 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">${label}</span>
      <span class="min-w-0 truncate font-medium text-slate-800">${escapeHtml(title)}</span>
    </a>`;
  }

  let currentIndex = links.findIndex((link) => link.filename === current);
  if (currentIndex === -1) currentIndex = 0;

  const currentLink = links[currentIndex];
  const previousLink = currentIndex > 0 ? links[currentIndex - 1] : null;
  const nextLink = currentIndex < links.length - 1 ? links[currentIndex + 1] : null;

  const options = links.map((link, index) => {
    const selected = index === currentIndex ? " selected" : "";
    return `<option value="${escapeHtml(link.href)}"${selected}>${escapeHtml(link.title)}</option>`;
  }).join("");
  let sideNavHtml = "";
  if (previousLink || nextLink) {
    const previousHtml = previousLink ? renderLink("Previous", previousLink.title, previousLink.href) : "";
    const nextHtml = nextLink ? renderLink("Next", nextLink.title, nextLink.href) : "";
    const separatorHtml = previousLink && nextLink
      ? '<span class="hidden text-slate-300 sm:inline">|</span>'
      : "";
    sideNavHtml = `<div class="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
        ${previousHtml}
        ${separatorHtml}
        ${nextHtml}
      </div>`;
  }

  root.innerHTML = `<div class="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div class="flex min-w-0 items-center gap-3">
        <span class="shrink-0 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Jump:</span>
        <label class="block min-w-0 flex-1 lg:w-80">
          <span class="sr-only">Jump to article</span>
          <select id="series-nav-select" class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none ring-0 transition focus:border-sky-500">
            ${options}
          </select>
        </label>
      </div>
      ${sideNavHtml}
    </div>`;

  const select = document.getElementById("series-nav-select");
  if (select) {
    select.addEventListener("change", (event) => {
      const href = event.target.value;
      if (!href) return;
      window.location.href = href;
    });
  }
})();
