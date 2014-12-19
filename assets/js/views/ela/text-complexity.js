define(
    ['jquery', 'modules/view', 'modules/state-manager'],
    function($, view, stateManager)
{
	var id = 'tc2';
	
	var viewDataModule = 
	{

		getViewMarkup: function(content)
		{
			var viewData = {};
			viewData.markup = view.formatContent(content);
			viewData.smList = {};
			viewData.onNext = function(app) {
				// Yes
				if(/selected/.test(stateManager.dataJson['tc2-check1']||''))
					app.pushView('text-analysis');
				else {
					$('#0_4 .state-complete').addClass('active');
					app.pushView('lexile-score');
				}
			};

			$(viewData.markup).find('.sm').each(function(index, val) 
			{
				var sId = $(this).attr('data-sid');
				viewData.smList[sId] = '1';
			});

			return viewData;
		},
		
		getHelpText: function() {
			return [ 
				['div', {class:'has-image', 'data-src':'3'}, 
					['h4', 'Factors of Text Complexity'],
					'The Common Core emphasizes giving all students access to complex text, which is characterized by many features.  Use the following three steps to help narrow down the process:',
					['ol',
						['li', 'Use the quantitative measures to place a text within a grade band. '],
						['li', 'Use the qualitative measures to place the text at the top, middle, or bottom of the band. '], 
						['li', 'Finally, consider what to do with the qualities of the text through instruction so students within a grade can access it in a meaningful way (reader and task considerations).']
					]
				],
				'!ca1'
			];
		},

		initView: function()
		{
			
		}

	};

	return viewDataModule;
});