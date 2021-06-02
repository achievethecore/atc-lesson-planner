define(
    ['jquery', 'modules/view', 'tinymce'],
    function($, view, tinymce)
{

	var id = 'wwd2';

	var meaningPurpose =
	{

		template: function() {
			return view.view(id,
			[
				view.header('Culminating Task', 'How will students demonstrate understanding of the Big Idea and what will the culminating activity be? How will I provide for authentic learning, application of literacy skills, student-directed inquiry, analysis, evaluation and/or reflection?', 1),
				view.mce(id),
				view.prevnext()
			]
			);
		},

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

		initView: function()
		{
			elaBase.createMCE('#'+id+'-text');

		},

		getHelpText: function() {
			return [
				['div',
					['h4', 'Culminating Task'],
					'Should relate to core understanding and key ideas.',
					['br'],
					'A coherent sequence of text-dependent questions will scaffold students toward successfully completing the culminating task.'
				],
				elaBase.PDExamples(
					['div',
						['h5', 'For example, from "Charlotte\'s Web" - Vocabulary and writing task'],
					'In the last chapter of Charlotte’s Web, it said, “Wilbur often thought of Charlotte. A few strands of her old web still hung in the doorway. Every day Wilbur would stand and look at the torn, empty web, and a lump would come to his throat. No one had ever had such a friend—so affectionate, so loyal, and so skillful.”',
					'We’re going to talk today about those last three words used to describe how good of a friend Charlotte was to Wilbur. We’ll talk about each of those three big words and think together about some examples from the story.',
						['ol',
							['li', 'Affectionate: Give students the definition. Affectionate means loving. Now let’s brainstorm some ways that Charlotte was a loving friend to Wilbur. I’ll write them on the chart paper.'],
							['li', 'Loyal: Loyal means that Charlotte stuck with Wilbur. She protected him and made sure that he would be safe. He was always her friend. Now, let’s think of some ways that Charlotte was a loyal friend to Wilbur. I’ll write them on the chart paper.'],
							['li', 'Skillful: Skillful means that Charlotte could do amazing work. When are some times that Charlotte did amazing work? When did she show her skills to us? Let’s think together and I’ll write them on the chart paper.']
						]
					],
					['div',
						['h5', 'For example, from "The Great Fire" - Writing Task'],
						['b', 'The Great Fire: A Community Responds'],['br'],
					'It is December 1871. The shock of the Great Fire has worn off and the city of Chicago needs to begin rebuilding. You have been asked to give advice to the mayor of Chicago about new fire codes that might prevent the next “Great Fire.” Which two changes to the Chicago fire code might have helped lessen the impact of the Great Fire of 1871? Construct an argument with a clear beginning, middle, and end describing the two changes you would make, using details from the text to support your choices. Be sure that your ideas are appropriate for the time period and solve problems that contributed to the 1871 fire described by the author.',
					],
					true
				),
				'!ca2/i2a,ca3/i3a,i3c'
			];
		}

	};

	return meaningPurpose;
});
