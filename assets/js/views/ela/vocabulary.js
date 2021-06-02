define(
    ['jquery', 'modules/view', 'tinymce'], 
    function ($, view, tinymce)
{
	var vocabulary = 
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
				['div',
					['h4', 'Which Words Do I Teach?'],
					'Determining which words to explicitly teach can be confusing.  Words that should be taught are:',
					['ul'].concat(
						[
						'Essential to text',
						'Likely to appear in future texts students will choose or be asked to read'].map(function(e) { return ['li', e]; })
					),
					'Which words should get relatively more time and attention?',
					['ul'].concat(
						[
						['Part of semantic word family','grow, grows, grown, growing, growth;  mix, mixes, mixed'],
						['Relatively more abstract','symbols, doubt, control'],
						['Refer to an idea, concept, event likely less familiar to many students at that grade level','symbol, "break through",  doubt']].map(function(e) { 
							return ['li', e[0], ['blockquote', e[1]]]; 
						})
					)
				],
				['div', 
					['h4', 'Importance of Vocabulary'],
					['p', 
						'One in six children who are not reading proficiently in third grade do not graduate from high school on time, a rate four times greater than that for proficient readers. [The Annie E. Casey Foundation. (2011). ',
							['i', 'Double Jeopardy. '],
							'Baltimore, MD: Hernandez. Retrieved from www.aecf.org.]  ',
							'A strong vocabulary is critical to building reading proficiency.  The Common Core emphasizes regular practice with complex text and its academic vocabulary, including words which are highly generalizable and represent subtle or precise ways to say relatively simple things. Academic vocabulary (also known as Tier 2 vocabulary) helps students access and understand increasing levels of complex texts across all content areas.'],
					['p', 'If you aren\'t sure what words are tier 2 in your text, try using the ',
						['a', {href:'/academic-word-finder', target:'_blank'}, 'Academic Word Finder'],
					]
				],
				'!ca2/i2c'
			];
		},

		initView: function()
		{

			elaBase.createMCE('#' + 'vocab1-text');
			elaBase.createMCE('#' + 'vocab2-text');
			//vocabulary.initMultiQ(2);
		},

	};

	return vocabulary;
});