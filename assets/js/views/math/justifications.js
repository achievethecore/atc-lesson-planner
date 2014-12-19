define(
    ['jquery', 'view-templates/math/justifications.html', 'tinymce', 'views/math/_base'], 
    function ($, template, tinyMCE, mathBase)
{
	var justifications = 
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
				'!ca3/i3g'
				];
		},
		
		initView: function()
		{
			mathBase.createMCE('#just-text');
		}

	};

	return justifications;
});