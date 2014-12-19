define(
    ['jquery', 'tinymce', 'views/math/_base'], 
    function ($, tinyMCE, mathBase)
{
	var solutionMethods = 
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
				'!ca2/i2c'
				];
		},
		
		initView: function()
		{
			mathBase.createMCE('#solmeth-text');
		}

	};

	return solutionMethods;
});