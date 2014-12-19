define(
    ['jquery', 'views/math/_base'], 
    function ($, mathBase)
{
	var discussionQuestions = 
	{

		getViewMarkup: function(content)
		{
			tinymce.remove();

			var viewData = {};
			viewData.markup = view.formatContent(content);
			viewData.onNext = function(app) {
				app.showDashboard();
			};
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
					['h4', 'Thinking About Discussion Questions'],
					'Effective teaching of mathematics uses purposeful questions to assess and advance students’ reasoning and sense making about important mathematical ideas and relationships.',
					'(The National Council of Teachers of Mathematics, Inc., ', ['i', 'From Principals to Actions'], ', p. 10 NCTM. 2014 www.nctm.org)',
					['br'],
					'What are teachers doing?',
					['ul'].concat(
						[
							'Advancing student understanding by asking questions that build on, but do not take over or funnel, student thinking.',
							'Making certain to ask questions that go beyond gathering information to probing thinking and requiring explanation and justification.',
							'Asking intentional questions that make the mathematics more visible and accessible for student examination and discussion.',
							'Allowing sufficient wait time so that more students can formulate and offer responses.'
						].map(function(e) { return ['li', e]; })
					),
					'What are students doing?',
					['ul'].concat(
						[
							'Expecting to be asked to explain, clarify, and elaborate on their thinking.',
							'Thinking carefully about how to present their responses to questions clearly, without rushing to respond quickly.',
							'Reflecting on and justifying their reasoning, not simply providing answers.',
							'Listening to, commenting on, and questioning the contributions of their classmates.'
						].map(function(e) { return ['li', e]; })
					),
					'(The National Council of Teachers of Mathematics, Inc., ', ['i', 'From Principals to Actions'], ', p. 41 NCTM. 2014 www.nctm.org)',
				],
				['div',
					['h4', 'Additional Resources'],
					['p', 'For some questioning prompts and ideas, ',
						['a', {href:'http://www-tc.pbs.org/teachers/_files/pdf/TL_MathCard.pdf', target:'_blank'}, 'here is a resource from PBS.']
					]
				],
				'!ca3/i3c'
				];
		},
		
		
		initView: function()
		{
			mathBase.createMCE('#dq1-text');
		}


	};

	return discussionQuestions;
});