/*

Overview: Splash page, Lesson Basics, Embedded Login, BTF Content

Notes:
Landing contains the lesson type/grade dropdowns. It also contains the new embeddable login page.

*/

define(
	['jquery', 'modules/account', 'modules/utils'],
	function($, account, utils)
{
	var landing = 
	{
		ddSubject: false, 
		ddGrade: false,
		priorToLogin: 'landing-main',
		onComplete: null,
		affixNavTop: null,

		init: function()
		{
			landing.sizeATF();
			$('.landing').css('display', 'block');
			$('.dashboard').css('display', 'none');
			landing.addListeners();
		},

		sizeATF: function()
		{	
			var wH = $(window).height();
			$('.landing .atf').height(wH);
			//$('.landing .btf').height(wH);
			$('.landing .btf').css('top', wH);
			
			$('body').css('background-color', '#fff');
			landing.affixNavTop = null;
		},
		
		onScroll: function()
		{
			
			var top = $(window).scrollTop();
			var wH = $(window).height();
			var btfMode = (top > (wH - 100));
			
			$('.landing').toggleClass('btf', btfMode);
			$('.btf .to-top').toggleClass('active', btfMode);
			
			
			/*if(landing.affixNavTop === null && $('.nav-column .nav').position().top > 0) landing.affixNavTop = $('.nav-column .nav').position().top;
			
			var affixNav = (top > (wH + landing.affixNavTop - 140));*/
			
			if(!btfMode) {
				var a = (top / (wH - 100));
				$('.landing-main').css('opacity', Math.pow(1.0 - a, 2.2) );
				$('.btf h1, .btf .subhed').css('opacity', Math.pow(a, 2.2));
			}
			else {
					$('.landing-main, .btf h1, .btf .subhed').css('opacity', 1.0);
			}
			
			
			//$('.btf .nav-column .nav').toggleClass('affix', affixNav);
			
		},

		addListeners: function()
		{
			$(window).bind('resize', landing.sizeATF);
			$(window).bind('scroll', landing.onScroll);
			$(window).scrollTop(1);
			
			$('.btf .to-top').click(function(event) 
			{
				$('html,body').animate({scrollTop:0}, 500);
				return false;
			});
			
		    $('#landing-login-form input').keypress(function(e){
		        if(e.keyCode == 13 && $(this).closest('form').length) {
		            $(this).closest('form').parent().find('.btn-submit').click();
		        }
		    });
			
			$('.btf .nav a').on('click', _.debounce(function() { $('html,body').animate({scrollTop: $(this.hash).offset().top - 140}); return false; }, 50, true));
			
			$('body').css('position', 'relative').scrollspy({target: '.nav-column', offset: 140+40});
			
			$('.atf .bottom').on('click', function() {
				$('html,body').animate({scrollTop: $(window).height() - 99});
			});
			
			// -- Top Right Login
			$('.btn-login').click(function(event)
			{
				_gaq.push(['_trackEvent', 'UI', 'Show Login Form', 'Top Right']);
				landing.getLoginScreen();
				return false;
			});

			$('.btn-account').click(function(event)
			{
				account.getProfile(true);
				return false;
			});


			// -- Main
			$('.btn-new').click(function(event) 
			{
				_gaq.push(['_trackEvent', 'Landing', 'Start New']);
				$('.landing').addClass('deep');
				$(window).scrollTop(0);
				$('.landing-info').css('display', 'block');
				TweenLite.to($('.landing-main'), 0.25, {autoAlpha:0, onComplete:function(){ $('.landing-main').css('display', 'none'); }});
				TweenLite.to($('.landing-info'), 0.25, {autoAlpha:1});

				landing.priorToLogin = 'landing-info';

				return false;
			});

			$('.btn-continue').click(function(event) 
			{
				_gaq.push(['_trackEvent', 'Landing', 'Continue Saved']);
				$(window).scrollTop(0);
				if (!account.loggedIn) 
				{
					_gaq.push(['_trackEvent', 'UI', 'Show Login Form', 'Continue Saved']);
					landing.onComplete = 'continue';
					landing.getLoginScreen();
				} else {
					$('.btn-saved').trigger('click');
				}

				return false;
			});


			// -- Dropdowns
			$('#dropdown-subject ul li a').click(function()
			{
				var data = $(this).attr('href');
				data = data.substr(1);
				utils.lessonType = data;
				$('body').removeClass('math');
				$('body').removeClass('ela');
				$('body').addClass(data);

				$('#dropdown-subject .toggle').html( $(this).html() + '<span></span>');

				landing.ddSubject = true;
				landing.checkInfo();

				$('#dropdown-subject .toggle').dropdown('toggle');
				return false;
			});

			$('#dropdown-grade ul li a').click(function()
			{
				var data = $(this).attr('href');
				data = data.substr(1);
				utils.lessonGrade = data;
				$('body').addClass(data);

				$('#dropdown-grade .toggle').html( $(this).html() + '<span></span>');

				landing.ddGrade = true;
				landing.checkInfo();

				$('#dropdown-grade .toggle').dropdown('toggle');
				return false;
			});


			// -- Log In
			$('.landing-login span a').click(function(event) 
			{
				_gaq.push(['_trackEvent', 'UI', 'Show Register Form', 'Login Page']);
				$('.registerbtn').trigger('click');

				return false;
			});
			
			$('.btn-register').click(function(event) 
			{	
				_gaq.push(['_trackEvent', 'UI', 'Show Register Form', 'Top Right']);
			});

			$('#loginModal .modal-content').addClass('forgotpass');
			$('.landing-login .pw .btn-forgot').click(function(event) 
			{
				$('.loginbtn').trigger('click');
				return false;
			});

			$('.landing-login .btn-submit').click(function(event) 
			{	
				landing.login();

				return false;
			});
		},

		checkInfo: function()
		{
			if (landing.ddGrade && landing.ddSubject)
			{
				account.okForRegistration = true;
				
				if (!account.loggedIn) 
				{
					_gaq.push(['_trackEvent', 'UI', 'Show Login Form', 'Starting New']);
					$('.landing-login').css('display', 'block');
					TweenLite.to($('.landing-info'), 0.25, {autoAlpha:0, onComplete:function(){ $('.landing-info').css('display', 'none'); }});
					TweenLite.to($('.landing-login'), 0.25, {autoAlpha:1});

					landing.priorToLogin = 'landing-login';
				} else {
					account.newLesson('landing');
				}
			}
		},

		login: function()
		{
			landing.loggingIn = true;

			$.post(account.root_uri + '/login', $('#landing-login-form input').serialize(), function(data)
            {
                if(data.success)
                {
                    $('.landing-login .btn-submit').removeClass('disabled');
                    account.loggedIn = true;

                    $.get("getprofile.php", {}, function(data)
                    {
                        account.getprofile = data.user;
                        account.username = data.user.name;
                        $('#namebtn').html('<span></span>'+account.username.toUpperCase());
                        account.loadSavedLessons();
                        
                        trackprof = [data.user.id, data.user.role, data.user.subject, data.user.grades, 'Login'];
					     var trnames = ['uid', 'role', 'subject', 'grades'];
					     for(var i=1;i<=4;i++)
					        _gaq.push(['_setCustomVar', i, trnames[i-1], trackprof[i-1], 2]);
                        _gaq.push(['_trackEvent', 'Account', trackprof[4]]);

                        $("body").addClass("loggedin");

                        if (landing.ddSubject && landing.ddSubject) {
                        	// Your logged in and the lesson basics are filled in
                        	// Move onto the actual lesson
                        	account.newLesson('landing');
                        } else {
                        	if (landing.onComplete == 'continue') 
                        	{
                        		// You clicked continue and were not logged in yet
                        		// Now you are so show continue modal
                        		// Also set it back to the main screen incase you choose nothing 

                        		landing.onComplete = null;
                        		$('.btn-saved').trigger('click');
                        		landing.getPriorToLogin();
                        	} else {
                        		// You skipped ahead somewhere without choosing new/continue or not filling in info
                        		landing.getPriorToLogin();
                        	}
                        }
                    });
                } else {
                    landing.errorHandling(data);
                }
            }, "json");
		},

		errorHandling: function(data)
		{
			data.formid = '#landing-login-form';
		    $('.landing-login .btn-submit').removeClass('disabled');
		    $(data.formid + ' .errors').remove();
		    $(data.formid + ' .has-error').removeClass('has-error');

		    for(var i in data.errors)
		    {
		        $(data.formid + ' #' + data.errors[i].id ).parent().prepend('<p class="errors">' + data.errors[i].message + '</p>');
		        $(data.formid + ' #' + data.errors[i].id ).parent().addClass('has-error');
		    }
		},

		getLoginScreen: function()
		{
			$('.landing').addClass('deep');
			$(window).scrollTop(0);
			$('.landing-login').css('display', 'block');
			TweenLite.to($('.' + landing.priorToLogin), 0.25, {autoAlpha:0, onComplete:function(){ $('.' + landing.priorToLogin).css('display', 'none'); }});
			TweenLite.to($('.landing-login'), 0.25, {autoAlpha:1});
		},

		getPriorToLogin: function()
		{
			if (landing.priorToLogin == 'landing-main') {
				$('.landing').removeClass('deep');
			} else {
				$('.landing').addClass('deep');
				$(window).scrollTop(0);
			}

			$('.' + landing.priorToLogin).css('display', 'block');
			TweenLite.to($('.landing-login'), 0.25, {autoAlpha:0, onComplete:function(){ $('.landing-login').css('display', 'none'); }});
			TweenLite.to($('.' + landing.priorToLogin), 0.25, {autoAlpha:1});
		},

		getSelectScreen:function() 
		{
			landing.ddSubject = false;
			landing.ddGrade = false;

			$('#dropdown-subject .toggle').html( 'SELECT SUBJECT' + '<span></span>');
			$('#dropdown-grade .toggle').html( 'SELECT GRADE' + '<span></span>');

			$('.landing').addClass('deep');
			$(window).scrollTop(0);

			$('.' + landing.priorToLogin).css('display', 'none');

			$('.landing-info').css('display', 'block');
			TweenLite.to($('.landing-info'), 0.1, {autoAlpha:1});
			landing.priorToLogin = 'landing-info';
		}
	};

	return landing;
});
