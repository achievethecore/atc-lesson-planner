define(
    ['jquery', 'view-templates/notes.html', 'modules/top-block'], 
    function($, template, topBlock)
{
	var notes = 
	{
		template: template,

		getViewMarkup: function()
		{
			var viewHtml = this.template;
			return viewHtml;
		},

		initView: function()
		{
			$('.top-container .close-btn').click(function(event) 
			{
				topBlock.toggleHeight();
				return false;
			});
		}

	};

	return notes;
});