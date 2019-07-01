const glob = require("glob");
const fs = require("fs");

const StaticMaps = require("staticmaps");
const options = {
  width: 1000,
  height: 1000,
  tileUrl:
    "https://d.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}{r}.png"
};
const map = new StaticMaps(options);
const zoom = 18;

glob("data/*.json", function(err, files) {
  files.forEach(function(file) {
    fs.readFile(file, "utf8", function(err, data) {
      const obj = JSON.parse(data);
      const center = [obj.location.lng, obj.location.lat];
      map
        .render(center, zoom)
        .then(() => map.image.save(`static/maps/${obj.slug}.png`))
        .then(() => console.log(`${obj.name} Saved!`))
        .catch(function(err) {
          console.log(err);
        });
    });
  });
});
