const path = require("path");
const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  output: {
    clean: false,
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset",
      },
    ],
  },
  resolve: {
    extensions: [".js"],
    alias: {
      styles: path.resolve(__dirname, "src/styles/"),
      images: path.resolve(__dirname, "src/images/"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Development",
      template: "./public/index.html",
      filename: "./index.html",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/images"),
          to: ".",
        },
      ],
    }),
    new Dotenv({ systemvars: true }),
  ],
  devServer: {
    compress: false,
    historyApiFallback: true,
    port: 3005,
  },
};
