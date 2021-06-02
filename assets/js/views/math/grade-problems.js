define(
    ['jquery', 'modules/utils', 'views/math/_base'],
    function ($, utils, mathBase)
{
	var gradeProblems =
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
					mathBase.PDCourseGrade('Thinking About Grade-Level Problems', 'Effective teaching of mathematics engages students in solving and discussing tasks that promote mathematical reasoning and problem solving and allow multiple entry points and varied solution strategies.'),
					'(The National Council of Teachers of Mathematics, Inc., ', ['i', 'From Principles to Actions'], ', p. 10 NCTM. 2014 www.nctm.org)',
					['br'],
					'What are teachers doing?',
					['ul'].concat(
						[
							'Motivating students’ learning of  mathematics through opportunities for exploring and solving problems that build on and extend their current mathematical understanding.',
							'Selecting tasks that provide multiple entry points through the use of varied tools and representations.',
							'Posing tasks on a regular basis that require a high level of cognitive demand.',
							'Supporting students in exploring tasks without taking over student thinking.',
							'Encouraging students to use varied approaches and strategies to make sense of and solve tasks.'
						].map(function(e) { return ['li', e]; })
					),
					'What are students doing?',
					['ul'].concat(
						[
							'Taking responsibility for making sense of tasks by drawing on and making connections with their prior understanding and ideas.',
							'Using tools and representations as needed to support their thinking and problem solving.',
							'Accepting and expecting that their classmates will use a variety of solution justify their strategies to one another.'
						].map(function(e) { return ['li', e]; })
					),
					'(The National Council of Teachers of Mathematics, Inc., ', ['i', 'From Principles to Actions'], ', p. 24 NCTM. 2014 www.nctm.org)',
				],
				['div',
					['h4', 'Additional Resources'],
				'Here are two free-resources for standards-aligned tasks and problems.',
				 ['br'],
				 ['a', {href:'http://www.illustrativemathematics.org', target:'_blank'}, 'Illustrative Mathematics'],
				 ['br'],
				 ['a', {href:'http://achievethecore.org/dashboard/300/search/1/2/0/1/2/3/4/5/6/7/8/9/10/11/12/page/786/annotated-tasks-list-pg', target:'_blank'}, 'Achieve the Core']
				],
				'!ca3/i3a'
				];
		},

		initView: function()
		{
			mathBase.createMCE('#grp-text');

			if (utils.isHS()) {
				$('#grtext1').html('COURSE');
				$('.main-h1 #grtext1').html('Course');
				$('#grtext2').html('course');
			}
			else {
				$('.main-h1 #grtext1').html('Grade');
			}
		},

	};

	return gradeProblems;
});
