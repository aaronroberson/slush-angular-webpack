module.exports = {
    
    context: __dirname + '/app',
    entry: './index.js',
    // Currently we need to add '.ts' to resolve.extensions array.
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    },
    // Source maps support (or 'inline-source-map' also works)
    devtool: 'source-map',
    output: {
        path: __dirname + '/app', // TODO: create from slush question....
        filename: 'bundle.js'
    },
    module:{
        loaders:[
            { test: /\.css$/, loader: "style-loader!css-loader" },
            { test: /\.html$/, exclude: /node_modules/, loader: 'raw-loader' }
        ]
    },

};