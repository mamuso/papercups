const data = require("./data/data.json");
const withCSS = require("@zeit/next-css");
const withImages = require("next-images");

module.exports = withImages(
  withCSS({
    exportPathMap: async function() {
      const pages = data.reduce(
        (pages, cup) =>
          Object.assign({}, pages, {
            [`/pour/${cup.slug}`]: {
              page: "/cup",
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
