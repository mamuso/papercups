"use strict";
const fs = require("fs");
const path = require("path");

const dataDir = "data";
const filePath = "data/data.json";
const tempFilePath = `${filePath}.tmp`;

const files = fs
  .readdirSync(dataDir)
  .filter((filename) => /^\d{3}-.+\.json$/.test(filename))
  .sort()
  .reverse()
  .map((filename) => path.join(dataDir, filename));

const cups = files.map((filename) => {
  const contents = JSON.parse(fs.readFileSync(filename, "utf8"));

  if (!contents.slug) {
    throw new Error(`${filename} is missing a slug`);
  }

  return contents;
});

fs.writeFileSync(tempFilePath, JSON.stringify(cups));
fs.renameSync(tempFilePath, filePath);

console.log(`Wrote ${cups.length} cups to ${filePath}`);
