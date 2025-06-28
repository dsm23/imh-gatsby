/**
 *  @type {import("prettier").Options}
 */
const config = {
  plugins: ["prettier-plugin-css-order", "prettier-plugin-astro"],
  cssDeclarationSorterOrder: "smacss",
};

export default config;
