define(
    ['jquery', 'tinymce', 'modules/state-manager', 'views/math/_base'], 
    function ($, tinymce, stateManager, mathBase)
{
	var mathLanguage = 
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
			return [
				'!ca3/i3e'
				];
		},
		
		initView: function()
		{
			var onChange = function(editor) { $('#' + editor.id).parent().parent().find('.qb-screen2 div').html(editor.getContent()); };
			mathBase.createMCE('#ml1-text', onChange);
			mathBase.createMCE('#ml2-text', onChange);
			mathBase.createMCE('#ml3-text', onChange);

			mathBase.loadStandards();
		}

	};

	return mathLanguage;
});