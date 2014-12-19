define(
    ['jquery', 'modules/view'],
    function($, view)
{
	var lessonInfo = 
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
					['h4', 'Example Close-Reading Lessons'],
					'Throughout this tool you will plan a close-reading lesson.  See examples of close-reading lessons:',
					['ul'].concat(
						[
							[/.*/, 'Annotated Close-Reading Lessons', 'http://achievethecore.org/page/752/featured-lessons-list-pg'],
							[/^(k|1|2)$/, 'Read-Aloud Project', 'http://achievethecore.org/page/948/search-for-lessons-to-use-with-read-aloud-stories-early-elementary-list-pg'],
							[/^[3-5]$/, 'Close-Reading Lessons for Popular Stories', 'http://achievethecore.org/page/796/search-for-lessons-to-use-with-popular-stories-upper-elementary-list-pg'],
							[/^[3-5]$/, 'Basal Alignment Project', 'http://achievethecore.org/page/696/search-for-lessons-to-use-with-basal-readers-upper-elementary-list-pg'],
							[/^([6-9]|1[0-2])$/, 'Close-Reading Lessons for Popular Stories', 'http://achievethecore.org/page/812/search-for-lessons-to-use-with-popular-stories-secondary-list-pg'],
							[/^([6-9]|1[0-2])$/, 'Anthology Alignment Project', 'http://achievethecore.org/page/792/search-for-lessons-to-use-with-anthologies-secondary-list-pg']
						].map(function(e) { 
							return e[0].test(utils.lessonGrade) ? ['li', ['a', {href:e[2], target:'_blank'}, e[1]]] : []; 
						})
					)
				]
			];
		},
		
		initView: function()
		{
			
		}

	};

	return lessonInfo;
});