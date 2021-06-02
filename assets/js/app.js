/*

Overview: Main app file. Inits most other modules and basic functions. View loading

Notes:
Tried to keep this pretty minimal and force each module to be mostly self contained so we are not boxed in down the road.
It does however monitor some global things that werent worthy of their own modules (pins, checkboxes, [i]tooltips, etc).

One bigger thing is the compile lesson edit and fill this in buttons are controlled from here. I did this since
app.js has access to all the different modules that will need to be called upon. Ratehr than requiring them in compile.

*/



    var app =
    {
    	quickView: '',
        currentView: '',
        prevView: '',
        onNext: undefined,
        subPage: 0,
        local: (false && navigator.userAgent === 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.104 Safari/537.36'),

        initialize: function()
        {
            // -- Setup Fastclick to remove 300ms delay on mobile touches
            //new FastClick(document.body);

            // -- Components
            landing.init();
            account.init();
            stateManager.init();
            sidebarLeft.init();
            sidebarRight.init();
            topBlock.init();


            // -- Misc Components
            app.configPins();
            app.configNP();
            app.configCheckboxes();
            app.configureCompileButtons();


            // -- Outbound link tracking
            $(document).on('click', "a[href^='htt']:not([href*='"+window.location.hostname+"'])", function() {
                _gaq.push(['_trackEvent', 'Outbound Links' , $(this).attr('href')]);
            });

            $(document).on('click', "a[href^='mailto']", function() {
                _gaq.push(['_trackEvent', 'UI', 'Send Us Feedback']);
            });


            // -- Local Entrance
            if (app.local)
            {
            	account.username = 'Jane Doe';
                utils.local = true;
                utils.lessonType = 'ela';
                utils.lessonId = 0;
                utils.lessonGrade = "2";
                $('body').addClass(utils.lessonType);
                app.startLesson();
            }
        },

        startLesson: function()
        {
            // -- Check if MBP/LG should be shown
            if (stateManager.dataJson.mbp !== undefined && stateManager.dataJson.mbp !== '')
            {
                if (utils.lessonType == 'ela') {
                    $('.top-nav .btn1-ela-li').css('display', 'inline-block');
                } else {
                    $('.top-nav .btn1-math-li').css('display', 'inline-block');
                }
            }

            window.wasComplete = [];


            // -- Show it
            sidebarLeft.loadSidebar();

            $('.top-container').css('display', 'block');
            $('.col-container').css('display', 'block');

            //$(document).one('sidebar-loaded.lpt', function() {
				//app.showDashboard();
				setTimeout(app.showDashboard, 170); // after statemanager updates progress
            	TweenLite.to($('.landing'), 0.5, {autoAlpha:0, onComplete:function(){ $('.landing').css('display', 'none');} });

			//});

			// default to All Sections when re-loading
			$('#exportModal .dropdown ul a:last').click();


			sidebarRight.toggleState();


        },

        showDashboard: function()
		{
			window.clearInterval(window.dashInterval);
			window.dashInterval = setInterval( function() { $('div.tile-icon').each(function(){ var frame = $(this).data('frame')||0; if(frame < 70) frame++; $(this).css({'background-position': -94*(frame % 10) +'px ' + -78*Math.floor(($(this).parent().is(':hover')?8:0)+frame/10) + 'px'}).data('frame', frame); }); }, 17);

			setTimeout(function() {
				$('.col-container').css('display', 'none');
			}, 500);

			$('.dashboard').addClass('show');
			$('.landing').hide();


			$('html,body').animate({scrollTop:0}, 500);

			app.updateDashboard();

		},

        hideDashboard: function()
		{
			$('.col-container').css('display', 'block');
			$('.dashboard').removeClass('show');
			setTimeout(function() {
				$('.dashboard').css('display', 'none');
			}, 500);
		},

		animateTileOut: function($tile) {
			var offset = $tile.offset();
			var tileanim = $("<div class=tileanim>").css({
				top: offset.top,
				left: offset.left,
				right: $tile[0].offsetParent.offsetWidth - $tile[0].offsetWidth - offset.left,
				bottom: $tile[0].offsetParent.offsetHeight - $tile[0].offsetHeight - offset.top,
			});
			$tile.after(tileanim);
			//$tile.css({'z-index': 2, transition: '0.5s ease opacity', opacity:1.0});

			$('html,body').animate({scrollTop:0}, 500);

			setTimeout(function() {
				$tile.css('opacity', 0);
				$('.tileanim').css({top:0,left:0,right:0,bottom:0});

			}, 1);
			setTimeout(function() {
				app.hideDashboard();
			}, 333);





		},

		updateDashboard: function()
		{
			$('.profile-dropdown').off('mouseenter mouseleave').bind('mouseenter', function() { $(this).find('.dropdown-menu').addClass('in'); }).bind('mouseleave', function() { $(this).find('.dropdown-menu').removeClass('in'); });

			$('.profile-dropdown li a').eq(0).off('click').click(function() {
				app.startNewLesson();
				return false;
			});
			$('.profile-dropdown li a').eq(1).off('click').click(function() {
				$('#savedModal').modal();
				return false;
			});
			$('.profile-dropdown li a').eq(2).off('click').click(function() {
				account.getProfile(true);
				return false;
			});
			$('.profile-dropdown li a').eq(3).off('click').click(function() {
				_gaq.push(['_trackEvent', 'Account', 'Log Out']);
				$.get('logout.php',function() {
		            location.reload();
		        });
			});


			$('.actions button').eq(0).off('click').click(function() {
				//$('#emailModal').modal();
				//return false;

				$('#emailModal').modal();

				if($('#emailModal .radio-btns .active').length === 0) {
					$('#emailModal .radio-btns .btn:first-child').addClass('active');
				}
				$('#emailModal .radio-btns .btn').off('click').click(function() {
					$(this).closest('.radio-btns').find('.active').removeClass('active');
					$(this).addClass('active');
					return false;
				});

				return false;
			});

			$('.actions button').eq(1).off('click').click(function() {
				$('#exportModal').modal();

				$('#exportModal .dropdown ul').empty().append(utils.getDashboardSections().map(function(a) {
					return ['li', ['a', {href:'#'}, a.title] ].toDomNodes();
				}).concat(['li', ['a', {href:'#'}, 'All Sections']].toDomNodes()));
				$('#exportModal .dropdown ul a').click(function() {
					$('#exportModal .dropdown .toggle data').text(this.innerHTML);
					$('#exportModal .dropdown').data('selected', $(this).parent().is(':last-child') ? -1 : $(this).parent().index());
					//return false;
				});

				if($('#exportModal .radio-btns .active').length === 0) {
					$('#exportModal .radio-btns .btn:first-child').addClass('active');
					$(this).closest('form').find('.dropdown').toggle($('#exportModal .view-type .btn:eq(0)').hasClass('active'));
				}
				$('#exportModal .radio-btns .btn').off('click').click(function() {
					$(this).closest('.radio-btns').find('.active').removeClass('active');
					$(this).addClass('active');
					$(this).closest('form').find('.dropdown').toggle($('#exportModal .view-type .btn:eq(0)').hasClass('active'));
					return false;
				});

				$('#export-submit').off('click').click(function() {
					var php = 'pdf2';
					var filename = 'LessonPlan.pdf';
					var trackingsuffix = '';
					if($('#exportModal .file-format .btn').eq(1).hasClass('active')) {
						php = 'doc';
						filename = 'LessonPlan.doc';
						trackingsuffix = ' (DOC)';
					}
					var url = 'https://'+location.host+'/lesson-planning-tool/'+php+'.php?url=';
					var ipgtype = false;
					if($('#exportModal .view-type .btn').eq(0).hasClass('active')) {
						url += encodeURIComponent('https://'+location.host+'/lesson-planning-tool/plan.php?id=' + utils.lessonId + '&section=' + $('#exportModal .dropdown').data('selected') ) + '&filename='+filename;
					}
					else {
						ipgtype = true;
						url += encodeURIComponent('https://'+location.host+'/lesson-planning-tool/ipg.php?id=' + utils.lessonId) + '&filename='+filename;
					}
					window.open(url);

					_gaq.push(['_trackEvent', 'UI', 'Export', (ipgtype ? 'Coaching View' : 'Lesson Plan View') + trackingsuffix]);
				});


				return false;
			});
			$('.actions button').eq(2).off('click').click(function() {
				 $('.dashboard .tiles a:last').click();
				 var printcheck = setInterval(function() {
				 	if($('.compiled-lesson h1').length > 0 && $(':animated').length === 0 ) {
				 		setTimeout(function() { window.print(); }, 300);
						 clearInterval(printcheck);
				 	}
					}, 250);
				return false;
			});

			$('.download-questions').attr('href', 'assets/pdf/' + utils.lessonType.replace(/^[a-z]/, function(m){ return m.toUpperCase() }) + '_LPT_Questions.pdf');

			$('.download-questions').unbind('click').click(function() {
				_gaq.push(['_trackEvent', 'UI', 'Download All Questions']);
			});

			$('.dashboard .tiles')[0].innerHTML = utils.getDashboardSections().map(function(a) {
				/* jshint laxbreak:true */
				return ('<div class="tile">'
				+'<div class="check">'
				+'<span class="vis-inprogress">In Progress</span></div>'
				/*+'<img src="assets/imgs/'+a.img+'.svg" class="tile-icon">'*/
				+$('.svg-preload.' + a.img).html()
				+'<h3>'+a.title+'</h3>'
				+'<p class="vis-inprogress">'+a.before+'</p>'
				+'<p class="vis-complete"><span>WHAT YOU ACCOMPLISHED:</span>'+a.after+'</p>'
				+'<a href="#'+a.link+'" class="np view-next">START</a></div>');
			}).join('');

			var firstname = (account.username||'').split(' ')[0];


			$('.dashboard .tiles .tile').click(function() {
				app.pushView($(this).find('a')[0].href.split('#')[1]);
				app.animateTileOut($(this));
				//app.hideDashboard();
				return false;
			});

			$('.dashboard .tile').each(function(index) {
				var completed_sections = $('.main-category').eq(index).find('.state-complete.active').length;
				var total_sections = $('.main-category').eq(index).find('.state-complete').length;
				$(this).toggleClass('inprogress', completed_sections > 0 && completed_sections < total_sections);
				if(window.wasComplete[index] === true || window.wasComplete[index] === undefined) {
					$(this).toggleClass('complete', completed_sections == total_sections);
					$('.complete svg').each( function() { $(this).replaceWith('<div data-frame="70" class="tile-icon">');   } );
				}
				else if(completed_sections == total_sections) {
					setTimeout((function() {
						$(this).toggleClass('complete', completed_sections == total_sections);


						$('.complete svg').each( function() { $(this).replaceWith('<div data-frame="0" class="tile-icon" />');   } );

						// cancel scroll-to-top, center completed tile
						$('html,body').stop();
						$('html,body').animate({scrollTop: $(this).position().top - ($(window).height() - 440)/2 }, 225);

					}).bind(this), 1);
				}
				window.wasComplete[index] = completed_sections == total_sections;




				/*var section = utils.getDashboardSections()[index];
				if(completed_sections == total_sections) {
					if(section.completed_header)
						$('.dashboard h1').text(section.completed_header.replace('{name}', firstname));
					if(section.completed_sub)
						$('.dashboard h2').text(section.completed_sub.replace('{name}', firstname));
				}*/
			});

			var dashmsg = 'After completing the top module, feel free to complete the remaining modules in any order.';
			if(utils.lessonType === 'ela') dashmsg = 'After completing the top module, we recommend you complete the following modules in order.';
			$('.dashboard .tile').eq(0).after('<div class="tile-notice">'+dashmsg+'</div>');

			$('.dashboard .tiles').append(['div', {class:'tile tile-final'},
				['h3', 'Click here to check your progress at any point along the way'],
				['ul'].concat(
					utils.getDashboardSections().map(function(e) { return ['li', e.title]; })
				),
				['a', {href:'#progress', class:'np view-next'}, 'SEE PROGRESS']
			 ].toDomNodes());

			 $('.dashboard .tiles .tile:last').click(function() {
			 	app.hideDashboard();
			 	$('.col-left .btn-compile').click();
				if (sidebarRight.state == 'expanded') {
					sidebarRight.toggleState();
				}
			 	return false;
			 });


			$('.dashboard #profilenamelink').text(account.username||'');



		},

        startNewLesson: function()
        {
            stateManager.update(true);
            stateManager.halt();

            app.hideDashboard();

            // -- Configure & show landing
            landing.getSelectScreen();
            $('.landing').css('display', 'block');
            TweenLite.to($('.landing'), 0.5, {autoAlpha:1, delay:0.2,
                onComplete:function()
                {
                    topBlock.reset();
                    stateManager.reset();
                    sidebarLeft.reset();
                    $('.col-middle .data').empty();
                    $('.col-left .expanded-content .data').empty();
                    $('.top-content').empty();
                    stateManager.reset();
                    $('.top-container').css('display', 'none');
                    $('.col-container').css('display', 'none');
                    stateManager.resume();

                    account.loadSavedLessons();

                }
            });
        },

        pushView: function(viewPath)
        {
            //viewPath = 'standards';

            // -- This is for coming back from compile
            if (viewPath == '!prev')
            {
                viewPath = app.prevView;
                topBlock.show();
            }

			// don't wait until view loads...
			sidebarLeft.setToView(viewPath);

            // -- Load view
            var path = utils.lessonType + '/' + viewPath;
            if(/\.\./.test(viewPath)) path = viewPath.replace(/\.\.\//, '');

            app.quickView = path;
            var view = require('views/' + path);
			(function(view)
            {
                TweenLite.to($('.col-middle .data'), 0.25, {autoAlpha:0, onComplete:function()
                {
					var content = utils.getContentSection(viewPath);
                    var viewData = view.getViewMarkup(content);
                    $('.col-middle .data').empty();
                    $('.col-middle .data').html(viewData.markup);

                    if(!$('.main-h1 .btn-strive').length && view.getHelpText && view.getHelpText())
                    	$('.main-h1').append('<div class="header-buttons"><a href="#" class="btn-strive"></a></div>');


                    if(utils.lessonType === 'math' && $('.standards-selected').length === 0 && stateManager.dataJson['standards-tags']) {
                    	if($('.view.clusters-standards, .view.li').length === 0)
                    		$('.main-h1').eq(0).after('<div class="connected-bucket panel standards-selected"><a href="#bucket-standards-tags" data-toggle="collapse" class="collapsed"><p>Standards Selected</p><span></span></a> <div class="collapse" id="bucket-standards-tags"><span class="standards-list"></span></div></div>');
                    }

                    $('.btn-strive').empty().eq(0).html('EXAMPLES & SUPPORT <span></span>');

                    // fix up legacy html
                    if($('.main-h1').length && !$('.main-h1').find('p').length) $('.main-h1').wrapInner('<p>').eq(0).prepend(
						$('.data .sub').html().toLowerCase().replace(/(?:(^.{1})|\ [a-z]{1})/g, function(a){return a.toUpperCase();})
					);

                    stateManager.activeFields = viewData.smList;
                    stateManager.update();

                    app.onNext = viewData.onNext;

                    sidebarRight.getHelpText = view.getHelpText;

					// tinymce can mess up the scroll position on creation. it's probably 0 but just in case
					var oldScroll = ( $('html')[0].scrollTop || $('body')[0].scrollTop || 0 );

                    view.initView();

                    // desperately try to load standards here instead of adding it to every old view?
                    if(utils.lessonType === 'math' && $('.standards-btn').length === 0) {
                    require(['views/math/_base'], function(mathBase)
            			{
            				mathBase.loadStandards();

            			});
                    }

                    //connected buckets
                    if(utils.lessonType === 'math') {
	                    var currentSection = _.chain(utils.mathSections).filter(function(a) { return utils.mathViews.indexOf(a.link) <= utils.mathViews.indexOf(viewPath) }).last().value();

	                    var activeBuckets = (content && content.refs) ? content.refs.split(',') : [];
	                    activeBuckets = _.map(activeBuckets, function(a) { return utils.mathBuckets[a]; });

	                    _.each(activeBuckets, function(bucket) {
	                    	var val = stateManager.dataJson[bucket.q];
	                    	var question = _.chain(utils.getContent().Modules).pluck('Sections').flatten().map(function(s) { if(typeof s.questions == 'function') return s.questions(stateManager, utils); return s.questions; }).flatten().findWhere({sid:bucket.q}).value();

	                    	if(bucket.q == 'ar-check') // rigor case
	                    		val = _.chain([null,'Conceptual understanding', 'Procedural skill and fluency', 'Application']).map(function(e,i) { return /selected/.test(stateManager.dataJson['ar-check'+i]) ? e : undefined }).compact().value().join(', ');

	                    	if(!val) return;
	                    	$('.main-h1').eq(0).add('.connected-bucket').last().after(['div', {class:'connected-bucket panel'}, ['a', {href:'#bucket'+bucket.q, 'data-toggle':'collapse', 'data-parent':'.view', class:'collapsed'}, ['p', question.header||bucket.name], ['span']],
		                    	['div', {class:'collapse', id:'bucket'+bucket.q},
		                    		['p', question.text||''],
		                    		['blockquote']
								]
							].toDomNodes());
	                    	$('.view .connected-bucket blockquote').last().html(val);
	                    	$('.view .connected-bucket .collapse').collapse({toggle: false});
	                    });
	                    $('.connected-bucket').eq(0).before('<h4>For reference:</h4>');


	                    //module 1 warning
	                    if(currentSection !== utils.mathSections[0]) {
	                    	$('.warnings .module-1').toggleClass('shown', !$('.tile').eq(0).hasClass('complete') );
	                    	$('.warnings .module-1 .close').off('click').on('click', function() {
	                    		$('.warnings .module-1').addClass('dismissed');
	                    		return false;
	                    	});
	                    	$('.warnings .module-1 a:eq(0)').off('click').on('click', function() {
	                    		app.showDashboard();
								return false;
	                    	});
                    	}
                    	else { // on module 1, hide
                    		$('.warnings .module-1').removeClass('shown');
                    	}
                    }
                    else { // on ela, hide
                      $('.warnings .module-1').removeClass('shown');
                    }

                    //sidebarRight.collapseForSectionChange();
                    //sidebarRight.loadPageStandards();
                    sidebarRight.currentSection = 0;
                    sidebarRight.updateHelp();

                    sidebarLeft.configureHeights();
                    sidebarLeft.setToView(viewPath);

                    app.prevView = app.currentView;
                    app.currentView = viewPath;

                    _gaq.push(['_trackEvent', 'Section', viewPath]);

                    $('html,body').prop('scrollTop', oldScroll).animate({scrollTop:0}, 500);

                    app.showView();

                    if(utils.lessonType === 'math' && !(stateManager.dataJson['standards-tags'] || stateManager.dataJson['cs-other']) && !/^(clusters-standards|lesson-info)/.test(app.currentView)) {
					$('.col-middle .data').empty().append(['div', {class:'screen-error'},
						['h1', {class:'main-h1'}, 'In order to complete this step you must finish Standard and/or Cluster choice.'],
						''].toDomNodes());
            		}

                    if(utils.lessonType === 'math' && /^(MP\.\d+,?)+$/.test(stateManager.dataJson['standards-tags']) && !(stateManager.dataJson['cs-other']) && !/^(clusters-standards|lesson-info)/.test(app.currentView)) {
					$('.col-middle .data').empty().append(['div', {class:'screen-error'},
						['h1', {class:'main-h1'}, 'Please choose the grade-level content that will be targeted in this lesson or choose “other” to enter an off-grade-level standard.'],
						''].toDomNodes());
            		}
                }});
            })(view);
        },

        showView: function()
        {
            TweenLite.to($('.col-middle .data'), 0.5, {autoAlpha:1});
        },

        configPins: function()
        {
            $('body').on('mouseover', '.pin', function() {
                TweenLite.to($(this).find('.pintip'), 0.2, {autoAlpha:1, ease:'Power3.easeOut'});
            });

            $('body').on('mouseout', '.pin', function() {
                TweenLite.to($(this).find('.pintip'), 0.2, {autoAlpha:0, ease:'Power3.easeOut'});
            });

            $('body').on('click', '.breadcrumb', function()
            {
                var dataId = $(this).attr('data-id');

                if ($(this).hasClass('pinned'))
                {
                    $(this).removeClass('pinned');
                    sidebarLeft.toggleStateIcon(dataId, 'pin', false);
                } else
                {
                    $(this).addClass('pinned');
                    sidebarLeft.toggleStateIcon(dataId, 'pin', true);
                }
            });
        },

        configNP: function()
        {
            $('body').on('click', '.view-next', function()
            {
            	_gaq.push(['_trackEvent', 'UI' , 'Next', app.currentView]);

            	var content = utils.getContentSection(app.currentView);
            	var qs = content.questions;
            	if(typeof qs === 'function') qs = qs(stateManager, utils);
            	if(content.multi === true && app.subPage < (qs.length-1)) {
            		app.subPage++;
            		app.pushView(app.currentView);
            		return false;
            	}
            	app.subPage = 0;

            	if(app.onNext) {
					app.onNext(app);
					return false;
				}

                if (!$(this).hasClass('compile'))
                {
                    var viewToLoad = utils.getNextView(utils.lessonType, app.currentView);
                    app.pushView(viewToLoad);
                } else {
                    $('.col-left .btn-compile').trigger('click');
                }

                return false;
            });

            $('body').on('click', '.view-prev', function()
            {
            	_gaq.push(['_trackEvent', 'UI' , 'Previous', app.currentView]);

            	var content = utils.getContentSection(app.currentView);
            	var qs = content.questions;
            	if(typeof qs === 'function') qs = qs(stateManager, utils);
            	if(content.multi === true && app.subPage > 0) {
            		app.subPage--;
            		app.pushView(app.currentView);
            		return false;
            	}
            	app.subPage = 0;


                var viewToLoad = utils.getPrevView(utils.lessonType, app.currentView);
                app.pushView(viewToLoad);
                return false;
            });
        },

        configCheckboxes: function()
        {
            $('body').on('click', '.checkbox', function()
            {
                var id = $(this).parent().index();
                var grouping = $(this).parent().parent();
                var type = $(this).parent().parent().attr('data-type');

                if (type != 'multi')
                {
                    $(grouping).find('.checkbox').each(function(index, value)
                    {
                        if (id==index) {
                            $(this).addClass('selected');
                        } else {
                            $(this).removeClass('selected');
                        }
                    });
                } else {
                    if ($(this).hasClass('selected')) {
                        $(this).removeClass('selected');
                    } else {
                        $(this).addClass('selected');
                    }
                }

                $(this).addClass('activated');
                setTimeout(function(){app.removeCheckboxActivated(id);}, 500);
            });
        },

        removeCheckboxActivated: function(item)
        {
            $('.checkboxes li:eq('+item+') .checkbox').removeClass('activated');
        },

        configureCompileButtons: function()
        {
            $('body').on('click', '.compiled-lesson .btn-edit, .compiled-lesson .empty', function()
            {
                var view = $(this).attr('data-view');
                app.pushView(view);
                sidebarLeft.setToView(view);
                sidebarLeft.revertFromCompile();
                topBlock.show();

                return false;
            });
        }

    };

   module.exports = app;
