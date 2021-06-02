
	module.exports =
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
			[
				elaBase.PDSimple('Reader and Task', 'Throughout this section, you will consider the reader and task as they relate to the text. This is the portion of the Lesson Planning Tool where you will consider how to meet the needs of the students as they engage in the work of the lesson.'),
				elaBase.PDSimple('Support', 'During the lesson, students should have multiple opportunities to interact with the text through reading, discussion, or writing. You should provide a variety of activities that allow for the students to interact with the text to develop understanding.'),

				(/^(k|1|2)$/.test(utils.lessonGrade) ?
				elaBase.PDSimple('Example', 'If students are listening to a text, I will ask students to recall details from the text which I will record on chart paper as a reference for later in the lesson.')
				:
				elaBase.PDSimple('Example', 'If students are reading a text, I will provide the students a guiding question that they will answer in small groups as they read a portion of the text aloud. As they read the text aloud in their groups, they will answer the question through discussion with group-partners, citing evidence from the text to support their answers.')),
				'!ca3/i3a'
			],
			[
				elaBase.PDSimple('Support',
				['div', 'Students will develop deeper understanding by productively struggling through texts and tasks. Productive struggle is different than frustration. Students who productively struggle ultimately develop reasoning and make meaning.']
				),
				elaBase.PDSimple('Example', 'I will use the Academic Word Finder to provide student-friendly definitions for unknown words.  This will focus students on engaging with the words in the context of the text.'),
				'!ca3/i3b'
			],	//For example, I will download the Wordsmyth widget to classroom computers/tablets for students to access student-friendly definitions for unknown words
			[
				(/^(k|1|2)$/.test(utils.lessonGrade) ?
				elaBase.PDSimple('Support', 'Using evidence from the text to support answers is one of the ELA Shifts and is an important skill for students. You can support students’ ability to use evidence from the text when speaking and writing about the text by asking probing questions and expecting precision in student responses.')
				:
				elaBase.PDSimple('Support', 'Using evidence from the text to support answers is one of the ELA Shifts and is an important skill for students. You can support students’ ability to use evidence from the text when speaking and writing about the text by asking probing questions and expecting precision in student responses.')),
				(/^(k|1|2)$/.test(utils.lessonGrade) ?
				elaBase.PDSimple('Example', 'Students will complete a graphic organizer by drawing or writing details from a text that has been read aloud to the class. These details may come from an anchor chart I have created.')
				:
				elaBase.PDSimple('Example', 'When students are given a text to read, I will provide them with a guiding question. I will ask them to answer the guiding question and use a highlighter to highlight the evidence that supports their answer to the guiding question. I will anticipate misconceptions and provide addtional prompting as needed.')),
				'!ca3/i3c'
			],
			[
				elaBase.PDSimple('Support',
					['div', 'Students can learn from each other through discussions about the text. For example, when students are given text-dependent questions to answer about a text or a selection of text, sharing their thinking through group discussions with their peers allows students to clarify or improve understanding.']
				),
				(/^(k|1|2)$/.test(utils.lessonGrade) ?
				elaBase.PDSimple('Example', 'I will read a story to the class aloud. Students will work with a shoulder partner and complete sentence frames that include key details about the story. To scaffold this lesson, I may include an anchor chart with details pre-recorded.')
				:
				elaBase.PDSimple('Example', 'I will select a portion of text from a larger text we are reading as a class. In small groups, the students will read the text together and annotate the text, identifying the key details and the key vocabulary of that section.')),
				'!ca3/i3d'
			]
			][app.subPage];
		},

		initView: function()
		{
			elaBase.createMCE('#twr1-text');
			elaBase.createMCE('#twr2-text');
			elaBase.createMCE('#twr3-text');
			elaBase.createMCE('#twr4-text');
		},

	};
