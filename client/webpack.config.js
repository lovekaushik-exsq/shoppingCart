const path = require("path");

module.exports = {
  mode: "none",
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: [path.resolve(__dirname, "./src")],
        use: "ts-loader",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts", ".json"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./public"),
  },
};
