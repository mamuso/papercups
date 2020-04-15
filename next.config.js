const data = require("./data/data.json");
const withImages = require("next-images");

module.exports = withImages({
  exportPathMap: async function () {
    const pages = data.reduce(
      (pages, cup) =>
        Object.assign({}, pages, {
          [`/pour/${cup.slug}`]: {
            page: "/cup",
            query: { slug: cup.slug },
          },
        }),
      {}
    );

    // combine the map of post pages with the home
    return Object.assign({}, pages, {
      "/": { page: "/" },
      "/map": { page: "/map" },
    });
  },
});
