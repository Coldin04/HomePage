export default function(eleventyConfig) {
  eleventyConfig.setInputDirectory("content");
  eleventyConfig.setIncludesDirectory("../templates");
  eleventyConfig.setOutputDirectory("dist");
  eleventyConfig.setTemplateFormats(["md", "njk"]);

  eleventyConfig.addPassthroughCopy({
    public: "."
  });

  eleventyConfig.addShortcode("iconLink", function(iconClass, label, href, className = "") {
    const escapeAttr = (value = "") =>
      String(value)
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    const escapeHtml = (value = "") =>
      String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    const rawHref = String(href || "");
    const isExternal = /^https?:\/\//i.test(rawHref);
    const isRelative = /^\/(?!\/)/.test(rawHref);
    const safeHref = isExternal || isRelative ? rawHref : "#";
    const safeIconClass = escapeAttr(iconClass);
    const safeClassName = escapeAttr(className);
    const safeLabel = String(label || "");
    const text = safeLabel ? `&nbsp;${escapeHtml(safeLabel)}` : "";
    const extraClass = safeClassName ? ` class="${safeClassName}"` : "";
    const targetAttrs = isExternal ? ` target="_blank" rel="noopener noreferrer"` : "";
    const ariaLabel = safeLabel ? "" : ` aria-label="${escapeAttr(safeHref)}"`;
    return `<a href="${escapeAttr(safeHref)}"${targetAttrs}${extraClass}${ariaLabel}><i class="${safeIconClass}" aria-hidden="true"></i>${text}</a>`;
  });

  eleventyConfig.addPairedShortcode("listRow", function(content) {
    return `<div class="list-container"><div class="list-row">${content}</div></div>`;
  });

  return {
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
}
