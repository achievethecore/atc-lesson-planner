define(
    ['jquery', 'view-templates/math/addressing-rigor.html', 'tinymce', 'views/math/_base'], 
    function ($, template, tinyMCE, mathBase)
{
	var addRigor = 
	{
		template: template,

		getViewMarkup: function()
		{
			tinymce.remove();

			var viewData = {};
			viewData.markup = this.template;
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
				mathBase.PDSimple('Thinking about Rigor', 'Look back at the aspect of rigor you selected for this standard. Do the problems you have planned for your lesson address the aspect of rigor required by the standard?'),
				'!ca1/i1c'
				];
		},
		
		initView: function()
		{
			mathBase.createMCE('#addrigor-text');
		}

	};

	return addRigor;
});