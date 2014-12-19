define(
    ['jquery', 'tinymce', 'modules/state-manager', 'views/math/_base'], 
    function ($, tinyMCE, stateManager, mathBase)
{
	var coherencePK = 
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
				mathBase.PDSimple('Addressing Unfinished Learning', 'Differentiation is sometimes necessary, but teachers should manage unfinished learning from earlier grades inside grade-level work, rather than setting aside grade-level work to reteach earlier content. Unfinished learning from earlier grades is normal and prevalent; it should not be ignored nor used as an excuse for cancelling grade-level work and retreating to below-grade work. (For example, the development of fluency with division using the standard algorithm in grade 6 is the occasion to surface and deal with unfinished learning about place value; this is more productive than setting aside division and backing up.) Likewise, students who are “ready for more” can be provided with problems that take grade-level work in deeper directions, not just exposed to later grades’ topics. '),
				mathBase.PDSimple('Progressions in the Standards', ['span', ['a', {href:'http://achievethecore.org/page/254/progressions-documents-for-the-common-core-state-standards-for-mathematics-detail-pg', target:'_blank'}, 'The progression documents'], ' are helpful in tracing standards back to previous grades to ensure your lesson\'s content is built on student\'s prior knowledge. Similarly, the documents also articulate the mathematical content students are preparing for.  Knowing the full progression of mathematical content for your targeted standard(s) will strengthen your lesson as well as be useful in scaffolding for struggling students or challenging advanced students.']),
				'!ca1/i1b'
				];
		},
		
		initView: function()
		{

			mathBase.createMCE('#cpk1-text');
			mathBase.createMCE('#cpk2-text');
			mathBase.createMCE('#cpk3-text');

			mathBase.loadStandards();
		}

	};

	return coherencePK;
});