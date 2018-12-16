let path = require('path');
let webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');

let conf ={
    entry: ['./src/main.js'],
    output: {
    	path: path.resolve(__dirname, './dist'),
    	filename: 'main.js',
    	publicPath: 'dist/'
    },
    module: {
    	rules: [
    	  {
    	  	test: /\.js$/,
            loader: 'babel-loader',
            options:{ presets: ["env"]}
    	  }               
    	]
    }
};

module.exports = (env, options) => {
	let production = options.mode ==='production';
	conf.devtool = production
	              ? 'source-map'//false
	              : 'eval-sourcemap';
	return conf;
}