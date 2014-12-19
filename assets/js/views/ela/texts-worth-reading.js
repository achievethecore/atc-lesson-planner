
	module.exports = 
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
			[
				elaBase.PDSimple('Reader and Task', 'Throughout this section, you will consider "Reader and Task".  This is the third component of evaluating a text for complexity.  Reader and task is a teacher\'s professional judgement on whether a text is appropriately complex for your students at this time.  Essentially, you are asking yourself, "Is this the right text at this particular time?"'),
				elaBase.PDSimple('Skills and Content', 'In addition to considering the overall complexity, a teacher should determine what she wants students to get from this text: skills and content.  A text should provide learning English Language Arts skills in context, and build a student\'s content knowledge.'),
				elaBase.PDSimple('Example', 'For example, I will chunk the text and provide brief questions for each chunk of text to be answered before students go on to the next chunk of text.'),
				'!ca3/i3a'
			],
			[
				elaBase.PDSimple('Example', 
				['div', 'For example, I will download the ',
					['a', {href:'http://www.wordsmyth.net/?mode=widget', target:'_blank'}, 'Wordsmyth widget'], 
					' to classroom computers/tablets for students to access student-friendly definitions for unknown words. ']
				),
				'!ca3/i3a'
			],
			[
				(/^(k|1)$/.test(utils.lessonGrade) ?
				elaBase.PDSimple('Example', 'For example, for students already reading, I will provide additional readings related to the text and allow them to complete a text-dependent task across multiple texts.') 
				:
				elaBase.PDSimple('Example', 'For example, I will provide additional complex readings related to the topic and students may complete text-dependent tasks across multiple texts.')),
				'!ca3/i3d'
			],
			[
				elaBase.PDSimple('Example', 
					['div', 'For example, I will:',
						['ul'].concat(
							[
	'Provide a brief student-friendly glossary of some of the academic vocabulary (tier 2) and domain', 
	['span', 'Download the ', ['a', {href:'http://www.wordsmyth.net/?mode=widget', target:'_blank'}, 'Wordsmyth Widget'], ' to classroom computers/tablets for students to access student-friendly definitions for unknown words.'],
	'Provide brief student friendly explanations of necessary background knowledge',
	'Include pictures or videos related to the topic within and in addition to the set of resources in the pack', 
	'Select a small number of texts to read aloud with some discussion about vocabulary work and background knowledge',
	'Provide audio recordings of the texts being read by a strong reader (teacher, parent, etc.)', 
	'Provide volunteer helpers from the school community during independent reading time.'].map(function(e) { return ['li', e]; })
						)
					]
				
				),
				'!ca3/i3d'
			]
			][app.subPage];
		},
		
		initView: function()
		{
			elaBase.createMCE('#twr1-text');
			elaBase.createMCE('#twr2-text');
			elaBase.createMCE('#twr3-text');
			elaBase.createMCE('#twr4-text');
		},

	};
