const path = require('path');
const packagejson = require('./package.json');

const args = process.argv.slice(2);

const libName = packagejson.name.replace(/-/g, '_');

module.exports = {
    entry: {main: './src/index.js'},
    output: {
        path: path.resolve(__dirname, libName),
        filename: 'bundle.js',
        library: libName,
        libraryTarget: 'window',
    },
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'plotly.js': 'Plotly',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            }
        ],
    },
};
