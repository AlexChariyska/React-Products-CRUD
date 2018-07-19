'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var StatsPlugin = require('stats-webpack-plugin');

module.exports = {
	entry: [
		'babel-polyfill',
		path.join(__dirname, 'app/index.js')
	],
	output: {
		path: path.join(__dirname, '/dist/'),
		filename: '[name]-[hash].min.js',
		publicPath: '/'
	},
	plugins: [
		// webpack gives your modules and chunks ids to identify them. Webpack can vary the
		// distribution of the ids to get the smallest id length for often used ids with
		// this plugin
		new webpack.optimize.OccurenceOrderPlugin(),

		new HtmlWebpackPlugin({
			template: 'app/index.tpl.html',
			inject: 'body',
			filename: 'index.html'
		}),
		new ExtractTextPlugin('[name]-[hash].min.css'),
		// handles uglifying js
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false,
				screw_ie8: true
			}
		}),
		// creates a stats.json
		new StatsPlugin('webpack.stats.json', {
			source: false,
			modules: false
		}),
		// plugin for passing in data to the js, like what NODE_ENV we are in.
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		})
	],

	// ESLint options
	eslint: {
		configFile: '.eslintrc',
		failOnWarning: false,
		failOnError: true
	},

	module: {
		// Runs before loaders
		preLoaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'eslint'
			}
		],
		loaders: [{
			test: /\.js?$/,
			exclude: /node_modules/,
			loader: 'babel'
		}, {
			test: /\.json?$/,
			loader: 'json'
		}, {
			test: /\.scss$/,
			loader: ExtractTextPlugin.extract('style', 'css?modules&localIdentName=[name]---[local]---[hash:base64:5]!sass')
		}, {
			test: /\.woff(2)?(\?[a-z0-9#=&.]+)?$/,
			loader: 'url?limit=10000&mimetype=application/font-woff'
		}, {
			test: /\.(ttf|eot|svg)(\?[a-z0-9#=&.]+)?$/,
			loader: 'file'
		},
		{
	        test: /\.(jpe?g|png|gif|svg)$/i,
	        loaders: [
	          'file-loader?hash=sha512&digest=hex&name=img/[hash].[ext]',
	          'image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false',
	        ],
	      }]
	},
	postcss: [
		require('autoprefixer')
	]
};
