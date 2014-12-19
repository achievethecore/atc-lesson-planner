define(
    ['jquery', 'tinymce', 'views/math/_base'], 
    function ($, tinyMCE, mathBase)
{
	var perseverance = 
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
					['h4', 'Thinking about Perserverance'],
					'Effective teaching of mathematics consistently provides students, individually and collectively, with opportunities and supports to engage in productive struggle as they grapple with mathematical ideas and relationships.',
					'(The National Council of Teachers of Mathematics, Inc., ', ['i', 'From Principals to Actions'], ', p. 10 NCTM. 2014 www.nctm.org)',
					['br'],
					'What are teachers doing?',
					['ul'].concat(
						[
							'Anticipating what students might struggle with during a lesson and being prepared to support them productively through the struggle.',
							'Giving students time to struggle with tasks, and asking questions that scaffold students’ thinking without stepping in to do the work for them.',
							'Helping students realize that confusion and errors are a natural part of learning, by facilitating discussions on mistakes, misconceptions, and struggles.',
							'Praising students for their efforts in making sense of mathematical ideas and perseverance in reasoning through problems.'
].map(function(e) { return ['li', e]; })
					),
					'What are students doing?',
					['ul'].concat(
						[
							'Struggling at times with mathematics tasks but knowing that breakthroughs often emerge from confusion and struggle.',
							'Asking questions that are related to the sources of their struggles and will help them make progress in understanding and solving tasks.',
							'Persevering in solving problems and realizing that is acceptable to say, “I don’t know how to proceed here,” but it is not acceptable to give up.',
							'Helping one another without telling their classmates what the answer is or how to solve the problem.'
].map(function(e) { return ['li', e]; })
					),
					'(The National Council of Teachers of Mathematics, Inc., ', ['i', 'From Principals to Actions'], ', p. 52 NCTM. 2014 www.nctm.org)',
				],
				mathBase.PDSimple('Perseverance in Problem Solving', 'Mathematically proficient students start by explaining to themselves the meaning of a problem and looking for entry points to its solution. They analyze givens, constraints, relationships, and goals. They make conjectures about the form and meaning of the solution and plan a solution pathway rather than simply jumping into a solution attempt. They consider analogous problems, and try special cases and simpler forms of the original problem in order to gain insight into its solution. They monitor and evaluate their progress and change course if necessary. Older students might, depending on the context of the problem, transform algebraic expressions or change the viewing window on their graphing calculator to get the information they need. Mathematically proficient students can explain correspondences between equations, verbal descriptions, tables, and graphs or draw diagrams of important features and relationships, graph data, and search for regularity or trends. Younger students might rely on using concrete objects or pictures to help conceptualize and solve a problem. Mathematically proficient students check their answers to problems using a different method, and they continually ask themselves, "Does this make sense?" They can understand the approaches of others to solving complex problems and identify correspondences between different approaches.'),
				'!ca3/i3b,i3g'
				];
		},

		initView: function()
		{
			mathBase.createMCE('#pers-text');
			mathBase.createMCE('#pers2-text');

		}

	};

	return perseverance;
});