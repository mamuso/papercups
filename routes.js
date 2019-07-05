const nextRoutes = require("next-routes");
const routes = (module.exports = nextRoutes());

routes.add("home", "/");
routes.add("post", "/pour/:slug");
routes.add("map", "/map");
routes.add("about", "/about");
