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
        // new ImageminAvifWebpackPlugin({
        //     detailedLogs: true,
        //     overrideExtension: true,
        //     config: [{
        //         test: /\.(jpe?g|png|gif)/,
        //         options: {
        //             quality:  65
        //         }
        //     }],
        // }),
        //Для генерации формата webP
        new ImageminWebpWebpackPlugin({
            detailedLogs: true,
            overrideExtension: true,
            config: [{
                test: /\.(jpe?g|png|gif)/,
                options: {
                    quality:  85
                }
            }],
        }),
    ],
    module: {
        rules: [
            // Генерация с svg...
            // P.S. а может это и нахуй не надо
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'svg-url-loader',
                        options: {
                            limit: 8192, // лимит на размер файла
                            name: '[name].[ext]', // имя файла с оригинальным расширением
                        },
                    },
                ],
            },
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
                                quality: 85,
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
                                quality: 85
                            }
                        },
                    },
                ],
            },
        ],
    },
};
