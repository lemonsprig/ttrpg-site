document.addEventListener("DOMContentLoaded", () => {
  const article = document.querySelector("article");
  if (!article) return;

  // Helper to wrap content under heading until next heading of same or higher level
  function wrapUnderHeading(headings, heading, index, level) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("collapsible-section");

    let next = heading.nextElementSibling;
    while (
      next &&
      (!/^H[1-6]$/.test(next.tagName) || parseInt(next.tagName[1]) > level)
    ) {
      const sibling = next.nextElementSibling;
      wrapper.appendChild(next);
      next = sibling;
    }

    heading.after(wrapper);
    wrapper.style.display = "none";

    heading.classList.add("collapsible-toggle");
    heading.style.cursor = "pointer";

    heading.addEventListener("click", () => {
      const isOpen = wrapper.style.display === "block";
      wrapper.style.display = isOpen ? "none" : "block";
      heading.classList.toggle("open", !isOpen);
    });
  }

  const allHeadings = article.querySelectorAll("h2, h3, h4, h5, h6");

  // First pass: wrap H2 sections
  allHeadings.forEach((heading, index) => {
    if (heading.tagName === "H2") {
      wrapUnderHeading(allHeadings, heading, index, 2);
    }
  });

  // Second pass: wrap H4 within the now-visible structure (you can adapt to H3, H4, etc.)
  allHeadings.forEach((heading, index) => {
    if (heading.tagName === "H4") {
      wrapUnderHeading(allHeadings, heading, index, 4);
    }
  });
});
