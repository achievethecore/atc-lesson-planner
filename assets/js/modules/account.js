/*

Overview: Login, Registration, Email, Saved Plans, DB Interaction

Notes:
This file is pretty much an isolated set of commands copied from the coaching tool.
Minor adjustments have been made here and there just to sync it in with the LPT specific needs and flow.
The top portion is mostly the copied content, below that is where it gets into more LPT specific things.

Login is still in the mix here but this tool now has an embedded login on the landing. So it is not called upon.

*/

var accountTemplate = require('view-templates/my-account.html');
var savedLessonsTemplate = require('view-templates/saved-lessons.html');
var Handlebars = require('handlebars');
require('tablesorter');
var app = require('app');

var account = 
	{
		loggingIn: false,
		loggedIn: false,
		getprofile: null,
		username: null,
		root_uri: '',
		accountTemplate: Handlebars.compile(accountTemplate),
		savedLessonsTemplate: Handlebars.compile(savedLessonsTemplate),
		onComplete: null,
		okForRegistration: false, // This is set to true once dd subject & grade are set incase user needed to register after that

		init: function()
		{
			account.initGeneral();
			account.initLoginModal();
			account.initRegisterModal();

			if ($('body').hasClass('loggedin')) 
			{
				account.loggedIn = true;
				account.getProfile();
				account.loadSavedLessons();
			}
		},

		initGeneral: function()
		{	
			// -- Saved Lessons
			$.tablesorter.addParser({ 
		        id: 'natext', 
		        is: function(s) { 
		            return /N\/A/.test(s);
		        }, 
		        format: function(s) { 
		            return $.trim(s.toLocaleLowerCase()).replace(/n\/a/g, '');
		        }, 
		        type: 'text' 
		    });

		    $('#savedModal').on('click', '.btn-viewdetail', function()
		    { 
		    	var lessonId = this.hash.split('#')[1];
		    	account.loadLesson(lessonId);
		    	$("#savedModal .close").trigger("click");

		    	return false;
			});

			$('#savedModal').on('click', '.btn-delete', account.areyousure('td', function()
			{ 
				_gaq.push(['_trackEvent', 'Data', 'Delete Saved Data' ]);
				var me = $(this).closest('td').find('.btn-delete'); 
				$.post('/lpt-delete-data', {id: me.attr('href').split(/#/)[1]}, function(data)
				{
					me.parent().parent().fadeOut();
				}, 'json'); 

				return false; 
				})
			);

			$('#savedModal').on('click', '.btn-email', function()
			{
				utils.shareClass = $(this).parent().parent().find('td').eq(2).html();
				utils.shareId = this.hash.split('#')[1];
				$("#savedModal .close").trigger("click");
			    $("#emailbtn").trigger("click");

				return false;
			});



			// -- Continue with randomness
		    $('#registerModal, #loginModal').on('shown.bs.modal', function() {  
		    	$(this).find('input').eq(0).focus(); 
		    });

		    $('#registerModal, #loginModal').on('hidden.bs.modal', function()
		    {
		        account.removeErrors();
		        
		        if(account.loggingIn && !$('.modal:visible').size())
		        {
		        	account.loggingIn = false;

		        	// opening w/o timeout results in no .modal-open on body
					setTimeout(function() { 
						$('#detailsModal').modal({backdrop:'static',keyboard:false}); 
					}, 10);
				}

		        //reset login
		        $("#loginModal .modal-content").removeClass("forgotpass").removeClass("forgotsent");

		        //reset register
		        $("#registerModal input[type!=checkbox], #registerModal textarea").val("");
		        $("#registerModal input[type=checkbox]").attr("checked", false);
		        $('#registerModal select').get(0).selectedIndex = 0;
		        $("#registerModal").removeClass("myacct").removeClass("editacct");
		    });

		    $(document).on("click", ".logoutBtn", function()
		    {
		        $.get('logout.php',function() {
		            location.reload();
		        });

		        return false;
		    });

		    $(document).on("click", ".myaccountBtn", function()
		    {
		        account.getProfile(true);
		        return false;
		    });

		    $(document).on("click", "#profilenamelink", function()
		    {
		        account.getProfile(true);
		        return false;
		    });

		    $(document).on("click", "#email-submit", function()
		    {
		    	var lessonId = utils.lessonId;
		    	if (utils.shareId !== null)
		    	{
		    		lessonId = utils.shareId;
		    		utils.shareId = null;
		    	}

		 		_gaq.push(['_trackEvent', 'UI', 'Email']);

		 		var url = 'http://'+location.host+'/lesson-planning-tool/pdf2.php?url=';
				url += encodeURIComponent('http://'+location.host+'/lesson-planning-tool/plan.php?id=' + lessonId + '&section=-1') + '&filename=LessonPlan.pdf';

				$.post('/lpt-mail', {
					'url':url,
					'comments':utils.nl2br($("#emailform textarea").val()),
					'mailto':$("#emailform input").val(),
					'copyme':$('#email_copyme:checked:visible').length 
				}, function() {}, "json" );
				
				$("#emailform textarea, #emailform input:eq(0)").val('');
				
				$('.modal.in').modal('hide'); 
				$('<div class=modal><div class=modal-dialog><div class=modal-content><div class=modal-header><button type="button" class="close" data-dismiss="modal">&times;</button></div><h2>Your lesson plan has been sent.</h2></div></div></div>').modal();
				
				account.updateShared(lessonId);

				return false;
			});
		},

		initLoginModal: function()
		{
			$('.forgetpasswordBtn').click(function()
			{
		        $('#loginModal .modal-content').addClass('forgotpass');
		        return false;
		    });

		    $('#login-submit').unbind("click");
		    $('#login-submit').click(function()
		    {
		        if(!$(this).hasClass("disabled")) $(this).addClass('disabled');

		        if(!$("#loginModal .modal-content").hasClass("forgotpass"))
		        {
		            $.post(account.root_uri + '/login', $('#loginform input').serialize(), function(data)
		            {
		                if(data.success)
		                {
		                    $("#login-submit").removeClass('disabled');
		                    account.loggedIn = true;

		                    $.get("getprofile.php", {}, function(data)
		                    {
		                        account.getprofile = data.user;
		                        account.username = data.user.name;
		                        $('#namebtn').html('<span></span>'+account.username.toUpperCase());
		                        
		                        trackprof = [data.user.id, data.user.role, data.user.subject, data.user.grades, 'Login'];
							     var trnames = ['uid', 'role', 'subject', 'grades'];
							     for(var i=1;i<=4;i++)
							        _gaq.push(['_setCustomVar', i, trnames[i-1], trackprof[i-1], 2]);
		                        _gaq.push(['_trackEvent', 'Account', trackprof[4]]);

		                        $("#loginModal .close").trigger("click");
		                        $("#profilenamelink").html(account.username);
		                        $("body").addClass("loggedin");

		                        account.onCompleteHandler('login');
		                    });
		                    
		                    if(account.loggingIn) {
		                        loggingIn = false;
		                    }
		                } else {
		                    account.errorHandling(data);
		                }
		            }, "json");
		        } else 
		        {
		        	_gaq.push(['_trackEvent', 'Account', 'Forgot Password']);
		            $.post(account.root_uri + '/forgotpass', $('#loginform input').serialize(), function(data)
		            {
		                if (data.success) {
		                    $("#loginModal .modal-content").removeClass("forgotpass").addClass("forgotsent");
		                }

		                account.errorHandling(data);
		            }, "json");
		        }

		        return false;
		    });
		},

		initRegisterModal: function()
		{
			$('.alreadyTxt a').click(function()
			{
		        $('#registerModal').trigger('click');

		        setTimeout(function()
		        {
		            $('.loginbtn').trigger('click');
		        }, 100);

		        return false;
		    });

		    $(document).on("click", ".btn-edit-profile", function()
		    {
		    	_gaq.push(['_trackEvent', 'UI', 'Edit Account Details']);
		        //populate register form
		        $("#firstname").val(account.getprofile.name.split(" ")[0]);
		        $("#lastname").val(account.getprofile.name.split(" ")[1]);

		        $(".grade-group input[type=checkbox]").each(function()
		        {
		            var gradearr = account.getprofile.grades.split(",");

		            if($.inArray($(this).val(),gradearr)>-1) $(this).prop("checked",true);
		        });

		        $('#registerform #password').val('');
		        
		        $("#role").val(account.getprofile.role);
		        $("#subject").val(account.getprofile.subject);
		        $("#email").val(account.getprofile.email);
		        $("#school").val(account.getprofile.school);
		        $("#state").val(account.getprofile.state);
		        $("#city").val(account.getprofile.city);
		        $("#newsletter").attr("checked",((account.getprofile.optin == "0")? false : true));

		        $("#registerModal").removeClass("myacct").addClass("edit");

		        return false;
		    });

		    $('#register-submit').unbind("click");
		    $('#register-submit').click(function()
		    {
		    	if ($('#terms_reg').is(':checked'))
		    	{
		        	$(this).addClass('disabled');
		        	$.post(account.root_uri + '/register', $('#registerform input, #registerform select').serialize(), account.registerform_response, "json" );
		        }

		        return false;
		    });

		    $('#profile-submit').unbind("click");
		    $('#profile-submit').click(function()
		    {
		        $(this).addClass('disabled');
		        $.post(account.root_uri + '/edit-profile', $('#registerform input, #registerform select').serialize(), account.registerform_response, "json" );
		    });

		    $(".btn-go-inverse.editmode").click(function()
		    {
		        $("#registerModal .close").trigger("click");
		        return false;
		    });
		},

		login_response: function(data)
		{
		    if (data.success) {
		        account.onCompleteHandler('login');
		    }

		    account.errorHandling(data);
		},

		registerform_response: function(data)
		{
		    if(data.success)
		    {
		        $("#login-submit").removeClass('disabled');
		        $("#profile-submit").removeClass('disabled');
		        account.loggedIn = true;

		        account.username = $("#firstname").val() + " " + $("#lastname").val();
		        var editing = !!(account.getprofile);
		        account.getprofile = false;

		        $("#registerModal").removeClass("edit");

		        $("#registerModal .close").trigger("click");
		        $("#profilenamelink").html(account.username);
		        $("body").addClass("loggedin");
		        
		        if(account.loggingIn)
		        {
		            account.loggingIn = false;
		            $('#detailsModal').modal();
		        }

		        if($('.landing-login:visible'))
		        {
				    if (account.okForRegistration)
				    {
		                account.onComplete = 'new';
		                account.onCompleteHandler('login');
		            }
				}

		        $.get("getprofile.php", {}, function(data)
		        {
		            account.getprofile = data.user;
		            account.username = data.user.name;
		            $('#namebtn').html('<span></span>'+account.username.toUpperCase());
		            
		            trackprof = [data.user.id, data.user.role, data.user.subject, data.user.grades, 'Register'];
				     var trnames = ['uid', 'role', 'subject', 'grades'];
				     for(var i=1;i<=4;i++)
				        _gaq.push(['_setCustomVar', i, trnames[i-1], trackprof[i-1], 2]);
				    if(!editing)
		            	_gaq.push(['_trackEvent', 'Account', trackprof[4]]);
		        });
		    } else {
		        account.errorHandling(data);
		    }
		},

		errorHandling: function(data)
		{
		    $(data.formid + ' a.btn-go').removeClass('disabled');
		    $(data.formid + ' .errors').remove();
		    $(data.formid + ' .has-error').removeClass('has-error');

		    for(var i in data.errors)
		    {
		        $(data.formid + ' #' + data.errors[i].id ).parent().prepend('<p class="errors">' + data.errors[i].message + '</p>');
		        $(data.formid + ' #' + data.errors[i].id ).parent().addClass('has-error');
		    }
		},

		removeErrors: function()
		{
			$(".form-group.has-error").each(function(){
		        $(this).removeClass("has-error");
		    });

		    $(".errors").each(function(){
		        $(this).remove();
		    });
		},

		getProfile: function(launch)
		{
			_gaq.push(['_trackEvent', 'UI', 'View Account Details']);
			if(!account.getprofile)
	        {
	            $.get("getprofile.php", {}, function(data)
	            {
	                account.getprofile = data.user;
	                account.getprofile.optin = (account.getprofile.optin == "1") ? true : false;
	                account.username = data.user.name;
	                $('#namebtn').html('<span></span>'+account.username.toUpperCase());

	                if (launch)
	                {
						var myAccountMarkup = account.accountTemplate(account.getprofile);
						$('.myacctArea').html(myAccountMarkup);

		                $("#registerModal").addClass("myacct");
		                $(".registerbtn").trigger("click");
		            }
	            });
	        } else {
	            account.getprofile.optin = (account.getprofile.optin == "1") ? true : false;

	            if (launch)
                {
					var myAccountMarkup = account.accountTemplate(account.getprofile);
					$('.myacctArea').html(myAccountMarkup);

	                $("#registerModal").addClass("myacct");
	                $(".registerbtn").trigger("click");
	            }
	        }
		},

		areyousure: function(closest, after)
		{
			return function() {
		    	$(this).closest(closest).append('<div class="indicatormenu areyousure">Are you sure? <a href="#" class="btn btn-go btn-goforward">Yes</a></div>');
		    	$(this).closest(closest).find('.indicatormenu').hide().fadeIn();
		    	
		    	$(this).closest(closest).find('.areyousure .btn-goforward').click(after);
		        
		        setTimeout(function() {
		        $('html').one('click', function() {  $('.areyousure').remove(); });
		        },10);
		      
		        return false;
		  	}; 
		},


		/* ----------------------------------------------------------------------------
		/* ----------------------------------------------------------------------------
		/* ---------------------------------------------------------------------------- */
		// Lesson Tool Handlers/Functions

		onCompleteHandler: function(type)
		{
			account.loadSavedLessons();

			if (type == 'login') {
				$('body').addClass('loggedin');
			}

			if (account.onComplete == 'new') {
				account.newLesson('landing');
			}

			if (account.onComplete == 'continue') {
				$('.btn-saved').trigger('click');
			}
		},

		updateBlobOnDB: function(blob)
		{
			if (account.loggedIn && utils.lessonId!==null)
			{
				var postData = {};
				postData.id = utils.lessonId;
				if (blob) {
					postData.state = JSON.stringify(blob);

					if (blob['li-2']) {
						postData.teacher = blob['li-2'];
					}
				}
				postData.subject = utils.lessonType;

				if (blob['li-1']) {
					postData.class = blob['li-1'];
				} else {
					postData.class = 'N/A';
				}

				$.post('/lpt-save-data', postData, function(response) {
						if(response && JSON.parse(response).success === false) {
							window.location.reload();
						}
					//console.log('updateBlobOnDB: ' + utils.lessonId);
					//console.log(postData);
				});
			}
		},

		newLesson: function(location)
		{
			$.post('/lpt-new-data', function(response) 
			{
				var rJSON = JSON.parse(response);
				utils.lessonId = rJSON.id;
				if(rJSON.success === false) {
					window.location.reload();
					return;
				}

				//require(['modules/state-manager'], function(stateManager) {
	            	stateManager.addToBlob('lessonid', utils.lessonId);
	            	stateManager.addToBlob('lessontype', utils.lessonType);
	            	stateManager.addToBlob('lessongrade', utils.lessonGrade);
	            	stateManager.resume();
	            //});

				//require(['app'], function(app) {
	            	require('app').startLesson();
	            //});

	            _gaq.push(['_trackEvent', 'Data', 'Create New Lesson', utils.lessonType + ' - ' + utils.lessonGrade]);
			});
		},

		loadLesson: function(lessonId)
		{
			$.get('/lpt-get-data/' + lessonId, function(response) 
			{
				var rJSON = JSON.parse(response);
				utils.lessonId = lessonId;
				
				var rstate = JSON.parse(rJSON.state);
				utils.lessonType = rstate.lessontype;
				utils.lessonGrade = rstate.lessongrade;
				
				$('body').addClass(utils.lessonType);

				//require(['modules/state-manager', 'modules/sidebar-left'], function(stateManager, sidebarLeft) 
				//{
            		stateManager.halt();
		            sidebarLeft.reset();
		            $('.col-middle .data').empty();
		            $('.col-left .expanded-content .data').empty();
		            $('.top-content').empty();
		            stateManager.reset();

	            	stateManager.updateWithBlob(rJSON.state);
	            	stateManager.resume();

	            	// Check if need to show Big Idea / Learning Goal
		            var state = JSON.parse(rJSON.state);
		            if (state['tbp-mce']) {
		            	$('.btn1-ela-li').css('display', 'inline-block');
		            }
		            if (state['lg-mce']) {
		            	$('.btn1-math-li').css('display', 'inline-block');
		            }
	            //});

	            //require(['app'], function(app) {
	            	require('app').startLesson();
	            //});

	            _gaq.push(['_trackEvent', 'Data', 'Load Saved Lesson' ]);
			});
		},

		loadSavedLessons: function()
		{
			_gaq.push(['_trackEvent', 'UI', 'Saved Data Dialog' ]);
			$.get('/lpt-saved-data', function(data) 
			{
				$('#saved-lesson-data').empty();

				data = JSON.parse(data);
				for(var d in data.saved)
				{ 
					//data.saved[d].shared = !!(1*data.saved[d].shared);
					data.saved[d].shared = parseInt(data.saved[d].shared);
					data.saved[d].shared = !!data.saved[d].shared;
	  				data.saved[d].date_added = account.usdate(data.saved[d].date_added);
	  				data.saved[d].date_updated = account.usdate(data.saved[d].date_updated);

	  				var subject = data.saved[d].subject;
	  				if (subject == 'math') {
	  					data.saved[d].subject = 'Math';
	  				} else {
	  					data.saved[d].subject = "ELA";
	  				}
				}

				var lessonsMarkup = account.savedLessonsTemplate(data);
				$('#saved-lesson-data').html(lessonsMarkup);

				$('#saved-lesson-data table').tablesorter({
					sortList:(window.sort||[[1,1]]), 
					headers:{
						2:{sorter:'natext'},3:{sorter:'natext'},4:{sorter:'natext'},
						5:{sorter:false},6:{sorter:false},7:{sorter:false},8:{sorter:false}
					} 
				}).bind('sortEnd', function(e) {
					window.sort = this.config.sortList; // saved ref? to sort setting for next table load
				});
			});
		},

		usdate: function(d)
		{
			if(typeof d !== 'string') return '';
			d = d.split('-'); 
	  		return [d[1],d[2],d[0]].join('/'); 
		},

		updateShared: function(lessonId)
		{
			if (account.loggedIn)
			{
				var postData = {};
				postData.id = lessonId;
				postData.shared = 1;

				$.post('/lpt-set-shared', postData, function(response) {
					account.loadSavedLessons();
				});
			}
		}
	};

module.exports = account;