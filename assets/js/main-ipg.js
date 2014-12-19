require.config(
{
	paths: {
		jquery: 'lib/jquery',
		handlebars: 'lib/handlebars',
		text: 'lib/text',
		underscore: 'lib/underscore'
	},
	shim: {
		handlebars: {
			exports: 'Handlebars'
		},
	}
});

require('underscore');
require('content');
require('standards');
var plan = require('ipg');

$(function() { plan.initialize(); });
