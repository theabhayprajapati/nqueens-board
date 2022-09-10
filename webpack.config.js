/* eslint-disable */

const path = require('path');
// entry: './src/index.js',
// output: ./public/main.js
module.exports = {
    entry: './src/index.js',
    output: {
        publicPath: 'public',
        path: path.resolve(__dirname, 'public'),
        filename: 'main.js'
    }
};

