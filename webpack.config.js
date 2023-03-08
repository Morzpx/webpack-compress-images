const path = require('path');
const ImageminAvifWebpackPlugin = require("imagemin-avif-webpack-plugin");
const ImageminWebpWebpackPlugin= require("imagemin-webp-webpack-plugin");


module.exports = {
    mode: 'none',
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        // Для генерации формата Avif
        new ImageminAvifWebpackPlugin({
            detailedLogs: true,
            overrideExtension: true,
            config: [{
                test: /\.(jpe?g|png|gif)/,
                options: {
                    quality:  65
                }
            }],
        }),
        // Для генерации формата webP
        // new ImageminWebpWebpackPlugin({
        //     detailedLogs: true,
        //     overrideExtension: true,
        //     config: [{
        //         test: /\.(jpe?g|png|gif)/,
        //         options: {
        //             quality:  65
        //         }
        //     }],
        // }),
    ],
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/i,
                include: path.resolve(__dirname, 'src/images'),
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images/',
                        },
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65,
                            },
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            webp: {
                                quality: 75
                            }
                        },
                    },
                ],
            },
        ],
    },
};
