define(
    ['jquery', 'view-templates/math/lesson-info.html'],
    function($, template)
{
	var lessonInfo =
	{
		template: template,

		getViewMarkup: function(content)
		{
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
				['div',
					['h4', 'Planning a Standards-Aligned Lesson'],
					'A lesson aligned to the college- and career-ready standards in mathematics may take more than one day to complete.'
				]
			];
		},

		initView: function()
		{

		}

	};

	return lessonInfo;
});
