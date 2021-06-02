define(
    ['jquery', 'modules/view', 'modules/state-manager', 'tinymce'],
    function($, view, stateManager, tinymce)
{

	var id = 'kd';

	var meaningPurpose =
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
			// same in both versions
			var sec2list = ['ul'].concat(
					[
						'The text makes few assumptions about the extent of prior knowledge the reader has, for example ____.  The text explains or provides the necessary background knowledge for comprehension.',
						'The text makes many assumptions about the extent of prior knowledge the reader has, for example. ____.  The text does not explain or provide the necessary background knowledge for comprehension.',
						].map(function(e) { return ['li', e]; })
					);

			return stateManager.isInformational()?
			[
				['div',
					['h4', 'Determining Evidence'],
					'To determine the knowledge demands, try completing these sentences:',
					sec2list
				],
				['div',
					['h4', 'Determining Complexity'],
					'Texts that make few assumptions about the extent of prior knowledge and content/discipline knowledge are generally less complex than are texts that make many assumptions in one or more of those areas.'
				],
				elaBase.PDExamples(
					'Students will be exposed to extensive, specialized discipline-specific content knowledge.  While students who have background knowledge of the moon will have an advantage, this text will build a beginning foundation of the moon for students of all knowledge levels.',
					'The passage is self-contained, meaning that no outside knowledge is required. Students may or may not know the location of Chicago, but a lack of knowledge of that fact will not impact understanding. Also, no prior knowledge of the Great Fire is needed, as the text describes it fully. Students will need to infer that wood burns easily, but there is context in the text to support that inference.'
				),
				'!ca1/i1b'
			]
			:[
				['div',
					['h4', 'Determining Evidence'],
					'To determine the knowledge demands, try completing these sentences:',
					sec2list
				],
				['div',
					['h4', 'Determining Complexity'],
					'Texts that make few assumptions about the extent of prior knowledge and the depth of their cultural/literary and content/discipline knowledge are generally less complex than are texts that make many assumptions in one or more of those areas.'
				],
				elaBase.PDExamples(
					'Some knowledge of farm life helps in understanding the setting, but is not essential to have prior to reading the book. The text itself helps you build knowledge about life on a farm, spiders, and the seasons.',
					'The text explores multiple complex themes and describes experiences far removed from the average reader. There is no prior knowledge needed to gain access to the text; however, references to the Ninth Three-Year Plan will have greater impact on students familiar with Stalin’s five-year plans in Communist Russia.'
				),
				'!ca1/i1c'
			];
		},

		initView: function()
		{
			elaBase.createMCE('#'+id+'-text');

		}

	};

	return meaningPurpose;
});
