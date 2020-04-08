const path = require("path");
const sass = require("sass");
const sassTrue = require("sass-true");

sassTrue.runSass(
  { file: path.resolve(__dirname, "test.scss") },
  { sass, describe, it }
);
