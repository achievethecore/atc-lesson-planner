define(
    ['jquery', 'view-templates/math/feedback-revision.html', 'tinymce', 'views/math/_base'],
    function ($, template, tinymce, mathBase)
{
	var feedbackRevision =
	{
		template: template,

		getViewMarkup: function()
		{
			tinymce.remove();

			var viewData = {};
			viewData.markup = this.template;
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

		initView: function()
		{
			mathBase.createMCE('#fr1-text');
			mathBase.createMCE('#fr2-text');
		},

		getHelpText: function() {
			return [
        ['div',
          ['p', 'Feedback and revision are critical components of lesson planning. This work is not directly related to language of the Core Actions and indicators of the ',
            ['a', {href:'/instructional-practice-guide', target:'_blank'}, 'Instructional Practice Guide'],
            ['span', ', but it is incorporated into the questions of the .'],
            ['a', {href:'https://achievethecore.org/content/upload/Beyond%20the%20Lesson%20Discussion%20Guide_Mathematics.pdf', 'target':'_blank'}, 'Beyond the Lesson Discussion Guide'],
            ['span', '.']
          ]
        ]
      ];      
		}

	};

	return feedbackRevision;
});
