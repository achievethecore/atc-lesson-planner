/*

Overview: Top nav states, loading/unloading the view/module for the top.

Notes:
Will handle the showing/hiding of the top hidden contents. Not much other functionality.
Actual top content code is contained in the correspoding views.

*/

define(
	['jquery', 'tweenlite'],
	function ($, TweenLite)
{
	var topBlock = 
	{
		busy: false,
		heightState: 'collapsed',
		widthState: 'expanded',
		duration: 0.5,
		easing: 'Power3.easeInOut',
		viewing: null,
		hidden: false,

		init: function()
		{
			$('.top-nav a').click(function(event) 
			{
				if (topBlock.heightState == 'collapsed') {
					$(this).addClass('active');
					topBlock.toggleHeight();
					topBlock.getView($(this).attr('data-view'));
				} else {
					if ($(this).hasClass('active')) {
						topBlock.toggleHeight();
					} else {
						topBlock.clearButtonStates();
						$(this).addClass('active');
						topBlock.getView($(this).attr('data-view'));
					}
				}
				
				return false;
			});
		},

		toggleHeight: function()
		{
			if (!topBlock.busy && topBlock.heightState == 'collapsed')
			{
				topBlock.busy = true;

				TweenLite.to($('.top-container'), topBlock.duration, {'height':'330px', ease:topBlock.easing, onComplete:function()
				{
					topBlock.heightState = 'expanded';
					topBlock.busy = false;
				}});

				TweenLite.to($('.top-container .top-interior'), topBlock.duration, {'top':'0px', ease:topBlock.easing});
			} else if (!topBlock.busy && topBlock.heightState == 'expanded')
			{
				topBlock.busy = true;
				
				TweenLite.to($('.top-container'), topBlock.duration, {'height':'0px', ease:topBlock.easing, onComplete:function()
				{
					topBlock.heightState = 'collapsed';
					topBlock.busy = false;
				}});
				
				TweenLite.to($('.top-container .top-interior'), topBlock.duration, {'top':'-330px', ease:topBlock.easing});

				topBlock.clearButtonStates();
			} 
		},

		toggleWidth: function(duration, easing)
		{
			// Called from: sidebar.toggleState()
			
			if (topBlock.widthState == 'collapsed')
			{
				TweenLite.to($('.top-container .logo-block'), duration, {'width':'315px', ease:easing, onComplete:function()
				{
					topBlock.widthState = 'expanded';
				}});

				TweenLite.to($('.top-container .top-content'), duration, {marginLeft:'315px', ease:easing});
				TweenLite.to($('.top-container img'), duration, {autoAlpha:1, ease:easing});
			} else if (topBlock.widthState == 'expanded')
			{
				TweenLite.to($('.top-container .logo-block'), duration, {'width':'60px', ease:easing, onComplete:function()
				{
					topBlock.widthState = 'collapsed';
				}});

				TweenLite.to($('.top-container .top-content'), duration, {marginLeft:'60px', ease:easing});
				TweenLite.to($('.top-container img'), duration, {autoAlpha:0, ease:easing});
			}
		},

		clearButtonStates: function()
		{
			$('.top-nav a').each(function(index, val) {
				$(this).removeClass('active');
			});
		},

		getView: function(viewPath)
		{
			if (topBlock.viewing != viewPath)
			{
				topBlock.viewing = viewPath;
				require(['views/'+viewPath, 'modules/state-manager'], function(view, stateManager)
	            {
	                $('.top-container .top-content').empty();
	                $('.top-container .top-content').html(view.getViewMarkup());

	                stateManager.update();
	                view.initView();

	                _gaq.push(['_trackEvent', 'Top Section', viewPath]);
	            });
			}
		},

		hide: function()
		{
			topBlock.hidden = true;

			if (topBlock.heightState == 'expanded') {
				topBlock.toggleHeight();
			}

			TweenLite.to($('.top-nav'), topBlock.duration, {autoAlpha:0, ease:topBlock.easing});
		},

		show: function()
		{
			if (topBlock.hidden)
			{
				topBlock.hidden = false;
				TweenLite.to($('.top-nav'), topBlock.duration, {autoAlpha:1, ease:topBlock.easing});
			}
		},

		reset: function()
		{
			$('.btn1-ela-li').css('display', 'none');
			$('.btn1-math-li').css('display', 'none');
			topBlock.hide();
			topBlock.viewing = null;
		}

	};

	return topBlock;
});