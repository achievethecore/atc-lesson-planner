define(
    ['jquery', 'view-templates/ela/text-based-questions.html', 'view-templates/ela/text-based-questions-item.html', 'modules/state-manager', 'jqueryui'], 
    function($, template, templateItem, stateManager)
{
	var textBasedQuestions = 
	{
		
		templateItem: templateItem,

		getViewMarkup: function(content)
		{
			var viewData = {};
			viewData.markup = template;
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
					['h4', 'What are Text-Dependent Questions?'],
					'Text-Dependent Questions:',
					['ul'].concat(
						[
						'Can only be answered with evidence from the text.',
						'Can be literal (checking for understanding) but must also involve analysis, synthesis, evaluation.',
						'Focus on word, sentence, and paragraph, as well as larger ideas, themes, or events.',
						'Focus on difficult portions of text in order to enhance reading proficiency.',
						'Can also include prompts for writing and discussion questions.'].map(function(e) { return ['li', e]; })
					),
					'Text-Dependent Questions are not:',
					['ul'].concat(
						[
						'Low-level or recall questions',
						'Focused on comprehension strategies',
						'Just questions…'].map(function(e) { return ['li', e]; })
					)
				],
				['div', 
					['h4', 'Engaging with Evidence'],
					['p', 'One of the main shifts of the Common Core is to increase the emphasis on reading, writing, and speaking grounded in evidence from text, both literary and informational. Text-dependent questions (TDQs) are questions that can only be answered by referring to evidence provided in a text. Text-specific questions are questions that are related to the unique text and no other.'],
					['p', 'When you\'re writing or reviewing a set of questions, consider the following three categories:'],
					['ul'].concat(
						[
						'Questions that assess themes and central ideas',
						'Questions that assess knowledge of vocabulary',
						'Questions that assess syntax and structure'].map(function(e) { return ['li', e]; })
					)
				],
				['div', {class:'has-image','data-src':'8'},
					['h4', 'Example'],
					''/*['h3', 'Non-Examples and Examples'], 
					['table',
						['tr',
							['th', 'Not Text-Dependent'], ['th', 'Text-Dependent']
						],
						['tr',
							['td', 'In “Casey at the Bat,” Casey strikes out. Describe a time when you failed at something.'], ['td', 'What makes Casey’s experiences at bat humorous?']
						],
						['tr',
							['td', 'In "Letter from a Birmingham Jail," Dr. King discusses nonviolent protest. Discuss, in writing, a time when you wanted to fight against something that you felt was unfair.'], ['td', 'What can you infer from King\'s letter about the letter that he received?']
						]
					]*/
				],
				'!ca2'
			];
		},

		initView: function()
		{
			// -- Tooltip
			var tt = 'One of the main shifts of the common core is to increase the emphasis on reading, writing, and speaking grounded in evidence from text, both literary and informational.  Text-dependent questions (TDQs) are questions that can only be answered by referring to evidence provided in a text. Text-specific questions are questions that are related to the unique text and no other.';
			$('.i-tooltip').attr('title', tt);
			$('.i-tooltip').tooltip();

			// -- Check
			if (!stateManager.dataJson['tbq-items']) 
			{
				textBasedQuestions.addItem(true);
				textBasedQuestions.firstOne = true;

				$('.add-another').css('display', 'none');
			}

			// -- Configure Sorting
			$('.view.tb .tbq-sortables').sortable({
				axis: 'y',
				handle: '.btn-move'
			});

			// -- Listeners
			$('body').on('click', '.tbq-item .btn-delete', function(event)
			{
				textBasedQuestions.removeItem($(this).parent());
				return false;
			});

			$('body').off('click', '.add-another').on('click', '.add-another', function(event)
			{
				if ($('#4_1 .state-complete').hasClass('active'))
				{
					textBasedQuestions.addItem();
					$('.col-middle').trigger($.Event('resize'));
				}

				return false;
			});

			$('body').on('change keyup paste', '.tbq-item-input', function()
			{
				$(this).attr('value', $(this).val());

				if ($('.add-another').css('display') == 'none') {
					$('.add-another').css('display', 'block');
				}
			});
		},

		removeItem: function(item)
		{
			TweenLite.to($(item), 0.5, {autoAlpha:0, onComplete:function(){
				$(item).remove();
			}});
		},

		addItem: function(firstOne)
		{
			_gaq.push(['_trackEvent', 'Text-Based Questions', 'Add', ''+$('.tbq-sortables li').length ]);
			$('.tbq-sortables').append(textBasedQuestions.templateItem);
			textBasedQuestions.firstOne = false;
		}

	};

	return textBasedQuestions;
});