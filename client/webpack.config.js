const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');


module.exports = () => {
    return {
        mode: 'development',

       plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            title: 'Radiant Soul Esthetics'
        }),
       ]
    };
};