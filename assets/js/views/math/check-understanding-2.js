define(
    ['jquery', 'modules/view', 'tinymce', 'views/math/_base'], 
    function ($, view, tinyMCE, mathBase)
{
	var id = 'cu1';
	
	var checkUnderstanding = 
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
					['h4', 'Thinking About Checks for Understanding'],
					' Effective teaching of mathematics uses evidence of student thinking to assess progress toward mathematical understanding and to adjust instruction continually in ways that support and extend learning.',
					'(The National Council of Teachers of Mathematics, Inc., ', ['i', 'From Principals to Actions'], ', p. 10 NCTM. 2014 www.nctm.org)',
					['br'],
					'What are teachers doing?',
					['ul'].concat(
						[
							'Identifying what counts as evidence of student progress toward mathematics learning goals.',
							'Eliciting and gathering evidence of student understanding at strategic points during instruction.',
							'Interpreting student thinking to assess mathematical understanding, reasoning, and methods.',
							'Making in-the-moment decisions on how to respond to students with questions and prompts that probe, scaffold, and extend.',
							'Reflecting on evidence of student learning to inform the planning of next instructional steps.'
						].map(function(e) { return ['li', e]; })
					),
					'What are students doing?',
					['ul'].concat(
						[
							'Revealing their mathematical understanding, reasoning, and methods in written work and classroom discourse.',
							'Reflecting on mistakes and misconceptions to improve their mathematical understanding.',
							'Asking questions, responding to, and giving suggestions to support the learning of their classmates.',
							'Assessing and monitoring their own progress toward mathematics learning goals and identifying areas in which they need to improve.'
						].map(function(e) { return ['li', e]; })
					),
					'(The National Council of Teachers of Mathematics, Inc., ', ['i', 'From Principals to Actions'], ', p. 56 NCTM. 2014 www.nctm.org)',
				],
				mathBase.PDSimple('Strategies', 'There are many techniques to check for understanding.  It will be important to use a variety of strategies to get a good sense of where students are and to be able to adjust the current lesson or next day\'s lesson accordingly (e.g., administering exit tickets, students self-assessing using fist to five, teacher recording observations of student understanding.)'),
				'!ca2/i2d'
				];
		},
		
		initView: function()
		{
			mathBase.createMCE('#'+id+'-text');
		},


	};

	return checkUnderstanding;
});