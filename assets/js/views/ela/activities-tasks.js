define(
    ['jquery', 'modules/view', 'tinymce'], 
    function($, view, tinyMCE)
{
	var activitiesTasks = 
	{
		

		getViewMarkup: function(content)
		{
			tinymce.remove();

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

		initView: function()
		{
			activitiesTasks.createMCE('#at-text');
		},

		createMCE: function(id)
		{
			tinymce.init({
				selector: id,
				height: 325, 
				toolbar: "bold italic underline | bullist", 
				plugins: "paste", 
				paste_as_text: true, 
				menubar: false, 
				statusbar: false, 
				browser_spellcheck: true,
				setup: function(editor)
				{
					editor.on('change', function(event) {
						editor.save();  
					});

					var placeholder = $('#' + editor.id).attr('placeholder');
					if (typeof placeholder !== 'undefined' && placeholder !== false)
					{
						var is_default = false;
						editor.on('init', function()
						{
					    	var cont = editor.getContent();
					        if (cont.length === 0)
					        {
					          editor.setContent(placeholder);
					          cont = placeholder;
					          is_default = true;
					        }
					  	})
						.on('focus', function()
						{
					        if (is_default) {
					          editor.setContent('');
					        }
					    })
					    .on('blur', function()
					    {
					    	var cont = editor.getContent();
					    	if (cont.length === 0) {
					    		editor.setContent(placeholder);
					    		is_default = true;
					    	} else {
					    		is_default = false;
					    	}
					    });
					}
				}
			});
		}

	};

	return activitiesTasks;
});