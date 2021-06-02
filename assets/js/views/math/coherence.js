define(
    ['jquery', 'modules/view', 'tinymce', 'modules/state-manager', 'modules/utils', 'views/math/_base'],
    function ($, view, tinymce, stateManager, utils, mathBase)
{
	var id = 'coh';

	var coherenceFW =
	{
		template: function() {
			return view.view(id,
			[
				(mathBase.hasMajorWork() ?
					view.header('Determine Coherence and Major Work', 'How does this work connect to previous or future work in the grade?')
				:
				mathBase.hasSupportingWork() ?
					view.header('Determine Coherence and Supporting Work', 'If applicable, how does this supporting work of the grade connect to the major work of the grade and what will I do to make that connection? ')
				:
				mathBase.hasAdditionalWork() ?
					view.header('Determine Coherence and Additional Work', 'How does this work connect to work in previous or future grades and what will I do to make that connection?')
				:
					view.header('Determine Coherence and Off Grade Level Work', 'Why am I covering content from a different grade level and how does it connect to on-grade level work?')
					),
					view.standardsSelectedContainer(),
				view.mce(id),
				view.prevnext()
			]
			);
		},

		getViewMarkup: function(content)
		{
			tinymce.remove && tinymce.remove();

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
					['h4', 'Thinking About Coherence'],
					'Coherence means to think across grades and link to major topics within grades, and is one of the major shifts required by college- and career-ready standards.',
					['ul',
						['li', 'Thinking across grades and courses: CCR-standards are designed around coherent progressions of mathematical ideas.  Learning is carefully connected so that students can build new understanding onto foundations built in previous years. Each standard is not a new event, but an extension of previous learning.'],
						['li', 'Consider how the standard(s) you will be teaching tie into previous and future learning. Designing your lesson with this in mind will help students make sense of the learning goal.']
					],
					//'Consider how the standard(s) you will be teaching tie into previous and future learning. Designing your lesson with this in mind will help students make sense of the learning goal.',
					/*(!utils.isHS()) ? ['p',
					'A detailed graphic created by CCSSM lead writer Jason Zimba shows the connections among standards within and across grades K–8; an excerpt of this graphic is shown above.  An interactive version of the graphic is available ',
					['a', {href:'http://achievethecore.org/content/upload/ccssmgraph.pdf', 'target':'_blank'}, 'here'],
					'. After following the link, save the PDF and open using a PDF reader for interactivity. Best viewing is at 50% to 70% zoom'
        ]:*/['br'],
						'A video explaining coherence can be found ',
						['a', {href:'https://vimeo.com/92784230', target:'_blank'}, 'here'],
						'.'
				],
				['div',
					['h4', 'Progressions in the Standards'],
					 'The ',
					['a', {href:'http://achievethecore.org/page/254/progressions-documents-for-the-common-core-state-standards-for-mathematics-detail-pg', target:'_blank'}, 'progression documents'],
            ' are helpful in tracing standards back to previous grades to ensure your lesson\'s content is built on student\'s prior knowledge. Similarly, the documents also articulate the mathematical content students are preparing for.  Knowing the full progression of mathematical content for your targeted standard(s) will strengthen your lesson as well as be useful in scaffolding for struggling students or challenging advanced students.'
				]
				].concat(true?[
				/*['div', 'For example (for standards 3.OA.A.1 & 3.OA.B.5)',['blockquote', 'Work in this lesson builds on the experience students had in 2nd grade with arrays (2.OA.C.4) to connect to the understanding of multiplication as equal groups. To help students see the connection between equal groups of objects and arrays, arrays should be formatted so that the rows are clearly arranged as groups (see problem #1 below).']],*/
				'!ca1/i1b'
				]:['!ca1/i1a']);
		},

		initView: function()
		{
			mathBase.createMCE('#'+id+'-text');

			mathBase.loadStandards();
		}
	};

	return coherenceFW;
});
