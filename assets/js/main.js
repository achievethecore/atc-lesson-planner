require.config(
{
	urlArgs: "bust=" + (new Date()).getTime(), 
	paths: {
		jquery: 'lib/jquery',
		jquerymobile: 'lib/jquery.mobile',
		jqueryui: 'lib/jquery.ui',
		jquerytouchpunch: 'lib/jquery.touch.punch.min',
		jsonml: 'lib/jsonml',
		handlebars: 'lib/handlebars',
		text: 'lib/text',
		underscore: 'lib/underscore',
		tweenlite: 'lib/tweenlite',
		cssplugin: 'lib/cssplugin',
		easepack: 'lib/easepack',
		bootstrap: 'lib/bootstrap.min',
		dropzone: 'lib/dropzone',
		tinymce: 'lib/tinymce.min',
		select2: 'lib/select2',
		tablesorter: 'lib/tablesorter.min',
		bootstraphover: 'lib/bootstrap.hover.min'
	},
	shim: {
		handlebars: {
			exports: 'Handlebars'
		},
		tweenlite: {
			exports: 'TweenLite',
			deps: ['cssplugin', 'easepack']
		},
		bootstrap: {
            deps: ['jquery']
        },
        tinymce: {
        	exports: 'tinyMCE',
        	init: function() {
        		this.tinyMCE.DOM.events.domLoaded = true;
        		return this.tinyMCE;
        	}
        },
        select2: {
        	deps: ['jquery']
        },
        tablesorter: {
        	exports: 'TableSorter',
        	deps: ['jquery']
        },
        bootstraphover: {
        	deps: ['jquery', 'bootstrap']
        },
        jquerytouchpunch: {
        	deps: ['jquery', 'jqueryui']
        },
        jqueryui: {
        	deps: ['jquery']
        },
        content: {
        	exports: 'Content',
        }
	}
});

require('bootstrap');
require('underscore');
require('bootstraphover');
require('jquerytouchpunch');
require('jsonml');
require('content');
require('standards');

var app = require('app');
$(function() { app.initialize(); });

//require(['./app', 'bootstrap', 'underscore', 'bootstraphover', 'jquerytouchpunch', 'jsonml', 'content', 'modules/account', 'modules/utils', 'modules/state-manager', 'views/math/_base', './views/'+['ela','math'][Math.random()*0]+'/vocabulary', 'modules/sidebar-left', 'modules/sidebar-right'], function (app) {
//    app.initialize();
//});