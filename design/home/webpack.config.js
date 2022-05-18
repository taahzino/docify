const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");

const config = {
    entry: {
        main: "./src/scripts/main.js",
        signup: "./src/scripts/signup.js",
        login: "./src/scripts/login.js",
    },
    mode: "development",
    devServer: {
        port: 8080,
        compress: true,
        open: true,
        static: "./dist",
    },
    target: "web",
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"),
        assetModuleFilename: "images/[hash][ext][query]",
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
        }),
        new HTMLWebpackPlugin({
            inject: true,
            template: "./src/index.html",
            filename: "index.html",
            chunks: ["main"],
        }),
        new HTMLWebpackPlugin({
            inject: true,
            template: "./src/signup.html",
            filename: "signup.html",
            chunks: ["signup"],
        }),
        new HTMLWebpackPlugin({
            inject: true,
            template: "./src/login.html",
            filename: "login.html",
            chunks: ["login"],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
            {
                test: /\.(jpg|jpeg|gif|png|svg)$/,
                type: "asset/resource",
            },
            {
                test: /\.html$/i,
                use: ["html-loader"],
            },
        ],
    },
};

module.exports = config;
