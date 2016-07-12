const path = require("path")

const PATHS ={
  app: path.join(__dirname, "src"),
  build: path.join(__dirname, "build")
}

module.exports = {
  entry: PATHS.app,
  output: {
    path: PATHS.build,
    filename: "bundle.js",
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: "babel",
        include: PATHS.app,
        query: {
          presets: ["es2015", "react"],
        },
      },
    ],
  },
  resolve: {
    extensions: ["", ".js", ".jsx"],
  },
}
