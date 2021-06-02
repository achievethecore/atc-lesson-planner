define(
    ['jquery', 'modules/view', 'modules/utils', 'tinymce'], 
    function ($, view, utils, tinymce)
{
	var theBigPicture = 
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

		initView: function()
		{
			var tt = 'The Common Core emphasizes the building of knowledge through reading complex text and engaging in the use of evidence from texts.  In particular, reading standard 2 requires students to determine central ideas of informational texts or themes of literary texts.  It is through understanding those big ideas within and among texts that students build knowledge through reading.';
			$('.i-tooltip').attr('title', tt);
			$('.i-tooltip').tooltip();

			elaBase.createMCE('#tbp-text', function(editor) {
				theBigPicture.updateTop(editor.getContent());
			});
		}, 
		
		getHelpText: function() {
			return [ 
				['div', 
					['h4', 'Determining Big Idea'],
					'When determining the Big Idea, consider the following questions.',
					['ul'].concat(
[
'What are the central ideas of the text?  Think:  Content, Information, Ideas',
'What do I want my students to know after reading?',
'What do I want to understand after reading?',
'How do these ideas relate to and fit in with your larger unit of study or module?'
].map(function(e) { return ['li', e]; })
					),
					'It is recommended to use Backwards Design to determine the Big Idea before the specific questions and tasks for the lesson.  Teachers often return to the Big Idea to further refine it throughout the lesson planning process.' 
				],
				['div', 
					['h4', 'Engaging with Evidence'],
					'The Common Core emphasizes the building of knowledge through reading complex text and engaging in the use of evidence from texts. In particular, reading standard 2 requires students to determine central ideas of informational texts or themes of literary texts. It is through understanding those big ideas within and among texts that students build knowledge through reading.'
				],
				elaBase.PDExamples(
					'Wilbur himself realizes that “…friendship is one of the most satisfying things in the world.” This is the big understanding of this chapter book; as Wilbur realizes it, so do the students. And as we go on this journey with Wilbur, the students are also building knowledge about the world: farm life, spiders and their life cycle, the passing of seasons.',
					'Students should understand the causes of The Great Fire and recognize factors that influenced its spread.',
					true
				),
				'!ca1/i1c'
			];
		},
		

		updateTop: function(txt)
		{
			$('#mbp').html(txt);

			if ($('.top-nav .btn1-ela-li').css('display') == 'none') {
				$('.top-nav .btn1-ela-li').css('display', 'inline-block');
			}
		},

		createMCE: function(id)
		{
			tinymce.init({
				selector: id,
				height: 325, 
				toolbar: "bold italic underline | bullist", 
				plugins: "paste", 
				paste_as_text: true, 
				menubar: false, 
				statusbar: false, 
				browser_spellcheck: true,
				setup: function(editor)
				{
					editor.on('change', function(event) 
					{
						editor.save();
						theBigPicture.updateTop(editor.getContent());
					});

					var placeholder = $('#' + editor.id).attr('placeholder');
					if (typeof placeholder !== 'undefined' && placeholder !== false)
					{
						var is_default = false;
						editor.on('init', function()
						{
					    	var cont = editor.getContent();
					        if (cont.length === 0)
					        {
					          editor.setContent(placeholder);
					          cont = placeholder;
					          is_default = true;
					        }
					  	})
						.on('focus', function()
						{
							//if (placeholder == editor.getContent()) {
					        if (is_default) {
					          editor.setContent('');
					        }
					    })
					    .on('blur', function()
					    {
					    	var cont = editor.getContent();
					    	if (cont.length === 0) {
					    		editor.setContent(placeholder);
					    		is_default = true;
					    	} else {
					    		is_default = false;
					    	}
					    });
					}
				}
			});
		}

	};

	return theBigPicture;
});