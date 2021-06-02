define(
    ['jquery', 'modules/view', 'tinymce'],
    function($, view, tinymce)
{
	var workWorthDoing =
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
			return [[
				elaBase.PDSimple('Support',
					/^(k|1|2)$/.test(utils.lessonGrade) ?
					'Students gain understanding of a text at different paces, and students may read different grade-level complexities in the same classroom. Offering supports and scaffolding for students will ensure all students gain understanding of the essential ideas during the lesson. During whole-class discussions and small group discussions, asking students clarifying questions can help gauge the types of scaffolding and support students may need. Being prepared with texts or scaffolds that meet the needs of students reading below or above grade-level texts will help students be more successful.'
					:
          'Students gain understanding of a text at different paces, and students may read different grade-level complexities in the same classroom. Offering supports and scaffolding for students will ensure all students gain understanding of the essential ideas during the lesson. During whole-class discussions and small group discussions, asking students clarifying questions can help gauge the types of scaffolding and support students may need. Being prepared with texts or scaffolds that meet the needs of students reading below or above grade-level texts will help students be more successful.'),
        ['div',
					['h4', 'Example'],
					['p', 'I will provide ELL students with the tools from ',
						['a', {href:'https://achievethecore.org/content/upload/ELL%20Supports%20for%20Writing%20and%20Discussion.pdf', target:'_blank'}, 'Scaffolds to Support English Language Learners in Writing and Discussion'],
            ' from the Achieve the Core website. This includes sentence frames and starters, signal words, and word banks. These can be adapted to meet the needs of the students.'
					]
				],
				'!ca3/i3e'
			],
			[
				elaBase.PDSimple('Support',
					/^(k|1|2)$/.test(utils.lessonGrade) ?
					'While an ELA lesson may focus on reading literature or reading informational standards, it is important that grammar and conventions, writing, and discussion rules are incorporated into each lesson. While these skills and/or standards may not be the focus of the lesson, it is important that students are getting regular practice with these skills.'
					:
          'While an ELA lesson may focus on reading literature or reading informational standards, it is important that grammar and conventions, writing, and discussion rules are incorporated into each lesson. While these skills and/or standards may not be the focus of the lesson, it is important that students are getting regular practice with these skills.'),
          /^(k|1|2)$/.test(utils.lessonGrade) ?
          elaBase.PDSimple('Example', 'I will provide pre-reading activities that focus on the structure, grammar, conventions, graphic elements, and foundational skills of the text.')
          :
          ['div',
  					['h4', 'Example'],
  					['p', 'When students are doing a close, independent read of the text, or they are working in small groups doing a close read of a text, I will have them use the ',
  						['a', {href:'https://achievethecore.org/content/upload/Juicy%20Sentence%20Protocol.pdf', target:'_blank'}, 'Juicy Sentence '],
              'strategy for unpacking sentences to help build understanding. The Juicy Sentence strategy helps students unpack complex sentences to build understanding and make meaning.'
  					]
  				],
				'!ca3/i3f'
			]
			][app.subPage];
		},

		initView: function()
		{
			elaBase.createMCE('#wwd1-text');
			elaBase.createMCE('#wwd3-text');
		},


	};

	return workWorthDoing;
});
