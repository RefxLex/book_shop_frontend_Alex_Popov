const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {

    entry:"./src/index.js",

    output: {
        path: path.join(__dirname, "/dist"),
        filename: "bundle.js"
    },

    plugins: [
        new HTMLWebpackPlugin({
            template: "./src/index.html"
        }),
        new MiniCssExtractPlugin(),
        new CleanWebpackPlugin(),
    ],

    module:{
        rules:[
            {
                test: /.js$/,
                exclude: /node_modules/,
                use:{
                    loader: "babel-loader",
                    options:{
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }
            },
            {
                test: /css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
              },
              {
                test: /png$/,
                type: "asset/resource",
              },
        ]
    },
    devServer: {
        port: 3000,
        open: true,
        historyApiFallback: true,
    },
}