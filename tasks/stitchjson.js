"use strict";
const fs = require("fs");
const glob = require("glob");

let json = [];

glob("data/**/*.json", (error, files) => {
  files.reverse().forEach(filename => {
    const contents = JSON.parse(fs.readFileSync(filename, "utf8"));
    json = json.concat(contents);
  });
  console.log(json);
  fs.writeFileSync("data.json", JSON.stringify(json));
});
