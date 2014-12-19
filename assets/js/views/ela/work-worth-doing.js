define(
    ['jquery', 'modules/view', 'tinymce'],  
    function($, view, tinyMCE)
{
	var workWorthDoing = 
	{
		

		getViewMarkup: function(content)
		{
			tinymce.remove();
			
			var viewData = {};
			viewData.markup = view.formatContent(content);
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

		getHelpText: function() {
			return [[ 
				elaBase.PDSimple('Example',
					/^(k|1)$/.test(utils.lessonGrade) ?
					'For example, I will provide a chart for collecting evidence that students can draw on, or create a list for vocabulary (tier 3) that is essential to understanding the text. In addition, after I have read the text aloud a time or two, I will chunk the text and provide brief questions and activities for each chunk of text to be answered before students go on to the next chunk of text.'
					: 
					'For example, I will provide a list for vocabulary (tier 3) that is essential to understanding the text.  In addition, I will chunk the text and provide brief questions for each chunk of text to be answered before students go on to the next chunk of text.'),
				'!ca3/i3b'
			],
			[
				elaBase.PDSimple('Example', 'For example, I will provide pre-reading activities that focus on the structure, grammar, conventions, graphic elements, and foundational skills of the text.'),
				'!ca3/i3e'
			]
			][app.subPage];
		},
		
		initView: function()
		{
			elaBase.createMCE('#wwd1-text');
			elaBase.createMCE('#wwd3-text');
		},


	};

	return workWorthDoing;
});