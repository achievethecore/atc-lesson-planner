define(
    ['jquery', 'modules/view'],
    function($, view)
{
	var textChoice =
	{

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
					['h4', 'Example Texts'],
					'If you do not have an anchor text in mind, the CCSS has provided some example texts that have been evaluated for text complexity. Appendix B of the CCSS is compilation of text samples that primarily serve to exemplify the level of complexity and quality that the CCSS and other CCR students require all students in a given grade band to engage with. Additionally, they are suggestive of the breadth of texts that students should encounter in the text types required by CCR standards. The choices can serve as useful guideposts in helping educators select texts of similar complexity, quality, and range for their own classrooms. They expressly do not represent a partial or complete reading list.',
					['br'],
					['a', {href: 'http://www.corestandards.org/assets/Appendix_B.pdf', target: '_blank'}, 'See the full list']
				],
				'!ca1'
			];
		},

		initView: function()
		{
			//
		}
	};

	return textChoice;
});
