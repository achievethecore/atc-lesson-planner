define(
    ['jquery', 'view-templates/math/structuring-discussion.html', 'tinymce', 'views/math/_base'],
    function ($, template, tinymce, mathBase)
{
	var structuringDiscussion =
	{
		template: template,

		getViewMarkup: function()
		{
			tinymce.remove();

			var viewData = {};
			viewData.markup = this.template;
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
					['h4', 'Thinking about Structuring Discussions'],
					'Effective teaching of mathematics facilitates discourse among students to build shared understanding of mathematical ideas by analyzing and comparing student approaches and arguments.',
					'(The National Council of Teachers of Mathematics, Inc., ', ['i', 'From Principles to Actions'], ', p. 10 NCTM. 2014 www.nctm.org)',
					['br'],
					'What are teachers doing?',
					['ul'].concat(
						[
'Engaging students in purposeful sharing of mathematical ideas, reasoning, and approaches, using varied representations.',
'Selecting and sequencing student approaches and solution strategies for whole-class analysis and discussion.'
].map(function(e) { return ['li', e]; })
					),
					'What are students doing?',
					['ul'].concat(
						[
'Presenting and explaining ideas, reasoning, and representations to one another in pair, small-group, and whole-class discourse.',
'Listening carefully to and critiquing the reasoning of peers, using examples to support or counterexamples to refute arguments.'
].map(function(e) { return ['li', e]; })
					),
					'(The National Council of Teachers of Mathematics, Inc., ', ['i', 'From Principles to Actions'], ', p. 35 NCTM. 2014 www.nctm.org)',
				],
				'!ca2/i2a,i2b'
				];
		},

		initView: function()
		{
			mathBase.createMCE('#scd1-text');
			mathBase.createMCE('#scd2-text');
		}

	};

	return structuringDiscussion;
});
