define(
    ['jquery', 'modules/view', 'modules/state-manager'],
    function($, view, stateManager)
{
	var id = 'ta';

	var viewDataModule =
	{
		template: view.view(id,
				[
					view.header('Text Analysis', 'Am I confident that this text belongs at this grade level at this time of year?', true),
					view.checkboxes_2col(id, ['Yes', 'No']),
					view.prevnext(),
				]
				),

		getViewMarkup: function(content)
		{
			var viewData = {};
			viewData.markup = view.formatContent(content);
			viewData.smList = {};
			viewData.onNext = function(app) {
				if(/selected/.test(stateManager.dataJson['ta-check1']||'') &&
					/selected/.test(stateManager.dataJson['tc2-check1']||'')) {
						$('#0_5 .state-complete').addClass('active');
						stateManager.dataJson.lexscore = 'N/A';
				}
				// Yes
				if(/selected/.test(stateManager.dataJson['ta-check1']||''))
					app.showDashboard();
				else
					app.pushView('lexile-score');
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
				elaBase.PDSimple('Determining Appropriateness', 'Engaging with appropriately complex text is paramount to planning a close reading lesson.  Consider the text selection - is it appropriate for your students at this time of the year?'),
        '!ca1/i1b'
        ];
		},

		initView: function()
		{

		}

	};

	return viewDataModule;
});
