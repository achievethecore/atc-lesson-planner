define(
    ['jquery', 'modules/view'], 
    function($, view)
{
	var id = 'lexscore';
	
	var lexileScore = 
	{

		getViewMarkup: function(content)
		{
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
			return [ 
				['div', 
					['h4', 'Resources'],
					'Quantitative measures of text complexity are derived from computer formulas measuring specific features of a text. There are a wide variety of tools available to analyze a text quantitatively.',
					['ul'].concat(
						[
							['ATOS Analyzer – Renaissance Learning','http://www.renlearn.com/ar/overview/atos/'],
							['Degrees of Reading Power® – Questar','http://www.questarai.com'],
							['The Lexile Framework® – MetaMetrix','http://www.lexile.com/analyzer/'],
							['Coh-Metrix Easability Tool – University of Memphis (For Flesch-Kincaid measure)','http://141.225.42.101/cohmetrixgates/Home.aspx?Login=1'],
							['Reading Maturity – Pearson Knowledge Technologies','http://www.readingmaturity.com']
						].map(function(e) { return ['li', ['a', {href:e[1],target:'_blank'}, e[0]]]; })
					),
					'For more information on how to prepare the text for analysis, ',
					['a', {href:'/file/204', target:'_blank'}, 'click here.']
				],
				/*['div', {class:'has-image-missing'}, 'See above to view the grade band ranges for the various tools.'],*/
				'!ca1/i1b'
			];
		},


		initView: function()
		{
		
			var metrics =  [
							['2.75 – 5.14',
							'42 – 54',
							'1.98 – 5.34',
							'420 – 820',
							'3.53 – 6.13'],
							['4.97 – 7.03',
							'52 – 60',
							'4.51 – 7.73',
							'740 – 1010',
							'5.42 – 7.92'],
							['7.00 – 9.98',
							'57 – 67',
							'6.51 – 10.34',
							'925 – 1185',
							'7.04 – 9.57'],
							['9.67 – 12.01',
							'62 – 72',
							'8.32 – 12.12',
							'1050 – 1335',
							'8.41 – 10.81'],
							['11.20 – 14.10',
							'67 – 74',
							'10.34 – 14.2',
							'1185 – 1385',
							'9.57 – 12.00']];
			
			$('.checkbox').off('click').on('click', function() {
				var gradeband = 0;
				if( /^(4|5)$/.test(utils.lessonGrade) ) gradeband = 1;
				if( /^([6-8])$/.test(utils.lessonGrade) ) gradeband = 2;
				if( /^(9|10)$/.test(utils.lessonGrade) ) gradeband = 3;
				if( /^(11|12)$/.test(utils.lessonGrade) ) gradeband = 4;
				var tool = $(this).parent().index();
				if(tool === 2) tool = 3;
				else if(tool === 3) tool = 2; // swap F-K and Lex
				var metric = metrics[gradeband][tool];
				
				if( /^(k|1)$/.test(utils.lessonGrade) ) metric = undefined;
				
				$('.metreminder').remove();
				if(metric !== undefined)
					$('.data input').before('<p class=metreminder>As a reminder, your metric should fall between ' + metric + ' for your chosen tool and grade.</p>');
				if(/^(k|1)$/.test(utils.lessonGrade) )
					$('.data input').before('<p class=metreminder>In grades K – 1, text complexity is only considered for texts read aloud by the teacher for the development of listening and reading comprehension skills. Evaluations of text complexity are only applicable to student reading material in grade 2 and beyond.</p>'); 
			});

			//console.log('init view');
		}

	};

	return lexileScore;
});