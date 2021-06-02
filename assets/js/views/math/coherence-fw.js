define(
    ['jquery', 'tinymce', 'modules/state-manager', 'views/math/_base'],
    function ($, tinymce, stateManager, mathBase)
{
	var coherenceFW =
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
        mathBase.PDSimple('Progressions in the Standards', ['span', ['a', {href:'http://achievethecore.org/page/254/progressions-documents-for-the-common-core-state-standards-for-mathematics-detail-pg', target:'_blank'}, 'The progression documents'], ' and the ', ['a', {href:'https://achievethecore.org/coherence-map/', target: '_blank'}, 'Coherence Map'], ' are helpful resources in tracing standards back to previous grades to ensure your lesson\'s content is built on student\'s prior knowledge. Similarly, the documents also articulate the mathematical content students are preparing for.  Knowing the full progression of mathematical content for your targeted standard(s) will strengthen your lesson as well as be useful in scaffolding for struggling students or challenging advanced students.']),
          '!ca1/i1b'
        ];
		},

		initView: function()
		{
			mathBase.createMCE('#cfw-text');
			mathBase.loadStandards();
		}

	};

	return coherenceFW;
});
