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
				/*mathBase.PDSimple('Thinking About Key Mathematics', ['span', ['a', {href:'http://achievethecore.org/page/254/progressions-documents-for-the-common-core-state-standards-for-mathematics-detail-pg', target:'_blank'}, 'The progression documents'], ' are a resource to help you articulate the main mathematical ideas you have targeted for your lesson.']),
				'!ca1/i1a'
      ];*/
      mathBase.PDSimple('Thinking About Key Mathematics', ['span', 'Resources to help you articulate the main mathematical ideas you have targeted for your lesson', ['ul', ['li', ['a', {href:'https://achievethecore.org/page/254/progressions-documents-for-the-common-core-state-standards-for-mathematics', target:'_blank'}, 'Progression documents']],['li', ['a', {href:'https://www.unbounded.org/enhance_instruction?subjects=math', target:'_blank'}, 'Content Guides']]]]),
      '!ca1/i1a'
    ];
		},

		initView: function()
		{
			mathBase.createMCE('#km1-text');
			mathBase.createMCE('#km2-text');

			mathBase.loadStandards();
		}

	};

	return keyMath;
});
