/*

Overview: Misc

Notes:

*/



	var utils = 
	{
		lessonType: null,
		lessonId:null,
		lessonGrade: null,

		shareId: null,
		
		elaViews: [
			'lesson-info', 'text-choice', 'text-complexity', 'text-analysis', 'lexile-score',
			'literary-informational', 'meaning-purpose', 'text-structure', 'language-features', 'knowledge-demands',
			'the-big-idea', 'culminating-task',
			'texts-worth-reading', 'work-worth-doing',
			'text-based-questions',
			'vocabulary',
			'standards'			
		],
		mathViews: [
			'lesson-info', 'clusters-standards', /*'focus',*/ 'coherence', 'learning-goal', 'rigor', 'math-explanations-2', 'grade-problems', 'check-understanding-2', 'discussion-questions', 
			'selected-standards', 'key-mathematics', 'math-explanations', 'math-language',
			'coherence-pk', 'coherence-fw', 
			'adapting-lesson', 'student-thinking', 'perseverance', 'justifications', 'solution-methods', 'tools', 'addressing-rigor',
			'check-understanding', 'feedback-revision',
			'structuring-discussion', 'student-discussions', 'lesson-summary'
		],
		
		elaSections: [
			{
				title:"Planning a Standards-Aligned Close-Reading Lesson",
				before:"In this section, you will closely examine your text for quantitative complexity. This is the first step in planning a close-reading lesson.",
				after:"You determined that your text is appropriately complex, quantitatively.  You should have a good sense of whether or not the text belongs in your grade band.",
				img: "LPT_Icons_SVG_ela_choosing",
				completion_header: "You're off to a great start in planning your standards-aligned close-reading lesson, {name}!",
				completion_sub: "We encourage you to explore the additional modules below to continue to align your lesson to the Common Core.  We recommend you continue with the quantitative text evaluation, but you are free to explore them in any order.",
				link: "lesson-info"
			},
			{
				title:"Evaluating for Qualitative Text Complexity",
				before:" In this section, you will closely examine your text for qualitative complexity. This is an important step in planning a close-reading lesson.",
				after:"You determined that your text is appropriately complex, qualitatively.  Now you should have a better sense of whether this text is appropriate for your grade.",
				img: "LPT_Icons_SVG_ela_vocabulary",
				completion_header: "Keep going!",
				completion_sub: "Now that you have analyzed your text for qualitative complexity, we recommend that you consider your text focusing on Reader and Task.",
				link: "literary-informational"
			},
			{
				title:"The Big Idea & Culminating Task",
				before:"In this section you will determine the \"big idea\" of the text.  Once you determine the big idea, you will then create the culminating task that will assess if students have learned the big idea.",
				after:"You have determined the big idea for your text and the culminating activity.  As you explore additional modules, you may find that you want to come back and revise the big idea or culminating task to be more precise.",
				img: "LPT_Icons_SVG_ela_bigidea",
				completion_sub: "Great work! You can always revisit this section if you want to further refine your big idea or culminating activity.  We recommend you continue to determine the text-dependent questions that will help to scaffold student understanding to the big idea and help them complete the culminating activity.",
				link: "the-big-idea"
			},
			{
				title:"Reader and Task",
				before:"Once you know that your text is appropriate qualititavely and quantitatively, it is important to consider your students, the supports they will need and the work you will ask them to do. ",
				after:"You determined that your text is appropriate for your students, and defined how you can support your students through the text.",
				img: "LPT_Icons_SVG_ela_engaging",
				completion_sub: "Keep it up!  Now that you have considered Reader and Task to confirm this text is right for your students, we recommend you determine the big idea and culminating activity.",
				link: "texts-worth-reading"
			},
			{
				title:"Text-Dependent Questions, Activities and Tasks",
				before:"You will create text-dependent questions and activities to go along with those questions, and determine the vocabulary that is most important to teach.",
				after:"You created text-dependent questions to scaffold students to learning the big idea, and activities to support them in completing the culminating activity.  Additionally, you determined the vocabulary you will address.",
				img: "LPT_Icons_SVG_ela_questions",
				completion_sub: "Creating and sequencing your text-dependent questions is hard work.  Great job, {name}!",
				link: "text-based-questions"
			},
			{
				title:"Add Standards",
				before:"You will select the standards addressed in your close-reading lesson.",
				after:"You selected the standards addressed in your close-reading lesson.  You can always come back and add or remove standards.",
				img: "LPT_Icons_SVG_ela_standards",
				link: "standards"
			}
		],
		mathSections: [
			{
				title:"Planning a Standards-Aligned Lesson",
				before:"This tool is designed to guide you through the process of planning a standards-aligned lesson. Through this process you will closely examine the lesson standard(s), define the learning goal, determine how you will check for student understanding, and specify how you will help students share their mathematical thinking.",
				after:"You defined the standard(s) addressed in the lesson, including the aspect of rigor required, the math content, learning goal, how you plan to check for student understanding and help students share their mathematical thinking.",
				img: "LPT_Icons_SVG_math_Start",
				link: "lesson-info"
			},
			{
				title:"Mathematics of the Lesson",
				before:"Deeply examine lesson standard(s) to develop a lesson that meets the depth of expectations defined by the standard(s), the common misconceptions students may have, and define the mathematical language you expect from students.",
				after:"You examined the lesson standard(s) to develop a lesson that meets the depth of expectations defined by the standard(s), considered common student misconceptions, and defined the mathematical language you expect students to use.",
				img: "LPT_Icons_SVG_math_mathcontent",
				link: "selected-standards"
			},
			{
				title:"Coherent Connections",
				before:"You will consider the prior knowledge and unfinished learning in order to plan what you will say to make mathematical connections for students. You will also consider how this lesson connects to future work.",
				after:"You have planned what you will say and do to make mathematical connections for students, and how this lesson ties to future work.",
				img: "LPT_Icons_SVG_math_progression",
				link: "coherence-pk"
			},
			{
				title:"Problems & Exercises",
				before:"You will analyze the problems and exercises in order to: share mathematical thinking, encourage perseverance, determine support and/or extension activities, and the tools students may need accessible.",
				after:"You analyzed the problems and exercises in order to: share mathematical thinking, encourage perseverance, determine support and/or extension activities, and the tools students may need accessible.",
				img: "LPT_Icons_SVG_math_problems",
				link: "adapting-lesson"
			},
			{
				title:"Formative Assessment Strategies",
				before:"You will consider how you will use the information from the checks you do throughout the lesson, the feedback you will provide to students, and if they will have the opportunity to revise their work.",
				after:"You determined how you will use the information from the checks you do throughout the lesson, the feedback you will provide to students, and if they will have the opportunity to revise their work.",
				img: "LPT_Icons_SVG_math_check",
				link: "check-understanding"
			},
			{
				title:"Classroom Discussion",
				before:"Consider what concepts you will focus on during discussion and how you will: select and sequence student responses, encourage students to share their thinking, and summarize the lesson to reinforce the lesson objective(s).",
				after:"You determined the concepts you will focus on during discussion and how you will: select and sequence student responses, encourage students to share their thinking, and summarize the lesson to reinforce the lesson objective(s).",
				img: "LPT_Icons_SVG_math_discussion",
				link: "structuring-discussion"
			}
		],
		
		mathBuckets: {
			me: {name: 'Mathematical Explanations', q:'me1-mce'},
			coh: {name: 'Coherence', q:'coh-mce'},
			grp: {name: 'Grade-Level Problems', q:'grp-mce'},
			rigor: {name: 'Rigor', q:'ar-check'},
			cfu: {name: 'Checks for Understanding', q:'cu1-mce'},
			dq: {name: 'Discussion Questions', q:'dq1-mce'}
		},
		
		getDashboardSections: function(lessonType, currentViewPath)
		{
			if(utils.lessonType == 'math')
				return utils.mathSections;
			return utils.elaSections;
		},
		
		getContent: function()
		{
			if(utils.lessonType == 'math')
				return Content.Math;
			return Content.ELA;
		},
		
		getContentSection: function(viewPath)
		{
			var views = utils.elaViews;
			if (utils.lessonType == 'math') {
				views = utils.mathViews;
			}
			
			return _.chain(utils.getContent().Modules).map(function(a) { return a.Sections; } ).flatten().value()[ views.indexOf(viewPath) ];
		},

		getNextView: function(lessonType, currentViewPath)
		{
			var data = utils.elaViews;
			if (lessonType == 'math') {
				data = utils.mathViews;
			}

			var nextView;
			for (var i=0; i<data.length; ++i) 
			{
				var view = data[i];
				if (view == currentViewPath) {
					nextView = data[i+1];
				}
			}

			return nextView;
		},

		getPrevView: function(lessonType, currentViewPath)
		{
			var data = utils.elaViews;
			if (lessonType == 'math') {
				data = utils.mathViews;
			}

			var nextView;
			for (var i=0; i<data.length; ++i) 
			{
				var view = data[i];
				if (view == currentViewPath) {
					nextView = data[i-1];
				}
			}

			return nextView;
		},

		nl2br: function(str, is_xhtml) {
    		var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    		return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
		},

		isHS: function()
		{
			//
			if (utils.lessonGrade == '9' || utils.lessonGrade == '10' || utils.lessonGrade == '11' || utils.lessonGrade == '12') {
				return true;
			} else {
				return false;
			}
		},
		
		gradeOrCourse: function() {
			return (utils.isHS() ? 'course' : 'grade');
		}
		
	};

	module.exports = utils;