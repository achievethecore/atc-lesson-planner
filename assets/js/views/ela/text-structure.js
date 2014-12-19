define(
    ['jquery', 'modules/view', 'modules/state-manager', 'tinymce'], 
    function($, view, stateManager, tinyMCE)
{
	var isInformational = stateManager.isSelected('libtn2');
		
	var id = 'ts';
	
	var meaningPurpose = 
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
			// same in both versions
			var sec1list = ['ul'].concat(
					[
						'Excerpt uses unconventional sentence structures',
						'Series of events are not in chronological order, or tense of sentences move the reader through different times.',
						'Excerpt contains many long sentences with numerous prepositional phrases',
						'There are no obvious signposts to indicate organization in the excerpt',
						'Connections between ideas are mainly implicit'
						].map(function(e) { return ['li', e]; })
					);
			var sec2list = ['ul'].concat(
					[
						'Connections between ideas or events are clear and explicit, for example ____.',
						'Organization is clear and generally sequential, for example _______.',
						'There are few/no graphics or text features to contribute to understanding the text, for example _____.', 
						'There are many connections between ideas, processes or events.  They are deeper, implicit or subtle, for example _____.',
						'The organization of the text may vary or be unfamiliar, for example _______.',
						'There are many graphics or text features that are necessary to understanding the text, for example _____.'
						].map(function(e) { return ['li', e]; })
					);
			
			return stateManager.isInformational()?
			[
				['div', 
					['h4', 'Determining Evidence'],
					'To determine this evidence, try completing these sentences:',
					sec2list
				],
				['div', 
					['h4', 'Determining Complexity'],
					'Simple informational texts are likely not to deviate from the conventions of common genres and subgenres, while complex informational texts are more likely to conform to the norms and conventions of a specific discipline.  Here are some examples of features to look out for:',
					sec1list
				],
				elaBase.PDExamples(
					'Text begins with simple observations of the moon and continues to develop into a more complex informational text with specific vocabulary and illustrations related to the moon.  The illustrations are essential to understanding the text, i.e. the phases of the moon. ',
					'The structure of the text is mostly cause and effect, showing the main reasons the Great Fire started in Chicago when it did. The relationship between the main idea and supporting details is clear.'
				),
				'!ca1/i1b'
			]
			:[
				['div', 
					['h4', 'Determining Evidence'],
					'To determine this evidence, try completing these sentences:',
					sec2list
				],
				['div', 
					['h4', 'Determining Complexity'],
					'Texts that are slightly complex tend to have simple, well-marked, and conventional structures, whereasexceedingly complex texts tend to have complex, implicit, and unconventional structures. Simple texts tend to relate events in chronological order, while more complex texts may manipulate time and sequence.',
					sec1list
				],
				elaBase.PDExamples(
					'Straight-forward structure: chronological, separated into chapters by event.  Chapter titles help in keeping track of events; they clearly identify main event/mood of each chapter.   A few simple illustrations illuminate key events.',
					'The third-person narration is simple and conventional. The order of events is chronological, though the narrator does refer to past and future events.'
				),
				'!ca1/i1b'
			];
		},

		initView: function()
		{
			elaBase.createMCE('#'+id+'-text');

		}

	};

	return meaningPurpose;
});