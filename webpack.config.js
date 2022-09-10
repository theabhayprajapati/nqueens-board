const path = require('path');
// entry: './src/index.js',
// output: ./public/main.js
module.exports = {
    entry: './src/index.ts',
    output: {
        publicPath: 'public',
        path: path.resolve(__dirname, 'public'),
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                include: [path.resolve(__dirname, 'src')],
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
};

