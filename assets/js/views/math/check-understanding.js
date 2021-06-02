define(
    ['jquery', 'tinymce', 'views/math/_base'],
    function ($, tinymce, mathBase)
{
	var checkUnderstanding =
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
			mathBase.createMCE('#cu1-text');
			mathBase.createMCE('#cu2-text');
      mathBase.createMCE('#cu22-text');
		}


	};

	return checkUnderstanding;
});
