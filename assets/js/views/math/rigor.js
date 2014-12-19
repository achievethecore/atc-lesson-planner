define(
    ['jquery', 'view-templates/math/rigor.html', 'modules/state-manager', 'views/math/_base', 'modules/utils'], 
    function ($, template, stateManager, mathBase, utils)
{
	var rigor = 
	{
		template: template,

		getViewMarkup: function()
		{
			var viewData = {};
			viewData.markup = this.template;
			viewData.smList = {};

			$(viewData.markup).find('.sm').each(function(index, val) 
			{
				var sId = $(this).attr('data-sid');
				viewData.smList[sId] = '1';
			});

			return viewData;
		},

		getHelpText: function() {
			var example = function(header, sub) {
				return mathBase.PDSimple(header, ['span', sub, ['br'], ['br'], 'Some examples of clusters or standards that call for '+header.toLowerCase()+' include:',
					['ul'].concat(_.filter(window.standardsData.aspect_examples, function(e) { return (((""+e.grade).toLowerCase() === utils.lessonGrade || (e.grade == "HS" && utils.isHS())) && e.aspect.toLowerCase() === header.toLowerCase()); }).map(function(e) {return ['li', e.standard, ['blockquote', e.text] ];}))
				]);
			};
			
			return [ 
				['div',
				['h4', 'Thinking About Rigor'],
	'One of the three instructional Shifts required by the Standards is rigor, which is defined as pursuing conceptual understanding, procedural skill and fluency, and application with equal intensity.  The Standards are written using language that informs the reader as to what aspect of rigor certain standards are addressing.  Some clusters or standards specifically require one aspect of rigor, some require multiple aspects. ',
['a', {href:'https://vimeo.com/92784227', target:'_blank'},'Click here to view a video explaining rigor.']
				],
				example('Conceptual Understanding', 'Students know the meaning behind the math'),
				example('Procedural Skill and Fluency', 'Students can quickly and accurately perform operations'),
				example('Application', 'Students can apply their skills and knowledge in real world situations').concat(
					!utils.isHS() ?
					['For additional information, read ', 
						['a', {href:'http://achievethecore.org/content/upload/Math_Publishers_Criteria_K-8_Spring_2013_FINAL.pdf', target:'_blank'}, 'Criterion #4 (pages 10 and 11) in the Publishers’ Criteria for the Common Core State Standards for Mathematics, Grades K–8 (Spring 2013).']]
					:
					['For additional information, read ', 
						['a', {href:'http://achievethecore.org/content/upload/Math_Publishers_Criteria_HS_Spring_2013_FINAL.pdf', target:'_blank'}, 'Criterion #2 (pages 9 and 10) in the Publishers’ Criteria for the Common Core State Standards for Mathematics, High School (Spring 2013).']]
				),

				/*(!utils.isHS() ? 
				['div', 
					['h5', 'Conceptual Understanding'],
'Some examples of clusters or Standards that call for conceptual understanding include: K.OA.A.1, (1.NBT.B, 1.NBT.C), (2.NBT.A, 2.NBT.B), (3.OA.A.1, 3.OA.A.2), 4.NF.A, (4.NBT.A, 4.NBT.B), 5.NF.B, (5.NBT.A, 5.NBT.B), 6.RP.A, 6.EE.A.3, 7.NS.A, 7.EE.A, 8.EE.B, 8.F.A, 8.G.A.  Clusters or Standards grouped by parentheses are closely connected.',
['blockquote', '4.NF.A: Extend ', ['u', 'understanding'],' of fraction equivalence and ordering. (Conceptual Understanding)'],
					['h5', 'Procedural Skill and Fluency'],
'Some examples of Standards that call for procedural skill and fluency include: K.OA.A.5, 1.OA.C.6, 2.OA.B.2, 2.NBT.B.5, 3.OA.C.7, 3.NBT.A.2, 4.NBT.B.4, 5.NBT.B.5, 6.NS.B.2, and 6.NS.B.3, 6.EE.A, 7.NS.A, 7.EE.A.1,7.EE.B.4a, 8.EE.C.7, 8.EE.C.8b',
['blockquote', '4.NBT.B.4: ', ['u', 'Fluently'],' add and subtract multi-digit whole numbers using the standard algorithm. (Fluency and Procedural Skill)'],
					['h5', 'Application'],
'Some examples of clusters or Standards that call for application include: K.OA.A.2, 1.OA.A, 2.OA.A, 3.OA.A.3, 3.OA.D.8, 4.OA.A.3, 4.NF.B.3d, 4.NF.B.4c, 5.NF.B.6, 5.NF.B.7c, 6.RP.A.3, 6.NS.A.1, 6.EE.B.7, 6.EE.C.9, 7.RP.A, 7.NS.A.3, 7.EE.B.3, 8.EE.C.8c, 8.F.B',
['blockquote', '4.OA.A.3: Decompose numbers less than or equal to 10 into pairs in  ', ['u', 'more than one way, e.g., by using objects or drawings, and record each decomposition by a drawing or equation'],' (e.g., 5 = 2 + 3 and 5 = 4 + 1) (Application)'],

'For additional information, read ', 
['a', {href:'http://achievethecore.org/content/upload/Math_Publishers_Criteria_K-8_Spring_2013_FINAL.pdf', target:'_blank'}, 'Criterion #4 (pages 10 and 11) in the Publishers’ Criteria for the Common Core State Standards for Mathematics, Grades K–8 (Spring 2013).']

				
					]
					:
				['div', 
'Some examples of clusters or Standards that call for conceptual understanding include: N-RN.A.1, A-APR.B, A-REI.A.1, A-REI.D.10, A.REI.D.11, F.IF.A.1, F-LE.A.1, G.SRT.A.2, G-SRT.C.6, S-ID.C.7',
['blockquote', 'A.APR.B: ', ['u', 'Understand'],' the relationship between zeros and factors of polynomials. (Conceptual Understanding)'],

'Some examples of Standards that call for procedural skill and fluency include: A-SSE.A.1b, A-SSE.2, A-APR.A.1, A-APR.C.6, F-BF.B.3, G-GPE.B.4, G-GPE.B.5, G-GPE.B.7, G-CO.A.1, G-SRT.B.5',
['blockquote', 'Understand that polynomials form a system analogous to the integers, namely, they are closed under the operations of addition, subtraction, and multiplication; ', ['u', 'add, subtract, and multiply polynomials'], '. (Fluency and Procedural Skill)'],

'Some examples of clusters or Standards that call for application include: N-Q.A, A-SSE.B.3, A-REI.D.11, F-IF.B, F-IF.C.7, F-BF.A.1, G-SRT.C.8, S-ID.A.2, S-IC.A.1 ',
['blockquote', ['u', 'Reason quantitatively'],' and use units to ',['u','solve problems'],'. (Application) '],

'For additional information, read', 
['a', {href:'http://achievethecore.org/content/upload/Math_Publishers_Criteria_HS_Spring_2013_FINAL.pdf', target:'_blank'}, 'Criterion #2 (pages 9 and 10) in the Publishers’ Criteria for the Common Core State Standards for Mathematics, High School (Spring 2013).']

				
					]
					),*/
				'!ca1/i1c'
				];
		},


		initView: function()
		{

			mathBase.loadStandards();
		},


	};

	return rigor;
});