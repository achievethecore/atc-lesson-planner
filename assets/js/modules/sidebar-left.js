/*

Overview: Left bar navigation and control.

Notes:
Mostly self contained. Makes a few calls to other modules to update their views as needed.
All navigation code is contained within this module. Contains pretty much any method needed
to update changes or trigger them in the nav, subnav, topnav, rightnav etc.

*/
var app = require('app');

var sidebarLeft = 
	{
		busy: false,
		state: 'expanded',
		duration: 0.01,
		easing: 'Power3.easeInOut',
		showingCategory: false,
		previewingCategory: false,
		subCategory: '0_0',
		compileMode: false,

		init: function()
		{
			// -- Define and monitor left bar heights, ugly but CSS is just weak with this.
			$(window).resize(function() {
  				sidebarLeft.configureHeights();
			});
			$(window).scroll(function() {
  				sidebarLeft.configureHeights();
			});
			$('.col-middle').resize(function() {
  				sidebarLeft.configureHeights();
			});

			sidebarLeft.configureHeights();
		},

		loadSidebar: function()
		{
			// -- Load data for lesson type
			//require(['modules/utils'], function(utils)
            //{
            	$('.col-left .interior-content .data').empty();
            	
            	var f = function(s) { if(typeof s == 'function') return s(require('modules/state-manager'), utils); return s; };
            	var views = utils.lessonType == 'ela' ? utils.elaViews : utils.mathViews;
            	var i = 0;
				var nodes = ['div', {class:'navigation'}].concat( 
					utils.getContent().Modules.map(function(m,m_i) { 
						return ['div', {class:'main-category'}, ['h1', m.title], 
							['ul'].concat(m.Sections.map(function(s,s_i){ 
								return ['li', ['a', 
									{href:'#', 
									class:'sm'+(m_i<1&&s_i<1?' active':''), 
									id:(m_i+'_'+(1+s_i)), 
									'data-view':(views[i++]), 
									'data-stype':'class', 
									'data-sid':'sb'+(s.sid || f(s.questions)[0].sid.split('-')[0] ), 
									'data-sloaded':'false'}, 
									f(s.title)] ]; 
							})) ]; 
						})).toDomNodes();
				
				$('.col-left .interior-content .data').append(nodes);
				// compile section
				var slugify = function(s) { return s.toLowerCase().replace(/[^a-z]+/g, '-'); };
				nodes = ['div', {class:'compile'}, ['div', {class:'main-category expanded'}, ['h1', 'Your Progress'], ['ul'].concat( 
					utils.getContent().Modules.map(function(m,m_i) { 
							return ['li', ['a', 
								{href:'#' + slugify(m.title), 
								class:m_i<1?'active':''}, 
								m.title] ];
						}))]].toDomNodes();
						
				
				
				$('.col-left .interior-content .data').append(nodes);
				
				$('.compile .main-category.expanded ul').append('<li class=attachednav><a href="#attached">Attached Documents</a></li>');


				//$('.col-left .interior-content .data').load('assets/js/view-templates/sidebar-left-' + utils.lessonType + '.html', function() 
				//{
					sidebarLeft.addListeners();
					sidebarLeft.addSubnavStateIndicators();
					sidebarLeft.configureHeights();
					setTimeout(sidebarLeft.makeFirstActive, 100);
					
					$('.col-left .data .compile').css('display', 'none');
					
					setTimeout(function() { $(document).trigger('sidebar-loaded.lpt'); }, 1);

					/*if (utils.lessonType == 'math' && utils.isHS()) {
						$('#grtext3').html('Course');
						$('#grtext3').parent().parent().parent().prev().text('Problems & Activities');
					}*/
				//});
            //});
		},

		configureHeights: function()
		{
			var contentHeight = $('.col-middle').height();
			var brHeight = $(window).height();
			var scroll = $('body').scrollTop();
			var leftHeight = $('.col-left .toggle').height();

			//if (!sidebarLeft.compileMode) {
				leftHeight+= $('.col-left .expanded-content').height();
			//}

			if (leftHeight<brHeight) {
				$('.col-left').css('position', 'fixed');
				$('.col-left .interior-content').css('height', '');
				$('.col-left .bottom').css('height', '');
				$('.col-left').css('height', '');
			} else {
				$('.col-left').css('position', 'absolute');
				if (contentHeight>leftHeight) {
					leftHeight = contentHeight;
				}

				var followMode = false;
				if (leftHeight<brHeight) {
					// leftbar doesn't need as much as the h of browser so expand it to fill
					leftHeight = brHeight;
					leftHeight -= 60;
					$('.col-left .bottom-menu-wrapper .bottom-menu').css('top', '');
				} else {
					// Browser is too small, make leftbar as tall as it needs to be and let the window scroll
					followMode = true;
				}

				$('.col-left').css('height', leftHeight+60+'px');
				//$('.col-right').css('height', (leftHeight+40)+'px');

				/* Bottom Positioning
				var expH = $('.col-left .expanded-content').height();
				var dH = $('.col-left .expanded-content .data').height();
				var bottom = expH - dH;
				var bottomWrapperTarget = bottom - 64;

				$('.col-left .bottom-menu-wrapper').css('height', bottomWrapperTarget + 'px');

				if (followMode) 
				{
					var pos = 0;

					var spaceAvail = $('.col-left .toggle').height() + $('.col-left .data').height();
					spaceAvail = brHeight - spaceAvail;
					spaceAvail -= 63; // compile+greytop
					pos = spaceAvail - 85;

					var bScroll = $('body').scrollTop();
					pos += bScroll;

					if (pos<25 || $('.col-left').css('position')=='fixed') {
						pos = 25;
					}
					$('.col-left .bottom-menu-wrapper .bottom-menu').css('top', pos + 'px');
				}
				*/
			}

			/* take 1
			$('.col-left').css('position', 'absolute');
				$('.col-left .interior-content').css('height', '100%');

				if (contentHeight>leftHeight) {
					var h = contentHeight-leftHeight;
					h+=253;
					$('.col-left .bottom').css('height', h + 'px');
				} else {
					$('.col-left .bottom').css('height', '');
				}

				var expH = $('.col-left .expanded-content').height();
				var dH = $('.col-left .expanded-content .data').height();
				var bottom = expH - dH;
				var bottomWrapperTarget = bottom - 64;
				$('.col-left .bottom-menu-wrapper').css('height', bottomWrapperTarget + 'px');

				var pos = 0;

				var spaceAvail = $('.col-left .toggle').height() + $('.col-left .data').height();
				spaceAvail = brHeight - spaceAvail;
				spaceAvail -= 63; // compile+greytop
				pos = spaceAvail - 85;

				var bScroll = $('body').scrollTop();
				pos += bScroll;

				if (pos<25 || $('.col-left').css('position')=='fixed') {
					pos = 25;
				}
				$('.col-left .bottom-menu-wrapper .bottom-menu').css('top', pos + 'px');
				*/
			
			/*
			var brHeight = $(window).height();
			var contentHeight = $('.col-middle').height();
			if (contentHeight>leftHeight) {
				leftHeight = contentHeight;
			}

			var followMode = false;
			if (leftHeight<brHeight) {
				// leftbar doesn't need as much as the h of browser so expand it to fill
				leftHeight = brHeight;
				leftHeight -= 60;
				$('.col-left .bottom-menu-wrapper .bottom-menu').css('top', '');
			} else {
				// Browser is too small, make leftbar as tall as it needs to be and let the window scroll
				followMode = true;
			}

			$('.col-left').css('height', leftHeight+'px');
			$('.col-right').css('height', (leftHeight+60)+'px');

			// Bottom Positioning
			var expH = $('.col-left .expanded-content').height();
			var dH = $('.col-left .expanded-content .data').height();
			var bottom = expH - dH;
			var bottomWrapperTarget = bottom - 64;

			$('.col-left .bottom-menu-wrapper').css('height', bottomWrapperTarget + 'px');

			if (followMode) 
			{
				var pos = 0;

				var spaceAvail = $('.col-left .toggle').height() + $('.col-left .data').height();
				spaceAvail = brHeight - spaceAvail;
				spaceAvail -= 63; // compile+greytop
				pos = spaceAvail - 85;

				var bScroll = $('body').scrollTop();
				pos += bScroll;

				if (pos<25 || $('.col-left').css('position')=='fixed') {
					pos = 25;
				}
				$('.col-left .bottom-menu-wrapper .bottom-menu').css('top', pos + 'px');
			}
			*/
		},

		addListeners: function()
		{
			// -- Main Navigation
			$('.col-left .toggle').unbind('click').click(function(event) 
			{
				
				//require(['app'], function(app) {
		            	require('app').showDashboard();
		        //});

				sidebarLeft.revertFromCompile();

		        
				return false;
			});

			$('.col-left .data .navigation .main-category').each(function(index, val) 
			{
				sidebarLeft.rebindMainCategory(index);

				if (index !== 0) {
					TweenLite.to($(this).find('ul'), 0.01, {autoAlpha:0});
				}
			});

			$('.col-left .data .navigation .main-category a').unbind('click').click(function(event) 
			{
				var btnId = $(this).attr('id');
				var parentId = btnId.substr(0, 1);
				var categoryId = btnId.substr(2, 1);

				// If its a new category all together handle it as routine
				if (sidebarLeft.subCategory != btnId) 
				{
					sidebarLeft.setActiveSub(btnId);

					var viewPath = $(this).attr('data-view');
					//require(['app'], function(app) {
							require('app').subPage = 0; 
		            	require('app').pushView(viewPath);
		            //});

		            sidebarRight.collapseForSectionChange();
				} else {
					// If you clicked the same subcategory check to see if we were previewing, close that out for tidyness
					sidebarLeft.closePreview();
				}

				return false;
			});



			// -- Main Navigation Bottom
			$('.col-left .bottom .btn1').unbind('click').click(function(event)
			{
				//require(['app'], function(app) {
		            require('app').startNewLesson();
		        //});
		        
				return false;
			});

			$('.col-left .btn-compile').unbind('click').click(function(event)
			{
				if (!sidebarLeft.busy && !sidebarLeft.compileMode)
				{
					sidebarLeft.busy = true;
					sidebarLeft.switchToCompile();

					//require(['app'], function(app) {
		            	require('app').pushView('../compile-lesson');
		            //});
				}

				return false;
			});


			// -- Compile Lesson

			$('body').off('click', '.compiled-lesson .btn:eq(0)').on('click', '.compiled-lesson .btn:eq(0)', function(event)
			{
				$('.dashboard .actions button').eq(0).click();
				return false;
			});
			
			$('body').off('click', '.compiled-lesson .btn:eq(1)').on('click', '.compiled-lesson .btn:eq(1)', function(event)
			{
				$('.dashboard .actions button').eq(1).click();

				return false;
			});
			
			$('body').off('click', '.compile ul li a').on('click', '.compile ul li a', function(event)
			{
				$('.compile a.active').removeClass('active');
				$(this).addClass('active');
				_gaq.push(['_trackEvent', 'Compiled Lesson', 'Jump Menu', this.href]);
			});

			$('body').off('click', '.compiled-lesson .btn:eq(2)').on('click', '.compiled-lesson .btn:eq(2)', function(event)
			{
				$('html').focus();
				window.print();
				_gaq.push(['_trackEvent', 'UI', 'Print']);
				
				return false;
			});

			$('body').off('click', '.compiled-lesson .instructional .btn').on('click', '.compiled-lesson .instructional .btn', function(event)
			{
				if ($('.col-middle .compiled-lesson .data').hasClass('showcai')) 
				{
					_gaq.push(['_trackEvent', 'Compiled Lesson', 'Remove CA / I']);
					$('.col-middle .compiled-lesson .data').removeClass('showcai');

				} else {
					_gaq.push(['_trackEvent', 'Compiled Lesson', 'Display CA / I']);
					$('.col-middle .compiled-lesson .data').addClass('showcai');
					
				}
					$('.compiled-lesson .radio-btns .btn:eq(0)').toggleClass('active', !$('.col-middle .compiled-lesson .data').hasClass('showcai'));
					$('.compiled-lesson .radio-btns .btn:eq(1)').toggleClass('active', $('.col-middle .compiled-lesson .data').hasClass('showcai'));

				return false;
			});

			/*$('body').on('click', '.col-left .btn-ipg', function(event)
			{
				var url = 'http://'+location.host+'/lesson-planning-tool/pdf2.php?url=';
				url += encodeURIComponent('http://'+location.host+'/lesson-planning-tool/ipg.php?id=' + utils.lessonId) + '&filename=IPG.pdf';
				window.open(url);

				_gaq.push(['_trackEvent', 'UI', 'In Page Guide']);

				return false;
			});*/


			// -- Trigger first scene, this may change in future once a lesson type screen is implemented
			var defaultCategory = $('.col-left .data .main-category').get(0);
			$(defaultCategory).trigger('click');
			//$('#0_1').trigger('click');
		},

		addSubnavStateIndicators: function()
		{
			// This just adds in the little pin/complete icons by code to keep the view templates cleaner
			$('.col-left .data .main-category ul li').each(function(index, val) 
			{
				var id = $(this).find('a').attr('id');
				var markup = '<span class="state-pin sm" data-stype="class" data-sloaded="false" data-sid="pin-' + id + '"></span>';
				markup += '<span class="state-complete sm" data-stype="class" data-sloaded="false" data-sid="complete-' + id + '"></span>';

				$(this).find('a').append(markup);
			});
		},

		rebindMainCategory: function(targetIndex)
		{
			var target = $('.col-left .data .main-category').get(targetIndex);
			$(target).unbind('click').bind('click', function()
			{
				var btnIndex = $(this).index();

				if (sidebarLeft.showingCategory === false)
				{
					sidebarLeft.showingCategory = btnIndex;
					sidebarLeft.toggleCategory(btnIndex);
				} else {
					if (sidebarLeft.showingCategory != btnIndex)
					{
						if (!$(this).hasClass('preview')) {
							sidebarLeft.previewCategory(btnIndex);
						} else {
							sidebarLeft.closePreview();
						}
					}
				}

				//$(this).unbind('click');

				return false;
			});
		},

		toggleCategory: function(targetIndex, override, preview)
		{
			var target = $('.col-left .data .main-category').get(targetIndex);
			target = $(target);

			if (!sidebarLeft.busy || override)
			{
				if (!target.hasClass('expanded')) 
				{
					if (preview) {
						target.addClass('preview');
					}
					target.addClass('expanded');

					$(target).find('ul').slideDown(500);
					TweenLite.to($(target).find('ul'), sidebarLeft.duration, {autoAlpha:1, ease:sidebarLeft.easing, onComplete:function()
					{
						if (!override) {
							sidebarLeft.busy = false;
						}
					}});
				} else {
					target.removeClass('expanded');
					target.removeClass('preview');

					$(target).find('ul').slideUp(500);
					TweenLite.to($(target).find('ul'), 0.03, {autoAlpha:0, ease:sidebarLeft.easing, onComplete:function()
					{
						if (!override) {
							sidebarLeft.busy = false;
						}
					}});
				}
			}

			setTimeout(sidebarLeft.configureHeights, 500);
		},

		previewCategory: function(targetIndex)
		{
			var target = $('.col-left .data .main-category').get(targetIndex);
			target = $(target);

			if (sidebarLeft.previewingCategory !== false) 
			{
				sidebarLeft.toggleCategory(sidebarLeft.previewingCategory, true);
				//sidebarLeft.rebindMainCategory(sidebarLeft.previewingCategory);
			}

			sidebarLeft.previewingCategory = targetIndex;
			sidebarLeft.toggleCategory(targetIndex, true, true);
		},

		setActiveSub: function(id, fromPrevNext)
		{
			if (id != sidebarLeft.subCategory)
			{
				var parentId = parseInt(id.substr(0, 1));
				var categoryId = parseInt(id.substr(2, 1));

				// Remove preview from parent
				$('#' + id).parent().parent().parent().removeClass('preview');

				// Basic Highlights
				$('.main-category a.active').removeClass('active');
				$('#' + id).addClass('active');
				//$('#' + sidebarLeft.subCategory).removeClass('active');

				// Check if in same category if not close the other one out
				if (sidebarLeft.showingCategory !== parentId)
				{
					// Hide previous category & reset its 'click'
					sidebarLeft.toggleCategory(sidebarLeft.showingCategory, true);
					//sidebarLeft.rebindMainCategory(sidebarLeft.showingCategory);
					
					// If you came from prev/next click than
					// this category is not yet shown so show it
					// If previewing the destination category, we don't need to toggle it
					var destinationHidden = fromPrevNext && (sidebarLeft.previewingCategory !== parentId);

					// No longer previewing
					sidebarLeft.previewingCategory = false;
					sidebarLeft.showingCategory = parentId;

					if (destinationHidden) {
						sidebarLeft.toggleCategory(sidebarLeft.showingCategory);
					}
				} else {
					// If we were previewing but chose one in the original category, go ahead and close the preview for tidyness
					sidebarLeft.closePreview();
				}

				sidebarLeft.subCategory = id;

				if (id == '0_1') {
					$('body').addClass('first-section');
				} else {
					$('body').removeClass('first-section');
				}
			}
		},

		closePreview: function()
		{
			if (sidebarLeft.previewingCategory !== false)
			{
				sidebarLeft.toggleCategory(sidebarLeft.previewingCategory, true);
				//sidebarLeft.rebindMainCategory(sidebarLeft.previewingCategory);
				sidebarLeft.previewingCategory = false;
			}
		},

		toggleStateIcon: function(id, state, value)
		{
			if (id == 'self') {
				id = sidebarLeft.subCategory;
			}
			
			var obj = 'Pin';
			if(state == 'complete') obj = 'Checkmark';
			if($('#'+id).find('.state-' + state).hasClass('active') !== value)
				_gaq.push(['_trackEvent', 'Nav Icon Toggle', (value ? 'Add ' : 'Remove ' ) + obj, $('#'+id).data('view') ]);

			if (value === true) {
				$('#'+id).find('.state-' + state).addClass('active');
			} else {
				$('#'+id).find('.state-' + state).removeClass('active');
			}
		},

		setToView: function(viewPath)
		{
			// Sets the navigation to correspond with the view being launched.
			// Currently called from a prev/next click in 'app'

			var subId = $('.col-left .data .main-category ul li').find('a[data-view="'+ viewPath +'"], a[data-view="'+ viewPath.replace(/-\d+$/,'') +'"]').attr('id');

			if (subId !== undefined && sidebarLeft.subCategory != subId) {
				sidebarLeft.setActiveSub(subId, true);
			}
		},

		switchToCompile: function()
		{
			sidebarLeft.compileMode = true;

			$('.col-left .data .compile').css('display', 'block');
			$('.col-left .data .navigation').css('display', 'none');
			$('.col-left .btn-compile').css('display', 'none');

			topBlock.hide();
			
			TweenLite.to($('.compile').find('ul').show(), 0.01, {autoAlpha:1});
			$('.compile ul li a').removeClass('active').eq(0).addClass('active');
			
			setTimeout( function() {
				$('.compile ul li.attachednav').toggle( $('a[name=attached]').length == 1 );
			}, 260); 

			sidebarLeft.busy = false;
		},

		revertFromCompile: function()
		{
			sidebarLeft.compileMode = false;
			$('.col-left .data .compile').css('display', 'none');
			$('.col-left .data .navigation').css('display', 'block');
			$('.col-left .btn-compile').css('display', 'block');

			topBlock.show();
			
			sidebarLeft.busy = false;
		},

		reset: function()
		{
			topBlock.reset();
			
			$('.col-left').css('position', 'absolute');

			sidebarLeft.showingCategory = false;
            sidebarLeft.previewingCategory = false;
            sidebarLeft.subCategory = '0_0';
            sidebarLeft.compileMode = false;


            sidebarLeft.revertFromCompile();
		},

		makeFirstActive: function()
		{
			$('.col-left .data .main-category ul li').each(function(index, val) 
			{
				if ($(this).find('a').attr('id')!='0_1') {
					$(this).find('a').removeClass('active');
				}
			});
		}
	};


module.exports = sidebarLeft;