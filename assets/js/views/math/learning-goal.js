define(
    ['jquery', 'modules/state-manager', 'views/math/_base'], 
    function ($, stateManager, mathBase)
{
	var learningGoal = 
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
					['h4', 'Thinking About the Learning Goal'], 
					'Effective teaching of mathematics establishes clear goals for the mathematics that students are learning, situates goals within learning progressions, and uses goals to guide instructional decisions.',
					'(The National Council of Teachers of Mathematics, Inc., ', ['i', 'From Principals to Actions'], ', p. 10 NCTM. 2014 www.nctm.org)',
					['br'],
					'What are teachers doing?',
					['ul'].concat(
						[
'Establishing clear goals that articulate the mathematics that students are learning as a result of instruction in a lesson, over a series of lessons, or throughout a unit.',
'Identifying how the goals fit within a mathematics learning progression.',
'Discussing and referring to the mathematical purpose and goal of a lesson during instruction to ensure that students understand how the current work contributes to their learning.',
'Using the mathematics goals to guide lesson planning and reflection and to make in-the-moment decisions during instruction.'].map(function(e) { return ['li', e]; })
					),
					'What are students doing?',
					['ul'].concat(
						[
'Engaging in discussions of the mathematical purpose and goals related to their current work in the mathematics classroom (e.g., What are we learning? Why are we learning it?)',
'Using the learning goals to stay  focused on their progress in improving their understanding of mathematics content and proficiency in using mathematical practices.',
'Connecting their current work with the mathematics  that they studied previously and seeing where the mathematics is going.',
'Assessing and monitoring their own understanding and progress toward the mathematics learning goals.'].map(function(e) { return ['li', e]; })
					),
					'(The National Council of Teachers of Mathematics, Inc., ', ['i', 'From Principals to Actions'], ', p. 16 NCTM. 2014 www.nctm.org)',
				],
				/*['div', ['h4', 'Example'], 'For example (for standards 3.OA.A.1 & 3.OA.B.5):',
					['blockquote', 'Students will recognize arrays as a representation of equal groups and translate  them into language and notation of multiplication']
					],*/
				'!ca1/i1a'
				];
		},

		initView: function()
		{
			mathBase.createMCE('#lg-text', function(editor) {  learningGoal.updateTop(editor.getContent()); });
			mathBase.loadStandards();
		},

		updateTop: function(txt)
		{
			$('#tlg').html(txt);

			if ($('.top-nav .btn1-math-li').css('display') == 'none') {
				$('.top-nav .btn1-math-li').css('display', 'inline-block');
			} 
		},

	};

	return learningGoal;
});