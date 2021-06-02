define(
    ['jquery', 'tinymce'],
    function ($, tinymce)
{
	var studentDiscussions =
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
				['div',
					['h4', 'Thinking about Student-Driven Discussions'],
					'Effective teaching of mathematics facilitates discourse among students to build shared understanding of mathematical ideas by analyzing and comparing student approaches and arguments.',
					'(The National Council of Teachers of Mathematics, Inc., ', ['i', 'From Principles to Actions'], ', p. 10 NCTM. 2014 www.nctm.org)',
					['br'],
					'What are teachers doing?',
					['ul'].concat(
						[
'Facilitating discourse among students by positioning them as authors of ideas, who explain and defend their approaches.'
].map(function(e) { return ['li', e]; })
					),
					'What are students doing?',
					['ul'].concat(
						[
'Seeking to understand the approaches used by peers by asking clarifying questions, trying out others’ strategies, and describing the approaches used by others.'
].map(function(e) { return ['li', e]; })
					),
					'(The National Council of Teachers of Mathematics, Inc., ', ['i', 'From Principles to Actions'], ', p. 35 NCTM. 2014 www.nctm.org)',
				],
				['div',
					['h4', 'Additional Resources'],
					['p', 'For some questioning prompts and ideas, ',
						['a', {href:'https://www.pbslearningmedia.org/resource/ea6a2ce8-5e15-4efa-af55-5685971ea0d4/ea6a2ce8-5e15-4efa-af55-5685971ea0d4', target:'_blank'}, 'here'],
            ['span', ' is a resource from PBS.']
					]
				],
				'!ca3/i3c,i3d'
				];
		},

		initView: function()
		{
			mathBase.createMCE('#sd1-text');
			mathBase.createMCE('#sd2-text');
		}

	};

	return studentDiscussions;
});
