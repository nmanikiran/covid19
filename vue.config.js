const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  transpileDependencies: ["vuetify"],
  plugins: [
    new HtmlWebpackPlugin({
      title: "My App",
      filename: "assets/admin.html"
    })
  ]
};
