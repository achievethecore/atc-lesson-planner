var webpack = require('webpack');

module.exports = {
  cache: true,

  resolve: {
  	alias: {
	  	'bootstrap': 'bootstrap.min.js',
		'bootstraphover': 'bootstrap.hover.min.js',
		'jquerytouchpunch': 'jquery.touch.punch.min.js', 
	  	'jqueryui': 'jquery.ui.js',
		'tablesorter': 'tablesorter.min.js',  
		'tinymce': 'tinymce.min.js',
		'views/ela/../compile-lesson': 'views/compile-lesson',
		'views/math/../compile-lesson': 'views/compile-lesson',
		 },
  	root: ['assets/js', 'assets/js/lib', 'node_modules'] 
	},
	resolveLoader: { root: ['.'], alias: {'raw-loader': 'raw-loader/index.js' } },
	

  entry: {browser:'main', plan:'main-plan', ipg:'main-ipg'},
  devtool: 'source-map',
  output: {
    filename: '[name]-bundle.js'
  },
  externals: {
  	jquery: 'jQuery',
  	tinymce: 'tinymce',
  	tweenlite: 'TweenLite'
  },
  module: {
    loaders: [
      {test: /\.(html|json)$/, loader: 'raw-loader'},
    ]
  },
	plugins: [
	  new webpack.ProvidePlugin({
	    "_": "underscore",
	    "$": "jquery",
	    "jQuery": "jquery",
	    'account': 'modules/account',
	    'topBlock': 'modules/top-block',
	    'sidebarLeft': 'modules/sidebar-left',
	    'sidebarRight': 'modules/sidebar-right',
	    'stateManager': 'modules/state-manager',
	    'landing': 'modules/landing',
	    'utils': 'modules/utils',
	    'view': 'modules/view',
	    'mathBase': 'views/math/_base',
	    'elaBase': 'views/ela/_base',
	    'Handlebars': 'handlebars',
	    'app': 'app'
	  })
	  /*new webpack.optimize.LimitChunkCountPlugin(),
	  new webpack.optimize.AggressiveMergingPlugin(),
	  new webpack.optimize.DedupePlugin(),
	  new webpack.optimize.CommonsChunkPlugin()*/
	]
};
