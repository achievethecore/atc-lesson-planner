define(
    ['jquery', 'view-templates/ela/literary-informational.html'],
    function($, template)
{
	var literaryInformational =
	{


		getViewMarkup: function(content)
		{
			var viewData = {};
			viewData.markup = template;
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
					['h4', 'Determining Qualitative Complexity'],
					'To determine the qualitative complexity, you need to review the text for specific features and then you will be asked to rate it on a rubric, ranging from slightly complex to exceedingly complex based upon your evidence.  The two features that are more influential are uncommon vocabulary and complex sentences.  What makes a text complex?',
					['ul'].concat(
[
['b','Uncommon vocabulary'],
['b','Complex sentences'],
'Dense information',
'Lack of words, sentences or paragraphs that review or pull things together for the student',
'Lengthy paragraphs',
'Text structure that is less narrative and/or mixes structures',
'Subtle and/or frequent transitions',
'Multiple and/or subtle themes and purposes',
'Unfamiliar settings, topics or events',
'Lack of repetition, overlap, or similarity in words and sentences'].map(function(e) { return ['li', e]; })
					)
				],
				['div',
					['h4', 'Evaluating Qualitative Features of Texts'],
					 'The Qualitative Rubric for Literary and Informational Texts is a tool to assist in evaluating the qualitative features of a text in order to place it within a grade band.  Understanding the unique features of a text can help you make intentional and text-specific instructional decisions as well.  For example, it may help you decide what kinds of questions to ask students or how best to support students with reading the text. There is one rubric for literary texts and another for informational texts, each detailing specific characteristics typically found in those types of texts.',
					 ['p', ['a', {href: 'http://achievethecore.org/content/upload/SCASS_Text_Complexity_Qualitative_Measures_Lit_Rubric_2.8.pdf', target:'_blank'}, 'SCASS Rubric for Literary Texts']],
					['p', ['a', {href: 'http://achievethecore.org/content/upload/SCASS_Info_Text_Complexity_Qualitative_Measures_Info_Rubric_2.8.pdf', target:'_blank'}, 'SCASS Rubric for Informational Texts']]
					 ],
				'!ca1/i1a'
			];
		},

		initView: function()
		{
			$('.btn-li').click(function(event)
			{
				var id = $(this).index();

				if(id === 0) $('#1_2').text('Meaning');
				if(id === 1) $('#1_2').text('Purpose');

				$('.btn-li').each(function(index, value)
				{
					if (index == id) {
						$(this).addClass('selected');
					} else {
						$(this).removeClass('selected');
					}
				});

				return false;
			});

			var tt = "The Common Core emphasizes giving all students access to complex text, which are texts characterized by the presence of academic vocabulary (tier 2), varied sentence structures, and other key features. The CCSS defines a model for determining how easy or difficult a particular text is to read based on qualitative and quantitative components. The following questions focus on the qualitative aspects of text complexity.";
			$('.i-tooltip').attr('title', tt);
			$('.i-tooltip').tooltip();
		}

	};

	return literaryInformational;
});
