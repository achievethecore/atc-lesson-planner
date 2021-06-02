define(
    ['jquery', 'view-templates/ela/standards.html', 'modules/state-manager', 'modules/utils', 'lib/select2'],
    function($, template, stateManager, utils)
{
	var standardsViewELA =
	{

		template: template,

		standardsData: window._standardsHTML,

		getViewMarkup: function(content)
		{
			var viewData = {};
			viewData.markup = template;
			viewData.smList = {};
			viewData.onNext = function(app) {
				app.showDashboard();
			};

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
					['h4', 'Selecting Standards'],
					'A close-reading lesson will address multiple ELA/Literacy standards. Select all that apply.',
				],
				'!ca1,ca2',
			];
		},

		initView: function()
		{
			// -- Check if text choice was set
			if (stateManager.dataJson['tc-1'] !== undefined && stateManager.dataJson['tc-1'] !== '') {
				$('.view .main-h1').html('Select which Common Core State Standards are covered in ' + stateManager.dataJson['tc-1']);
			}


			// -- Load standards select data
			$(standardsViewELA.standardsData).insertAfter('#details_standards');
			var standards = $('.view select option').map(function() {
				return { id:this.value, text:_.unescape(this.innerHTML), subj:this.parentElement.className };
			}).get();

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
				initSelection: function(element, callback)
				{
					var data = [];
					$(element.val().split(",")).each(function()
					{
						var id = this;
					    data.push({id:id, text:standards.filter(function(a) {
					    	return a.id==id; })[0].text
						});
					});

					callback(data);
				},
				query: function(q)
				{
					/*
					var s = q.term.toLowerCase();
					q.callback({results:standards.filter(function(a) {
						return a.subj=='standards-ela' && a.text.toLowerCase().indexOf(s) > -1 }).slice(0, 200)
					})
					*/
					var s = q.term.toLowerCase();
					var num = utils.lessonGrade;
					if (num == 'k') {
						num = 0;
					} else {
						parseInt(num);
					}
					var grades = ['K','1','2','3','4','5','(6|6-8)','(7|6-8)','(8|6-8)','(9|9-10)','(10|9-10)','(11|11-12)','(12|11-12)'][num];
					if(utils.isHS()) {
						//grades = '([A-JL-Z]|HS)';
					}

					var re = new RegExp('^' + grades + '[.-]');
					q.callback({results:standards.filter(function(a)
					{
						return a.subj=='standards-ela' && a.text.toLowerCase().indexOf(s) > -1 && re.test(a.id); }).slice(0, 200)
					});
				}
			});


			// -- Check SM for previous values and load them if needed
			// -- Then set it to an SM field so it gets monitored
			var blob = stateManager.dataJson;
			var preload_data = [];
			if (blob['ela-standards-tags'])
			{
				var tags = blob['ela-standards-tags'].split(',');
				for (var i=0; i<tags.length; ++i)
				{
					var targetStandard = _.findWhere(standards, {id:tags[i]});
          if(!targetStandard) continue;
					var meaning = targetStandard.text||'';
					meaning = meaning.substr(tags[i].length+2);

					var dataObject = {};
					dataObject.id = tags[i];
					dataObject.text = meaning;

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

			standardsViewELA.updateSMList();
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

	return standardsViewELA;
});
