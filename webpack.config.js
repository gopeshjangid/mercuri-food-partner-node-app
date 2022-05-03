const path = require('path');
const nodeExternals = require('webpack-node-externals');


module.exports = {
    target: 'node',
    externals: [nodeExternals()],
    entry: ['babel-polyfill','./src/Index.js'],
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'api.bundle.js'
    },
    resolve: {
        extensions: ['.js'],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            }
        ]
    }
};
