define(
    ['jquery', 'tinymce', 'modules/state-manager', 'views/math/_base'], 
    function ($, tinyMCE, stateManager, mathBase)
{
	var mathExp = 
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
					['h4', 'Thinking About Mathematical Explanations'],
					'Effective teaching of mathematics engages students in making connections among mathematical representations to deepen understanding of mathematics concepts and procedures and as tools for problem solving.',
					'(The National Council of Teachers of Mathematics, Inc., ', ['i', 'From Principals to Actions'], ', p. 10 NCTM. 2014 www.nctm.org)',
					['br'],
					'What are teachers doing?',
					['ul'].concat(
						[
							'Selecting tasks that allow students to decide which representations to use in making sense of the problems.',
							'Allocating substantial instructional time for students to use, discuss, and make connections among representations.',
							'Introducing forms of representations that can be useful to students.',
							'Asking students to make math drawings or use other visual supports to explain and justify their reasoning.',
							'Focusing students’ attention on the structure or essential features of mathematical ideas that appear, regardless of the representation.',
							'Designing ways to elicit and assess students’ abilities to use representations meaningfully to solve problems'
						].map(function(e) { return ['li', e]; })
					),
					'What are students doing?',
					['ul'].concat(
						[
							'Using multiple forms of  representations to make sense of and understand mathematics.',
							'Describing and justifying their mathematical understanding and reasoning with drawings, diagrams, and other representations.',
							'Making choices about which forms of representations to use as tools for solving problems.',
							'Sketching diagrams to make sense of problem situations.',
							'Contextualizing mathematical ideas by connecting them to real-world situations.',
							'Considering the advantages or suitability of using various representations when solving problems.'
						].map(function(e) { return ['li', e]; })
					),
					'(The National Council of Teachers of Mathematics, Inc., ', ['i', 'From Principals to Actions'], ', p. 29 NCTM. 2014 www.nctm.org)',
				],
['div', ['h4', 'Additional Resources'], 'In ', ['a', {href:'http://vimeo.com/92830193', target:'_blank'}, 'this video'], ', Phil Daro, a lead writer of the CCSS, stresses the value of teaching mathematics in greater depth and avoiding "clutter" in the curriculum using a series of specific examples.'],

				'!ca1/i2d'
				];
		},

		initView: function()
		{
			mathBase.createMCE('#me2-text');
			mathBase.createMCE('#me3-text');

			mathBase.loadStandards();
		}

	};

	return mathExp;
});