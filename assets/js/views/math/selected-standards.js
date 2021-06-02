define(
    ['jquery', 'tinymce', 'modules/state-manager', 'views/math/_base'], 
    function ($, tinymce, stateManager, mathBase)
{
	var keyMath = 
	{
		getViewMarkup: function(content)
		{
			tinymce.remove();
			
			var viewData = {};
			viewData.markup = view.formatContent(content);
			viewData.smList = {};

			$(viewData.markup).find('.sm').each(function(index, val) 
			{
				var sId = $(this).attr('data-sid');
				viewData.smList[sId] = '1';
			});

			return viewData;
		},
		
		getHelpText: function() {
			return [ 
				'!ca1/i1a'
				];
		},
		
		initView: function()
		{	
			mathBase.createMCE('#focusq1-text');

			mathBase.loadStandards();
		}

	};

	return keyMath;
});