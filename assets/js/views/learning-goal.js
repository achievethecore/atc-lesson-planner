define(
    ['jquery', 'view-templates/learning-goal.html', 'modules/top-block', 'modules/sidebar-left', 'app', 'modules/state-manager'], 
    function($, template, topBlock, sidebarLeft, app, stateManager)
{
	var learningGoal = 
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

			$('.top-container .learning-goal .edit-btn').click(function(event) 
			{
				app.pushView('learning-goal');
                sidebarLeft.setToView('learning-goal');

				return false;
			});

			$('#tlg').html(stateManager.dataJson['lg-mce']);
		}

	};

	return learningGoal;
});