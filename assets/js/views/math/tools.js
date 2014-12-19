define(
    ['jquery', 'view-templates/math/tools.html', 'tinymce', 'views/math/_base'], 
    function ($, template, tinyMCE, mathBase)
{
	var tools = 
	{
		template: template,

		getViewMarkup: function()
		{
			tinymce.remove();
			
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
			return [ 
				mathBase.PDSimple('Selecting Tools', ['span', 'Mathematically proficient students consider the available tools when solving a mathematical problem. These tools might include pencil and paper, concrete models, a ruler, a protractor, a calculator, a spreadsheet, a computer algebra system, a statistical package, or dynamic geometry software. Proficient students are sufficiently familiar with tools appropriate for their grade or course to make sound decisions about when each of these tools might be helpful, recognizing both the insight to be gained and their limitations.',['br'],['br'],'For example, mathematically proficient high school students analyze graphs of functions and solutions generated using a graphing calculator. They detect possible errors by strategically using estimation and other mathematical knowledge. When making mathematical models, they know that technology can enable them to visualize the results of varying assumptions, explore consequences, and compare predictions with data. Mathematically proficient students at various grade levels are able to identify relevant external mathematical resources, such as digital content located on a website, and use them to pose or solve problems. They are able to use technological tools to explore and deepen their understanding of concepts.']),
				'!ca3/i3f'
				];
		},
		
		initView: function()
		{
			
			var updOther = function() {
				setTimeout(function() {
					$('.othertools').toggle( $('div[data-sid=tools-check12]').hasClass('selected') );
				}, 1);
			};
			$('div[data-sid=tools-check12]').off('click', updOther).on('click', updOther);
			
			updOther();

			mathBase.createMCE('#tool1-text');
		}

	};

	return tools;
});