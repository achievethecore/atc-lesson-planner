define(
    ['jquery', 'view-templates/math/feedback-revision.html', 'tinymce', 'views/math/_base'], 
    function ($, template, tinyMCE, mathBase)
{
	var feedbackRevision = 
	{
		template: template,

		getViewMarkup: function()
		{
			tinymce.remove();

			var viewData = {};
			viewData.markup = this.template;
			viewData.smList = {};
			viewData.onNext = function(app) {
				app.showDashboard();
			};		

			$(viewData.markup).find('.sm').each(function(index, val) 
			{
				var sId = $(this).attr('data-sid');
				viewData.smList[sId] = '1';
			});

			return viewData;
		},

		initView: function()
		{
			mathBase.createMCE('#fr1-text');
			mathBase.createMCE('#fr2-text');
		},
		
		getHelpText: function() {
			return [ 
				'!ca3/i3g'
				];
		}

	};

	return feedbackRevision;
});