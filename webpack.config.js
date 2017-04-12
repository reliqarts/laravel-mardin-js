/**
 * Mardin-js
 * Webpack config
 * Adapted from https://github.com/Stanko/react-redux-webpack2-boilerplate/blob/master/webpack.config.js
 */

const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';

const jsSourcePath = path.join(__dirname, './src/js');
const buildPath = path.join(__dirname, './dist');
const imgPath = path.join(__dirname, './src/assets/img');
const sourcePath = path.join(__dirname, './src');

// Common plugins
const plugins = [
    // new webpack.optimize.CommonsChunkPlugin({
    //     name: 'vendor',
    //     minChunks: Infinity,
    //     filename: 'vendor.js',
    // }),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(nodeEnv),
        },
    }),
    new webpack.NamedModulesPlugin(),
    // new HtmlWebpackPlugin({
    //     template: path.join(sourcePath, 'index.html'),
    //     path: buildPath,
    //     filename: 'index.html',
    // }),
    new webpack.LoaderOptionsPlugin({
        options: {
            postcss: [
                autoprefixer({
                    browsers: [
                        'last 3 version',
                        'ie >= 10',
                    ],
                }),
            ],
            context: sourcePath,
        },
    }),
];

// Common rules
const rules = [
    {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
            'babel-loader',
        ],
    },
    {
        test: /\.(png|gif|jpg|svg)$/,
        include: imgPath,
        use: 'url-loader?limit=20480&name=assets/[name]-[hash].[ext]',
    },
];

if (isProduction) {
    // Production plugins
    plugins.push(
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true,
            },
            output: {
                comments: false,
            },
        }),
        new ExtractTextPlugin('style-[hash].css')
    );

    // Production rules
    rules.push(
        {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader!postcss-loader!sass-loader',
            }),
        }
    );
} else {
    // Development plugins
    plugins.push(
        // new webpack.HotModuleReplacementPlugin(),
        // new DashboardPlugin()
    );

    // Development rules
    rules.push(
        {
            test: /\.scss$/,
            exclude: /node_modules/,
            use: [
                'style-loader',
                // Using source maps breaks urls in the CSS loader
                // https://github.com/webpack/css-loader/issues/232
                // This comment solves it, but breaks testing from a local network
                // https://github.com/webpack/css-loader/issues/232#issuecomment-240449998
                // 'css-loader?sourceMap',
                'css-loader',
                'postcss-loader',
                'sass-loader?sourceMap',
            ],
        }
    );
}

module.exports = {
    devtool: isProduction ? 'eval' : 'source-map',
    context: jsSourcePath,
    entry: {
        js: './mardin.js',
        // vendor: [
        //     'axios',
        //     'pusher-js',
        // ],
    },
    output: {
        path: buildPath,
        publicPath: '/',
        filename: 'mardin.js',
        library: 'Mardin',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules,
    },
    resolve: {
        extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
        modules: [
            path.resolve(__dirname, 'node_modules'),
            jsSourcePath,
        ],
    },
    plugins
};