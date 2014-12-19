define(
    ['jquery', 'view-templates/math/focus.html', 'modules/state-manager', 'modules/sidebar-right', 'modules/utils', 'tinymce', 'views/math/_base'], 
    function ($, template, stateManager, sidebarRight, utils, tinyMCE, mathBase)
{
	var focus = 
	{
		template: template,

		getViewMarkup: function()
		{
			tinymce.remove();

			var viewData = {};
			viewData.markup = this.template;
			viewData.smList = {};

			$(viewData.markup).find('.sm').each(function(index, val) 
			{
				var sId = $(this).attr('data-sid');
				viewData.smList[sId] = '1';
			});

			return viewData;
		},
		
		getHelpText: function() {
			return [ 
				['div',
					'For more information, ',
					['a', {href:'http://vimeo.com/92784229', target:'_blank'}, 'view this video'], '.'
				],
				['div', 
					['a', {href:focus.getFocusLink(), target:'_blank'}, 'The focus documents'],
					' also help to put the Major Work of the Grade in a coherent sequence.'
				],
				'!ca1/i1a'
				];
		},
		
		getFocusLink: function() 
		{
			var grade = utils.lessonGrade;
			if (grade == 'k') {
				grade = 0;
			} else if (utils.isHS()) {
				grade = 9;
			} else {
				grade = parseInt(grade);
			}

			var link = [
				'http://achievethecore.org/page/630/focus-in-kindergarten-detail-pg',
				'http://achievethecore.org/page/631/focus-in-grade-one-detail-pg',
				'http://achievethecore.org/page/633/focus-in-grade-two-detail-pg',
				'http://achievethecore.org/page/634/focus-in-grade-three-detail-pg',
				'http://achievethecore.org/page/635/focus-in-grade-four-detail-pg',
				'http://achievethecore.org/page/636/focus-in-grade-five-detail-pg',
				'http://achievethecore.org/page/637/focus-in-grade-six-detail-pg',
				'http://achievethecore.org/page/638/focus-in-grade-seven-detail-pg',
				'http://achievethecore.org/page/639/focus-in-grade-eight-detail-pg',
				'http://achievethecore.org/prerequisites'
			][grade];
			
			return link;
		},

		initView: function()
		{
			focus.loadStandards();

			mathBase.createMCE('#focusq1-text');
			mathBase.createMCE('#focusq2-text');
			mathBase.createMCE('#focusq3-text');
			mathBase.createMCE('#focusalternateq1-text');
			mathBase.createMCE('#focusalternateq2-text');

			var tt;
			if (utils.isHS()) {
				tt = 'Focus in high school is important in order to prepare students for college and careers. National surveys have repeatedly concluded that postsecondary instructors value greater mastery of a smaller set of prerequisites over shallow exposure to a wide array of topics, so that students can build on what they know and apply what they know to solve substantial problems. A college-ready curriculum including all of the standards without a (+) symbol in High School should devote the majority of students’ time to building the particular knowledge and skills that are most important as prerequisites for a wide range of college majors, postsecondary programs, and careers.  ';
				$('.i-tooltip.2').attr('title', tt);
				$('.i-tooltip.2').tooltip();
			} else {
				tt = 'In K-8, clusters are designated as major or supporting/additional Work. Not all content in a given grade is emphasized equally in the Standards. Some clusters require greater emphasis than others based on the depth of the ideas, the time that they take to master, and/or their importance to future mathematics or the demands of college and career readiness. More time in these areas is also necessary for students to meet the Standards for Mathematical Practice. To say that some things have greater emphasis is not to say that anything in the Standards can safely be neglected in instruction. Neglecting material will leave gaps in student skill and understanding and may leave students unprepared for the challenges of a later grade.';
				$('.i-tooltip.1').attr('title', tt);
				$('.i-tooltip.1').tooltip();
			}



			$('.view.focus p a').attr('href', focus.getFocusLink());
			
		},

		loadStandards: function()
		{
			var blob = stateManager.dataJson;

			// -- Check, Find, & Load Standards
			var standards = false;
			if (blob['standards-tags'])
			{
				standards = true;
				var allTags = blob['standards-tags'].split(',');
				
				// Filter out all clusters
				allTags = _.reject(allTags, function(val) {
					return val.substr(0,7)=='CLUSTER';
				});
				
				// Grade Labeling 
				var grade = utils.lessonGrade;
				var gradeLabel;
				if (grade=="9" || grade=="10" || grade=="11" || grade=="12") {
					gradeLabel = "Highschool";
					grade = "hs";
				} else if (grade=="k") {
					gradeLabel = "Kindergarden";
				} else {
					gradeLabel = "Grade " + grade;
				}

				$('.view .grade').each(function(index, value) {
					$(this).html(gradeLabel);
				});

				// Draw & Sort Tags
				var i;
				if (utils.isHS())
				{
					// Hide k8
					$('.k8').css('display', 'none');

					// Sort Tags
					var widelyBlob = sidebarRight.jsonStandards.widely;
					var widelyTags = widelyBlob.split(',');
					var widelyMatches = _.intersection(widelyTags, allTags);

					if (widelyMatches.length === 0)
					{
						$('.hs .major').css('display', 'none');
					} else {
						_.each(widelyMatches, function(e) {
							var tagMarkup = ['a', {class:'standards-btn'}, ['b', e, ': '],
								_.where(sidebarRight.jsonStandards.math,{id: e}).description];
							$('.view.focus .hs .major .standards-selected span').append(tagMarkup);
						});
					}
					
					// Sort clusters
					var widelyClusterBlob = sidebarRight.jsonStandards.widelyclusters;
					var widelyClusterTags = widelyClusterBlob.split(',');
					var widelyClusterMatches = _.intersection(widelyClusterTags, allTags);
					if (widelyClusterMatches.length > 0)
					{
						$('.view.focus .hs .cluster').css('display', 'block');

						_.each(widelyClusterMatches, function(e) {
							var tagMarkup = ['a', {class:'standards-btn cluster-btn'}, ['b', e, ': '],
								_.where(sidebarRight.jsonStandards.math,{id: e}).description];
							$('.view.focus .hs .cluster .standards-selected span').append(tagMarkup);
						});
					}
				} else {
					// Hide hs
					$('.hs').css('display', 'none');

					// Sort tags
					var majorBlob = sidebarRight.jsonStandards.major;
					var majorTags = majorBlob.split(',');

					var supportingBlob = sidebarRight.jsonStandards.supporting;
					var supportingTags = supportingBlob.split(',');

					var additionalBlob = sidebarRight.jsonStandards.additional;
					var additionalTags = additionalBlob.split(',');
					
					var majorMatches = _.intersection(majorTags, allTags);
					var supportingMatches = _.intersection(supportingTags, allTags);
					var additionalMatches = _.intersection(additionalTags, allTags);
					
					
					var standardToTag = function(id) {
							return ['a', {class:'standards-btn '+ (/CLUSTER/.test(id)?'cluster-btn':'')}, ['b', id, ': '],
								_.findWhere(sidebarRight.jsonStandards.math,{id: id}).description].toDomNodes();
					};

					if (majorMatches.length === 0)
					{
						$('.k8 .major').css('display', 'none');
					} else {
						$('.view.focus .k8 .major .standards-selected span').append(_.map(majorMatches, standardToTag));
					}

					if (supportingMatches.length === 0)
					{
						$('.k8 .supporting').css('display', 'none');
					} else {
						$('.view.focus .k8 .supporting .standards-selected span').append(_.map(supportingMatches, standardToTag));
						$('#focus-supporting').attr('value', '1');
					}

					if (additionalMatches.length === 0)
					{
						$('.k8 .additional').css('display', 'none');
					} else {
						$('.view.focus .k8 .additional .standards-selected span').append(_.map(additionalMatches, standardToTag));
					}

					if (supportingMatches.length === 0) {
						$('.k8 .sd2').css('display', 'none');
					}
				}
			}

			
			// -- Check for other, than check for standards
			var otherVal = stateManager.dataJson['cs-other'];
			if (otherVal!==undefined && otherVal!=='') {
				$('.screen-alternate').css('display', 'block');
			} else 
			{
				if (standards) {
					$('.screen-ok').css('display', 'block');
				} else {
					$('.screen-error').css('display', 'block');
					//$('#0_3 .state-complete').removeClass('active');
				}
			}
		}

	};

	return focus;
});