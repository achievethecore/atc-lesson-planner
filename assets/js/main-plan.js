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
//var stateManager = require('modules/state-manager');
var plan = require('views/compile-lesson');

$(function() {

            var lessonId = $('body').attr('data-id');
            $.get('/lpt-get-data/' + lessonId + '/static', function(response) 
            {
                var rJSON = JSON.parse(response);
                stateManager.dataJson = plan.dataJson = JSON.parse(rJSON.state);
                utils.lessonType = plan.lessonType = plan.dataJson.lessontype;
                
                plan.dataStandards = window.standardsData;
                plan.parseTemplate();

            });

});
