define(
    ['jquery', 'modules/view','tinymce', 'modules/state-manager'], 
    function($, view, tinyMCE, stateManager)
{
	
	var languageFeatures = 
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
			var sec2list = ['ul'].concat(
					[
						'The text includes language that is explicit, literal, straightforward, and generally familiar, for example ____.',
						'The text includes figurative, nuanced, archaic or otherwise unfamiliar language or an abundance of domain-specific (tier 3) vocabulary, for example ______.',
						'The text contains mainly simple sentences, for example ______.',
						'The text contains many complex sentences with several subordinate phrases or clauses and transition words, for example _____.'
						].map(function(e) { return ['li', e]; })
					);
			
			return stateManager.isInformational()?
			[
				
				['div', 
					['h4', 'Determining Evidence'],
					'To determine the language features, try completing these sentences:',
					sec2list
				],
				['div', 
					['h4', 'Determining Complexity'],
					'Exceedingly complex informational texts will be dense and include abstract or figurative language.  Slightly complex informational texts will be more literal and easy to understand.'
				],
				elaBase.PDExamples(
					'The language demands are domain specific, with many unfamiliar words teaching young children about the moon, in addition to general academic words, e.g. ancient times , unmanned, manned, transmitted; the book has many domain specific  words, e.g. reflect, astronomers, phases of the moon, new moon, crescent, first quarter moon, full moon, waxing, waning, lunar, etc.',
					'The sentence structure varies from simple to complex but is of average length and can be dissected easily if needed.'
				),
				'!ca1/i1b'
			]
			:[
				['div', 
					['h4', 'Determining Evidence'],
					'To determine the language features, try completing these sentences:',
					sec2list
				],
				['div', 
					['h4', 'Determining Complexity'],
					'Texts that rely on literal, clear, contemporary, and conversational language tend to be easier to read than texts that rely on figurative, ironic, ambiguous, purposefully misleading, archaic or otherwise unfamiliar language or on general academic and domain-specific vocabulary.'
				],
				elaBase.PDExamples(
					'Significant vocabulary demands in this text. Some domain specific words that describe life on the farm (trough) and spiders (spinnerets, egg sac) but predominantly rich academic vocabulary that will repeat across many texts (injustice, satisfying, progress, gratified).',
					'The excerpt includes many complex sentences with mostly explicit conventionality. There is some British vocabulary (lift, flat), so use of footnotes will be important. Additionally, British spelling (colour, metre) may be initially distracting, but should not hinder comprehension. Some complex vocabulary may be challenging to students (sanguine, simultaneous, scrutinized).'
				),
				'!ca1/i1b,i2c'
			];
		},
		
		initView: function()
		{
			elaBase.createMCE('#lf-text');


		}
	};

	return languageFeatures;
});