/* eslint-disable */

const path = require('path');
// entry: './src/index.js',
// output: ./public/main.js
module.exports = {
    entry: './src/index.js',
    output: {
        publicPath: 'open',
        path: path.resolve(__dirname, 'open'),
        filename: 'main.js'
    }
};

