define(
    ['jquery', 'view-templates/math/clusters-standards.html', 'modules/state-manager', 'modules/utils', 'views/math/_base', 'lib/select2'],
    function ($, template, stateManager, utils, mathBase)
{
	var clustersStandards =
	{
		template: template,
		standardsData: window._standardsHTML,

		getViewMarkup: function()
		{
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

		getFocusDoc: function() {
			/*var docs = {k: 'http://achievethecore.org/page/630/focus-in-kindergarten-detail-pg',
						1: 'http://achievethecore.org/page/631/focus-in-grade-one-detail-pg',
						2: 'http://achievethecore.org/page/633/focus-in-grade-two-detail-pg',
						3: 'http://achievethecore.org/page/634/focus-in-grade-three-detail-pg',
						4: 'http://achievethecore.org/page/635/focus-in-grade-four-detail-pg',
						5: 'http://achievethecore.org/page/636/focus-in-grade-five-detail-pg',
						6: 'http://achievethecore.org/page/637/focus-in-grade-six-detail-pg',
						7: 'http://achievethecore.org/page/638/focus-in-grade-seven-detail-pg',
						8: 'http://achievethecore.org/page/639/focus-in-grade-eight-detail-pg'
				};*/
        var docs = {k: 'https://docs.google.com/gview?url=https%3A%2F%2Fachievethecore.org%2Fcontent%2Fupload%2FSAP_Focus_Math_K%252011.12.14.pdf&embedded=true',
  						1: 'https://docs.google.com/gview?url=https%3A%2F%2Fachievethecore.org%2Fcontent%2Fupload%2FSAP_Focus_Math_1.pdf&embedded=true',
  						2: 'https://docs.google.com/gview?url=https%3A%2F%2Fachievethecore.org%2Fcontent%2Fupload%2FSAP_Focus_Math_2.pdf&embedded=true',
  						3: 'https://docs.google.com/gview?url=https%3A%2F%2Fachievethecore.org%2Fcontent%2Fupload%2FSAP_Focus_Math_3.pdf&embedded=true',
  						4: 'https://docs.google.com/gview?url=https%3A%2F%2Fachievethecore.org%2Fcontent%2Fupload%2FSAP_Focus_Math_4.pdf&embedded=true',
  						5: 'https://docs.google.com/gview?url=https%3A%2F%2Fachievethecore.org%2Fcontent%2Fupload%2FSAP_Focus_Math_5.pdf&embedded=true',
  						6: 'https://docs.google.com/gview?url=https%3A%2F%2Fachievethecore.org%2Fcontent%2Fupload%2FSAP_Focus_Math_6.pdf&embedded=true',
  						7: 'https://docs.google.com/gview?url=https%3A%2F%2Fachievethecore.org%2Fcontent%2Fupload%2FSAP_Focus_Math_7.pdf&embedded=true',
  						8: 'https://docs.google.com/gview?url=https%3A%2F%2Fachievethecore.org%2Fcontent%2Fupload%2FSAP_Focus_Math_8.pdf&embedded=true'
  				};
				return docs[utils.lessonGrade];

		},

		getHelpText: function() {
			return [
				['div', {class:'has-image', 'data-src':'4' }, ['h4', 'How to read the Standards:'],
					'Standards define what students should understand and be able to do.',
					['br'],
					'Clusters summarize groups of related standards. Note that standards from different clusters may sometimes be closely related, because mathematics is a connected subject.',
					['br'],
					'Domains are larger groups of related standards. Standards from different domains may sometimes be closely related.',
					['br'],['br'],
					'Picking the standards and mathematical content is the first step in planning your lesson.  For the full set of Common Core State Standards for Mathematics, ',
					['a', {href:'http://www.corestandards.org/Math/', target:'_blank'}, 'click here'],
					['br'],
					'For more information on how to read the Standards, ',
					['a', {href:'http://www.corestandards.org/Math/Content/introduction/how-to-read-the-grade-level-standards/', target:'_blank'}, 'click here']
				],
				mathBase.PDCourseGrade('Grade-Level Standards', 'Generally, lessons should be aligned to grade-level standards and/or clusters. Attending to grade-level content ensures that focus is maintained in the classroom. There may be times when it is appropriate to teach an off-grade-level standard, based on the needs of your students, however. For lessons that target off-grade-level standards, consider how to make the connection of the off-grade-level standard to grade-level content explicit and clear for students.'),
				['div',
					['h4', 'Common Obstacles to Focus'],
					'Focus is one of the major shifts associated with the college- and career-ready standards. Students need adequate time to master the content of the ' + utils.gradeOrCourse() + '.',
					['br'],
					(utils.isHS() ? ['span', 'In any single course, students spend at least 50% of their time on ', ['a', {href:'//achievethecore.org/prerequisites', target:'_blank'}, 'Widely Applicable Prerequisites'], '.'] : ['span', '65-85% of instructional time over the course of the year should be focused on the ', ['a', {href:clustersStandards.getFocusDoc(), target:'_blank'}, 'Major Work of the Grade'], '.'])
				 ].concat(utils.isHS() ? [
					['div',
						'★Modeling is best interpreted not as a collection of isolated topics but rather in relation to other standards. Making mathematical models is a Standard for Mathematical Practice, and specific modeling standards appear throughout the high school standards indicated by a star symbol (★) The star symbol sometimes appears on the heading for a group of standards; in that case it should be understood to apply to all standards in that group.',
						['br'],
						'+The high school standards specify the mathematics that all students should study in order to be college and career ready. Additional mathematics that students should learn in order to take advanced courses such as calculus, advanced statistics, or discrete mathematics is indicated by (+).'
					]]:
					[
							['br'],
							'In order to be able to focus appropriately, the following topics should not be taught prior to the indicated grade:',
							['ul'].concat(
								[
									['span', ['b', 'Probability'], ', including chance, likely outcomes, probability models. (grade 7)'],
									['span', ['b', 'Statistical distributions,'], ' including center, variation, clumping, outliers, mean, median, mode, range, quartiles, and statistical association or trends, including two-way tables, bivariate measurement data, scatter plots, trend line, line of best fit, correlation. (grade 6)'],
									['span', ['b','Similarity, congruence, or geometric transformations.'], ' (grade 8)'],
									['span', ['b', 'Symmetry'],  ' of shapes, including line/reflection symmetry, rotational symmetry. (grade 4)']].map(function(e) { return ['li', e]; })
							),
							'Additionally, materials should not assess pattern problems in K–5 that do not support the focus on arithmetic, such as “find the next one” problems.'
					]),
				'!ca1/i1a'
			];
		},

		initView: function()
		{
			// -- Load standards select data
			$(clustersStandards.standardsData).insertAfter('#details_standards');
			var standards = $('.view select option').map(function() {
				return { id:this.value, text:_.unescape(this.innerHTML), subj:this.parentElement.className };
			}).get();

			$('.view .supgrade').text(utils.lessonGrade);

			// -- Create the Select2 box
			$('#details_standards').select2(
			{
				multiple: true,
				width: '100%',
				formatSelection: function(a) {
					return a.id + '<span>' + a.text.replace(a.id+':', '') + '</span>';
				},
				minimumInputLength: 1,
				placeholder: "Begin typing a standard",
				escapeMarkup: function(m) { return _.unescape(m); },
				initSelection: function(element, callback)
				{
					var data = [];
					if($(element).val())
						$($(element).val().split(",")).each(function()
						{
							var id = this;
						    data.push({id:id, text:standards.filter(function(a) {
						    	return a.id==id })[0].text
							});
						});

					callback(data);
				},
				query: function(q)
				{
					var s = q.term.toLowerCase();
					var num = utils.lessonGrade;
					if (num == 'k') {
						num = 0;
					} else {
						parseInt(num);
					}
					var grades = ['K','1','2','3','4','5','(6|6-8)','(7|6-8)','(8|6-8)','(9|9-10)','(10|9-10)','(11|11-12)','(12|11-12)'][num];
					if(utils.isHS()) {
						grades = '([A-JL-Z]|HS)';
					}

					var re = new RegExp('^' + grades + '[.-]');
					q.callback({results:standards.filter(
						function(a)	{ return a.subj=='standards-math' && a.text.toLowerCase().indexOf(s) > -1 && (re.test(a.id) || /^MP/.test(a.id)) }
						).slice(0, 200)
					});
				}
			});

			$('#details_standards').on('change', function(e)
			{
				$('.standards-list').empty();
				mathBase.loadStandards($('#details_standards').val());
				$('.select2-choices .select2-search-choice').hide();

				$('.select2-search-field input').prop('placeholder', $('.select2-search-choice').length ? "Begin typing a standard" : '');

				if (e.removed)
				{
					var count = $('.select2-choices .select2-search-choice').length;
					if (count === 0 && $('#cs-other').val()==='') {
						$('#0_2 .state-complete').removeClass('active');
					}
				}
			});

			$('.view').off('click', '.standards-btn span').on('click', '.standards-btn span', function() {

				var tag = $(this).parent().find('b').html();
				$(this).parent().fadeOut(400, function() {
					$('#details_standards').select2('val',
						_.without($('#details_standards').select2('val'), tag)
					);
					$('#details_standards').change();
				});
			});

			// -- Check SM for previous values and load them if needed
			// -- Then set it to an SM field so it gets monitored
			var blob = stateManager.dataJson;
			var preload_data = [];
			if (blob['standards-tags'])
			{
				var tags = blob['standards-tags'].split(',');
				for (var i=0; i<tags.length; ++i)
				{
					var tagId = tags[i];
					var dataObject = {};
					dataObject.id = tagId;

					var matchingItem = _.where(standards, {id:tagId});
          if(!matchingItem || !matchingItem.length) continue;
					var txt = matchingItem[0].text;
					txt = txt.substr(tagId.length+2);
					dataObject.text = txt;

					preload_data.push(dataObject);
				}
			}

			if (preload_data.length>0) {
				$('#details_standards').select2('data', preload_data);
			}

			$('.select2-container').attr('data-sid', 's2-standards-tags');
			$('.select2-container').attr('data-sloaded', 'true');
			$('.select2-container').attr('data-stype', 'value');
			$('#details_standards').addClass('sm');

			clustersStandards.updateSMList();

			$('#details_standards').change();
			//mathBase.loadStandards($('#details_standards').val());
			//$('.select2-choices .select2-search-choice').hide();

		},

		updateSMList: function()
		{
			var viewData = {};
			viewData.smList = {};

			$('.view').find('.sm').each(function(index, val)
			{
				var sId = $(this).attr('data-sid');
				viewData.smList[sId] = '1';
			});

			stateManager.activeFields = viewData.smList;
		}
	};

	return clustersStandards;
});
