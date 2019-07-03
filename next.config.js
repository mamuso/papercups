const data = require("./data.json");

module.exports = {
  async exportPathMap() {
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
};
