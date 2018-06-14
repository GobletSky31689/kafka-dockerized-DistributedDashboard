var path = require('path')

module.exports = {

	mode: 'development',

	entry: path.resolve(__dirname, 'app', 'app.jsx'),
	
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'public')
	},

	module: {
		rules: [{
			test: /\.jsx$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			options: {
				presets: ['es2015']
			}
		}, {
			test: /\.css$/,
			loader: 'style-loader!css-loader'
		}, {
			test: /\.(png|woff|woff2|eot|ttf|otf)$/,
			loader: 'url-loader'
		}]
	},

	resolve: {
		modules: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'app')]
	}
}