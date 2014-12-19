define(
    ['jquery', 'view-templates/the-big-idea.html', 'modules/top-block', 'modules/sidebar-left', 'app', 'modules/state-manager', 'modules/utils'], 
    function($, template, topBlock, sidebarLeft, app, stateManager, utils)
{
	var theBigIdeaTop = 
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

			$('.top-container .my-big-picture .edit-btn').click(function(event) 
			{
				app.pushView('the-big-idea');
                sidebarLeft.setToView('the-big-idea');

				return false;
			});

			$('#mbp').html(stateManager.dataJson['tbp-mce']);
		}

	};

	return theBigIdeaTop;
});