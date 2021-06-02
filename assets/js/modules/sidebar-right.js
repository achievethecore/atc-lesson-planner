/*

Overview: Right standards drawer

Notes:
Simply loads the current views corresponding standards. No communication with other modules.

*/

var standardsHTMLData = window._standardsHTML; //require('../../data/standards-select.html');
var standardsItemTemplate = require('view-templates/standards-item.html');
var caiItemTemplate = require('view-templates/cai-item.html');

	var sidebarRight =
	{
		busy: false,
		state: 'collapsed',
		duration: 0.5,
		easing: 'Power3.easeInOut',
		jsonStandards: window.standardsData,
		awaitingJson: false,
		pageStandards: {},
		standardsHTMLData: standardsHTMLData,
		standardsItemTemplate: standardsItemTemplate,
		caiItemTemplate: caiItemTemplate,
		currentItem: null,

		currentSection: 0,

		init: function()
		{
			// -- Listeners
			$('.col-right .header a').click(function(event)
			{
				sidebarRight.toggleState();

				return false;
			});

			// sync scroll for long help
			$(window).on('scroll', function() { $('.col-right')[0].scrollTop = window.pageYOffset; });


            $('body').on('click', '.btn-strive', function()
            {
            	sidebarRight.currentSection = 0;

            	_gaq.push(['_trackEvent', 'UI', 'Need Help', $(this).attr('data-indicator')]);


            	sidebarRight.updateHelp();

            	//console.log(JSON)
            	//sidebarRight.loadPageCAI($(this).attr('data-indicator'));

            	sidebarRight.toggleState();
            	return false;

            });

            $('body').on('click', '.help-nav a', function() {
				sidebarRight.currentSection = this.href.split('#')[1];
				sidebarRight.updateHelp();

				_gaq.push(['_trackEvent', 'UI', 'PD Drawer Nav', 'Page '+(1+sidebarRight.currentSection)]);

				return false;
			});

			// Slideout buttons
            $('body').on('click', '.standards-item', function()
            {
            	if (!$(this).hasClass('expanded')) {
            		sidebarRight.toggleItem($(this).attr('data-id'), 'expand');
            	} else {
            		sidebarRight.toggleItem($(this).attr('data-id'), 'collapse');
            	}

                return false;
            });

            // -- Load JSON data
            //$.getJSON('assets/data/standards.json', function(data)
            //{
			//	sidebarRight.jsonStandards = data;

				var standardsHTML = $(sidebarRight.standardsHTMLData);



				/*if (sidebarRight.awaitingJson)
				{
					sidebarRight.awaitingJson = false;
					sidebarRight.loadPageStandards();
				}*/
			//});
		},

		updateHelp: function() {
            if(sidebarRight.getHelpText === undefined) {
					if (sidebarRight.state == 'expanded') {
						sidebarRight.toggleState();
					}
					return;
            }


            var sections = sidebarRight.getHelpText();
            var s = sections[sidebarRight.currentSection];
			if(typeof(s) == 'string') {
				if(/^!ca/.test(s)) {
					var altString = '';
					var formatCAI = function(s, secondOnPage) {
						s = s.replace('!', '');
						var cas = s.split('/')[0].split(',');
						var inds = (s.split('/')[1]||'').split(',');
						if(!inds[0]) inds = [];

						//handle 2 core actions
						if(inds.indexOf('ca3') > -1) {
							var caStr = inds[inds.indexOf('ca3')];
							inds.splice(inds.indexOf('ca3'),1);
							altString = caStr + s.split(caStr)[1];
						}
						return (
							['div', (!secondOnPage)?['h4', 'Core Actions & Indicators']:[],
								 ($('.col-left .main-category').eq(0).hasClass('expanded') ? ['p', 'Each question in the Lesson Planning Tool relates to a Core Action and Indicator from the ', ['a', {href:'/instructional-practice-guide', target:'_blank'}, 'Instructional Practice Guide'],'. In order to make that connection explicit, the related Core Action and Indicator is shown below.'] : '')
							].concat(cas.map(function(ca) {
								return ['div', ['h5', 'Core Action ' + ca.replace('ca', '')],
								['p', sidebarRight.getCABody(ca) ] ];
							})).concat(inds.map(function(ind) {
								return ['div', ['h5', {class:'ind-title'}, 'Indicator(s)'],
								['p', sidebarRight.getIndBody(ind) ] ];
							}))
						);

						};

					formatCAI(s).toDomNodes($('.col-right .help .data').empty()[0]);
					if(altString !== '') {
						formatCAI(altString, true).toDomNodes($('.col-right .help .data')[0]);
					}
					$('.ind-title + p').each(function() {
						if( /teacher[\s\S]*[.][\s\S]*student/i.test($(this).text()) )
							$(this).html($(this).text().replace(/(Teacher|Students?)([\s\S]*?)\./gi, "<b>$1</b>$2."));
					});
					$('.ind-title:gt(0)').remove();
				}
				else
					$('.col-right .help .data').html(s);
			}
			if(typeof(s) == 'object') {
				s.toDomNodes($('.col-right .help .data').empty()[0]);
			}




			if($('.col-right .help .data .has-image').length) {
				_.each($('.col-right .help .data .has-image').data('src').toString().split(',').reverse(), function(src) {
					$('.col-right .help .data h4').eq(0).after(['img', {
						width:275,
						src:'assets/imgs/' + (src == parseInt(src) ? 'lptslides-' : '') + src + '.png'
						}].toDomNodes());
				});
			}

			$('.col-right .help .data').prepend(['div', {class:'help-nav'}].concat(
				sections.map(function(e,i) { return ['a', {href:'#'+i, class:(e===s?'active':'')}, ''+(1+i)]; }).concat(
          (sidebarRight.currentSection < sections.length - 1) ?
            [[ 'a', {href:'#'+(1*sidebarRight.currentSection+1), class:'btn-helpnext'}, 'NEXT ', ['span'] ]]
            : []
         )
			).toDomNodes());

			$('.col-right .help .help-nav').toggle(sections.length > 1);
			$('.col-right > :not(.help)').hide();
			$('.col-right > .help').show();
			$('.help-nav').next().hide().fadeIn();

			// gotta be able to scroll if only the sidebar is tall and not the actual content
			setTimeout(function() { $('.col-container').css('min-height', $('.col-right .help').height()); }, 1);
			// if images aren't cached, need to do it again
			$('.col-right .data img').on('load', function() { $('.col-container').css('min-height', $('.col-right .help').height()); });


		},

		toggleState: function()
		{
			if (!sidebarRight.busy && sidebarRight.state == 'collapsed')
			{
				sidebarRight.busy = true;
				TweenLite.to($('.col-right'), sidebarRight.duration, {'width': '315px', ease:sidebarRight.easing, onComplete:function()
				{
					sidebarRight.state = 'expanded';
					sidebarRight.busy = false;
				}});

				TweenLite.to($('.col-middle'), sidebarRight.duration, {paddingRight: '315px', ease:sidebarRight.easing});
			} else if (!sidebarRight.busy && sidebarRight.state == 'expanded')
			{
				sidebarRight.busy = true;
				TweenLite.to($('.col-right'), sidebarRight.duration, {'width': '0px', ease:sidebarRight.easing, onComplete:function()
				{
					$('.col-right .cai').css('display', 'none');
					$('.col-right .standards').css('display', 'none');
					sidebarRight.state = 'collapsed';
					sidebarRight.busy = false;
				}});

				TweenLite.to($('.col-middle'), sidebarRight.duration, {paddingRight: '50px', ease:sidebarRight.easing});
			}
		},

		collapseForSectionChange: function()
		{
			sidebarRight.currentTagBtn = null;

			if (sidebarRight.state == 'expanded') {
				//sidebarRight.toggleState();
			}
		},


		getCABody: function(ca)
		{
			var caBody;
				if (sidebarRight.jsonStandards.cai[utils.lessonType][ca].c === undefined)
				{
					if (utils.lessonType == 'ela')
					{
						if (utils.lessonGrade.toLowerCase()=='k' || utils.lessonGrade == 1 || utils.lessonGrade == 2) {
							caBody = sidebarRight.jsonStandards.cai[utils.lessonType][ca].a;
						} else {
							caBody = sidebarRight.jsonStandards.cai[utils.lessonType][ca].b;
						}
					} else {
						if (utils.isHS()) {
							caBody = sidebarRight.jsonStandards.cai[utils.lessonType][ca].b;
						} else {
							caBody = sidebarRight.jsonStandards.cai[utils.lessonType][ca].a;
						}
					}
				} else {
					caBody = sidebarRight.jsonStandards.cai[utils.lessonType][ca].c;
				}
			return caBody;
		},
		getIndBody: function(indicator)
		{
					var indObj = {};
					var indNumber = indicator.substr(1,1);
					indObj.indLetter = indNumber + '.' + indicator.substr(2) + ': ';
					indObj.indLetter = indObj.indLetter.toUpperCase();

					if (utils.lessonType == 'ela')
					{
						if (utils.lessonGrade.toLowerCase()=='k' || utils.lessonGrade == 1 || utils.lessonGrade == 2) {
							indObj.indBody = sidebarRight.jsonStandards.cai[utils.lessonType][indicator].a;
						} else {
							indObj.indBody = sidebarRight.jsonStandards.cai[utils.lessonType][indicator].b;
						}
					} else {
						if (utils.isHS()) {
							indObj.indBody = sidebarRight.jsonStandards.cai[utils.lessonType][indicator].b;
						} else {
							indObj.indBody = sidebarRight.jsonStandards.cai[utils.lessonType][indicator].a;
						}
					}
			return indObj.indLetter + indObj.indBody;
		},

		loadPageCAI: function(indicators, ca)
		{
			if (sidebarRight.jsonStandards === null) {
				sidebarRight.awaitingJson = true;
			}

			// -- Core Action
			if(ca === undefined) ca = $('.view').attr('data-ca');
			if (ca!=="" && ca!==undefined)
			{
				var caTitle = 'Core Action ' + ca.substr(2);
				var caBody;

				if (sidebarRight.jsonStandards.cai[utils.lessonType][ca].c === undefined)
				{
					if (utils.lessonType == 'ela')
					{
						if (utils.lessonGrade.toLowerCase()=='k' || utils.lessonGrade == 1 || utils.lessonGrade == 2) {
							caBody = sidebarRight.jsonStandards.cai[utils.lessonType][ca].a;
						} else {
							caBody = sidebarRight.jsonStandards.cai[utils.lessonType][ca].b;
						}
					} else {
						if (utils.isHS()) {
							caBody = sidebarRight.jsonStandards.cai[utils.lessonType][ca].b;
						} else {
							caBody = sidebarRight.jsonStandards.cai[utils.lessonType][ca].a;
						}
					}
				} else {
					caBody = sidebarRight.jsonStandards.cai[utils.lessonType][ca].c;
				}

				$('.col-right .cai .ca').css('display', 'block');
				$('.col-right .cai .ca .title').html(caTitle);
				$('.col-right .cai .ca .body').html(caBody);
			} else {
				$('.col-right .cai .ca').css('display', 'none');
			}


			// -- Indicators
			if (indicators === undefined || indicators === '') {
				indicators = $('.view').attr('data-indicator');
			}

			if (indicators!=="" && indicators!==undefined)
			{
				$('#indicator-data').css('display', 'block');
				$('#indicator-title').css('display', 'block');

				var inds = indicators.split(',');
				var indData = {};
				indData.items = [];
				for (var i=0 ;i<inds.length; ++i)
				{
					var indicator = inds[i];
					var indObj = {};
					var indNumber = indicator.substr(1,1);
					indObj.indLetter = indNumber + '.' + indicator.substr(2) + ': ';
					indObj.indLetter = indObj.indLetter.toUpperCase();

					if (utils.lessonType == 'ela')
					{
						if (utils.lessonGrade.toLowerCase()=='k' || utils.lessonGrade == 1 || utils.lessonGrade == 2) {
							indObj.indBody = sidebarRight.jsonStandards.cai[utils.lessonType][indicator].a;
						} else {
							indObj.indBody = sidebarRight.jsonStandards.cai[utils.lessonType][indicator].b;
						}
					} else {
						if (utils.isHS()) {
							indObj.indBody = sidebarRight.jsonStandards.cai[utils.lessonType][indicator].b;
						} else {
							indObj.indBody = sidebarRight.jsonStandards.cai[utils.lessonType][indicator].a;
						}
					}

					indData.items.push(indObj);
				}

				var template = Handlebars.compile(caiItemTemplate);
				var list = template(indData);
				$('.col-right .cai .data').html(list);
			} else {
				$('#indicator-data').css('display', 'none');
				$('#indicator-title').css('display', 'none');
			}
		},

		loadPageStandards: function()
		{
			if (sidebarRight.jsonStandards === null) {
				sidebarRight.awaitingJson = true;
			}

			if(1) { return; }

			// JSON is seperated by type right now. There is some crazy notion of potentially loading all of math.
			// I don't think its goig to happen though. So have to go group by group.

			var ids = [];
			$('.standards-btn').each(function(index, val)
			{
				var tag = $(this).html();
            	tag = tag.toLowerCase();

            	ids.push(tag);
			});

			// Try ELA first
			var j;
			var standards = [];
			var standard = {};
			for (var i=0; i<sidebarRight.jsonStandards.ela.length; ++i)
			{
				var id = sidebarRight.jsonStandards.ela[i].id;
				id = id.toLowerCase();

				for (j=0; j<ids.length; ++j)
				{
					if (id == ids[j])
					{
						standard = {};
						standard.id = id;
						standard.description = sidebarRight.jsonStandards.ela[i].description;

						standards.push(standard);
					}
				}
			}

			// Then try math
			if (standards.length===0)
			{
				for (j=0; j<ids.length; ++j)
				{
					var tag = ids[j];
					if (tag.indexOf('cluster') > -1)
					{
						var prefix = tag.substr(0, 1);
						if (prefix == 'h') {
							prefix = 'hs';
						}
						var indexPos = tag.lastIndexOf('.') + 1;
						var index = parseInt(tag.substr(indexPos))-1;

						standard = {};
						standard.id = tag.toUpperCase();
						standard.description = sidebarRight.jsonStandards.clusters[prefix][index];
						standards.push(standard);
					} else {
						/* jshint -W083 */
						standard = _.find(sidebarRight.jsonStandards.math, function(o){ return o.id.toUpperCase()===tag.toUpperCase();});
						standards.push(standard);
					}
				}
			}

			sidebarRight.pageStandards.items = standards;
			sidebarRight.drawPageStandards();
		},

		drawPageStandards: function()
		{
			var template = Handlebars.compile(standardsItemTemplate);
			var list = template(sidebarRight.pageStandards);
			$('.col-right .standards .data').html(list);
		},

		closeAllExceptItem: function(id)
		{
			$('.standards-item').each(function(index, val)
			{
				var dataId = $(this).attr('data-id');
				if (dataId != id) {
					if ($(this).hasClass('expanded')) {
						sidebarRight.toggleItem(dataId, 'collapse');
					}
				} else {
					sidebarRight.toggleItem(dataId, 'expand');
				}
			});
		},

		toggleItem: function(id, state)
		{
			var target = $('.standards-items').find("[data-id='" + id + "']");

			if (state == 'expand')
			{
				target.addClass('expanded');
	            TweenLite.to(target.find('.side'), 0.2, {autoAlpha:1, ease:'Power3.easeOut'});
	            target.find('.description').slideDown(200);
	        } else
	        {
	        	target.removeClass('expanded');
	            TweenLite.to(target.find('.side'), 0.2, {autoAlpha:0, ease:'Power3.easeOut'});
	            target.find('.description').slideUp(200);
	        }
		}
	};

	module.exports = sidebarRight;
