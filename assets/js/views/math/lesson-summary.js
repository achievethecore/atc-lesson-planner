define(
    ['jquery', 'tinymce', 'views/math/_base'], 
    function ($, tinyMCE, mathBase)
{
	var lessonSummary = 
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
					['h4', 'Thinking about the Lesson Summary'],
					'Effective teaching of mathematics facilitates discourse among students to build shared understanding of mathematical ideas by analyzing and comparing student approaches and arguments.',
					'(The National Council of Teachers of Mathematics, Inc., ', ['i', 'From Principals to Actions'], ', p. 10 NCTM. 2014 www.nctm.org)',
					['br'],
					'What are teachers doing?',
					['ul'].concat(
						[
'Ensuring progress toward  mathematical goals by making explicit connections to student approaches and reasoning.'
].map(function(e) { return ['li', e]; })
					),
					'What are students doing?',
					['ul'].concat(
						[
'Identifying how different approaches to solving a task are the same and how they are different.'
].map(function(e) { return ['li', e]; })
					),
					'(The National Council of Teachers of Mathematics, Inc., ', ['i', 'From Principals to Actions'], ', p. 35 NCTM. 2014 www.nctm.org)',
				],
				'!ca2/i2e'
				];
		},
		
		initView: function()
		{
			mathBase.createMCE('#ls1-text');
			mathBase.createMCE('#ls2-text');
		}

	};

	return lessonSummary;
});