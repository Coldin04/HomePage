export default function(eleventyConfig) {
  eleventyConfig.setInputDirectory("content");
  eleventyConfig.setIncludesDirectory("../templates");
  eleventyConfig.setOutputDirectory("dist");
  eleventyConfig.setTemplateFormats(["md", "njk"]);

  eleventyConfig.addPassthroughCopy({
    public: "."
  });

  eleventyConfig.addShortcode("iconLink", function(iconClass, label, href, className = "") {
    const text = label ? `&nbsp;${label}` : "";
    const extraClass = className ? ` class="${className}"` : "";
    return `<a href="${href}" target="_blank"${extraClass}><i class="${iconClass}"></i>${text}</a>`;
  });

  eleventyConfig.addPairedShortcode("listRow", function(content) {
    return `<div class="list-container"><div class="list-row">${content}</div></div>`;
  });

  return {
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
}
