const data = require("./data.json");
const withCSS = require("@zeit/next-css");
const withOptimizedImages = require("next-optimized-images");

module.exports = withOptimizedImages(
  withCSS({
    exportPathMap: async function() {
      const pages = data.reduce(
        (pages, cup) =>
          Object.assign({}, pages, {
            [`/pour/${cup.slug}`]: {
              page: "/Post",
              query: { slug: cup.slug }
            }
          }),
        {}
      );

      // combine the map of post pages with the home
      return Object.assign({}, pages, {
        "/": { page: "/" }
      });
    }
  })
);
