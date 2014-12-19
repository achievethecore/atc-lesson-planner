define(
    ['jquery', 'modules/view', 'modules/state-manager', 'tinymce'], 
    function($, view, stateManager, tinyMCE)
{
		
	var id = 'mp';
	
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
			return stateManager.isInformational()?
			[
				['div',['h4', 'Determining Purpose'],
				'Informational texts with an explicitly stated purpose are generally easier to comprehend than informational texts with an implicit, hidden, or obscure purpose.  Try completing this sentence, "The purpose of this text is..."',
				],
				elaBase.PDExamples(
					'The meaning of the text is explicitly stated.  Students will learn about our Earth’s moon.',
					'The purpose of the text is to provide information about the causes of the Great Fire while illustrating the experience of everyday people who experienced it. These purposes are relatively clear and apparent.'
				),
				'!ca1/i1c'
			]
			:[
				['div',['h4', 'Determining Meaning'],
				'Literary texts with a single level of meaning tend to be easier to read than literary texts with multiple levels of meaning.   Try completing this statement about your text, "The central idea of this text is..."',
				],
				elaBase.PDExamples(
					'Wilbur himself realizes that “…friendship is one of the most satisfying things in the world.” This is the big understanding of this chapter book; as Wilbur realizes it, so do the students. And as we go on this journey with Wilbur, the students are also building knowledge about the world: farm life, spiders and their life cycle, the passing of seasons.',
					'There are multiple themes in this text, including: oppression cripples human beings; paranoia is a powerful tool for control; and technology can be used to monitor our private lives. Due to multiple themes, this text is considered complex.'
				),
				'!ca1/i1c'
			];
		},

		initView: function()
		{
			elaBase.createMCE('#mp-text');
		}

	};

	return meaningPurpose;
});