define(
    ['jquery', 'view-templates/math/adapting-lesson.html', 'tinymce', 'views/math/_base'],
    function ($, template, tinymce, mathBase)
{
	var adaptingLesson =
	{
		template: template,

		getViewMarkup: function()
		{
			tinymce.remove();

			var viewData = {};
			viewData.markup = this.template;
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
				mathBase.PDSimple('Adapting the Lesson', 'Differentiation is sometimes necessary, but teachers should manage unfinished learning from earlier grades inside grade-level work, rather than setting aside grade-level work to reteach earlier content. Unfinished learning from earlier grades is normal and prevalent; it should not be ignored nor used as an excuse for cancelling grade-level work and retreating to below-grade work. (For example, the development of fluency with division using the standard algorithm in grade 6 is the occasion to surface and deal with unfinished learning about place value; this is more productive than setting aside division and backing up.) Likewise, students who are “ready for more” can be provided with problems that take grade-level work in deeper directions, not just exposed to later grades’ topics.'),
				'!ca1/i1a,ca3/i3a'
				];
		},

		initView: function()
		{
			var tt = 'Differentiation is sometimes necessary, but teachers should manage unfinished learning from earlier grades inside grade-level work, rather than setting aside grade-level work to reteach earlier content. Unfinished learning from earlier grades is normal and prevalent; it should not be ignored nor used as an excuse for cancelling grade-level work and retreating to below-grade work. (For example, the development of fluency with division using the standard algorithm in grade 6 is the occasion to surface and deal with unfinished learning about place value; this is more productive than setting aside division and backing up.) Likewise, students who are “ready for more” can be provided with problems that take grade-level work in deeper directions, not just exposed to later grades’ topics.';
			$('.i-tooltip').attr('title', tt);
			$('.i-tooltip').tooltip();

			mathBase.createMCE('#al1-text');
			mathBase.createMCE('#al2-text');
			mathBase.createMCE('#al3-text');
		}


	};

	return adaptingLesson;
});
