const path = require("path");
const sassTrue = require("sass-true");

sassTrue.runSass({ describe, it }, path.resolve(__dirname, "test.scss"));
