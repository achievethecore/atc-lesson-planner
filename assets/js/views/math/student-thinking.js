define(
    ['jquery', 'tinymce', 'views/math/_base'],
    function ($, tinymce, mathBase)
{
	var studentThinking =
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
				'!ca3/i3c,i3e'
				];
		},

		initView: function()
		{
			mathBase.createMCE('#st-text');
		}

	};

	return studentThinking;
});
