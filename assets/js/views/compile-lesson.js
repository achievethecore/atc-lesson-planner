define(
    ['jquery', 'handlebars', 'modules/state-manager', 'modules/utils', 'view-templates/compile-lesson.html', 'view-templates/compile-lesson-ela.html', 'view-templates/compile-lesson-ela.html'], 
    function ($, Handlebars, stateManager, utils, template, elaTemplate, mathTemplate)
{
	var compileLesson = 
	{
		template: template,
		lessonTemplate: null,
		elaTemplate: elaTemplate,
		mathTemplate: mathTemplate,
		dataStandards: null,
		dataJson: null,

		getViewMarkup: function()
		{
			var viewData = {};
			viewData.markup = this.template;
			viewData.smList = {};

			return viewData;
		},

		initView: function()
		{
			compileLesson.getData();

			$('.to-top').click(function(event) 
			{
				$('html,body').animate({scrollTop:0}, 500);
				return false;
			});
			$(window).scroll(function() {
  				compileLesson.monitorScroll();
			});
		},

		monitorScroll: function()
		{
			var scroll = $('body').scrollTop();
			if (scroll >= 600) {
				$('.to-top').addClass('active');
			} else {
				$('.to-top').removeClass('active');
			}
			
		
			
			var active = _.last($('.compiled-lesson a[name]').map(function() { return [[$(this).offset().top, $('.compile a[href="#'+this.name+'"')]]; }).filter(function(i,a) { return ( (a[0] - 100) < scroll ); }));
			
			if(active && !active[1].hasClass('active')) {
				$('.compile a.active').removeClass('active'); 
			 	active[1].addClass('active');
			}


		},

		getData: function()
		{
			compileLesson.dataJson = stateManager.dataJson;
			//require(['modules/sidebar-right'], function(sidebarRight)
			//{
            	compileLesson.dataStandards = sidebarRight.jsonStandards;
            	compileLesson.parseTemplate();
            //});
		},

		parseTemplate: function()
		{
			Handlebars.registerHelper('csv', function(csv, options) {
				var vals = _.unique((csv||'').split(','));
				var out = '';
				for(var i in vals) {
					out += options.fn(vals[i]);
				}
				return out;
			});
			Handlebars.registerHelper('imagify', function() {
				var src = this;
				if(/pdf$/i.test(src)) {
					return new Handlebars.SafeString("<div class='inline-pdf' data-url='"+Handlebars.Utils.escapeExpression(src)+"' />");
				}
				return new Handlebars.SafeString("<img src=\"attachments/" + compileLesson.dataJson.lessonid + '/' + Handlebars.Utils.escapeExpression(src) + "\">");
			});
			
			Handlebars.registerHelper('editSection', function() {
				var src = this;
				if(utils.lessonType == 'ela')
					return utils.elaSections[ Content.ELA.Modules.indexOf(this) ].link;

					return utils.mathSections[ Content.Math.Modules.indexOf(this) ].link;
			});
			
			Handlebars.registerHelper('slugify', function(str) {
				return str.toLowerCase().replace(/[^a-z]+/g, '-');
			});
			
			Handlebars.registerHelper('formatCAI', function() {
				if(this.cai) return new Handlebars.SafeString(this.cai.split(',').map(function() { return '<span class="compile-bubble cai">CORE ACTION '+this.cai+'</span>'; }).join(' '));
				return "";
			});
			Handlebars.registerHelper('formatTitle', function() {
				var t = this.title;
				if(typeof t == 'function') t = t(stateManager, utils);
				return t;
			}); 
			
			Handlebars.registerHelper('formatQuestions', function() {
				var qs = this.questions;
				if(typeof qs == 'function') qs = qs(stateManager, utils);

				var html = _.map(qs, function(q, i) {
					var hdr = q.header;
					var htxt = q.compiletext || q.text;
					if(q.type == 'complexity') {  htxt = (hdr ? (hdr + ': Rating') : 'Rating'); hdr = ''; }
					//if(qs.length == 1) hdr = '';
					
					var cpx = ['Exceedingly Complex', 'Very Complex', 'Moderately Complex', 'Slightly Complex', 'NA'];
					var formatCheckbox = _.chain([1,2,3,4,5]).map(function(i) { return /selected/.test(compileLesson.dataJson[q.sid + i]) ? ( (q.type === 'complexity' ? (cpx[i-1]+' - ') : '') + q.labels[i-1]) : ''  }).compact().value().join('<br>');
					

					
					var h = '<div class="block-item"><span class="title">' + htxt + '</span>';
					if(hdr) h = '<h2>' + hdr + '</h2>' + h;
					
					if(q.cai) h += ' ' + (q.cai.split(',').map(function(a) { return '<span class="compile-bubble cai">CORE ACTION '+a+'</span>'; }).join(' '));
 
					if(q.type == 'header')
						return h + '</div>';
					if(q.format == 'inline')
						return '<p>' + q.header + ': ' + '<span class="item">' + (compileLesson.dataJson[q.sid]||'') + '</span></p>';

					if(q.type == 'text')
						h += '<p class="item">' + Handlebars.escapeExpression( compileLesson.dataJson[q.sid]||'' ) + '</p>' ;
					else if(q.type == 'textarea') 
						h += '<p class="item">' + (compileLesson.dataJson[q.sid]||'') + '</p>';
					else if(q.type == 'complexity')
						h += '<p class="item">' + formatCheckbox + '</p>';
					else if(q.type == 'check')
						h += '<p class="item">' + formatCheckbox + '</p>';
					else if(q.type == 'check2col')
						h += '<p class="item">' + formatCheckbox + '</p>';
					else if(q.type == 'lit-info')
						h += '<p class="item">' + formatCheckbox + '</p>';
					else if(q.type == 'tbq')
						h += '<p class="item" data-special="tbq"></p>';
					else if(q.type == 'standards')
						h += '<p class="item" data-special="standards-list"></p>';
					return h  + '</div>';
				});
				
				
				return new Handlebars.SafeString(html.join(''));
			});
			
			if (utils.lessonType == 'ela') {
				compileLesson.lessonTemplate = Handlebars.compile(compileLesson.elaTemplate);
			} else {
				compileLesson.lessonTemplate = Handlebars.compile(compileLesson.mathTemplate);
			}
			
			

//			var compiledMarkup = compileLesson.lessonTemplate(compileLesson.dataJson);
			var compiledMarkup;
			if (utils.lessonType == 'ela') {
				compiledMarkup = compileLesson.lessonTemplate({Modules:Content.ELA.Modules, attached:compileLesson.dataJson.attached});
			}
			else {
				compiledMarkup = compileLesson.lessonTemplate({Modules:Content.Math.Modules, attached:compileLesson.dataJson.attached});
			}
			
			$('.compiled-lesson .data').html(compiledMarkup);
			
			$('.compiled-lesson .data .inline-pdf').each(function() { 
				var div=this; 
				$(div).parent().prev().append(" <i class='icon-refresh icon-spin'></i>");
				$.get('pdfimages.php?id=' + compileLesson.dataJson.lessonid + '&file=' + encodeURIComponent($(this).data('url')), 
				 function(imageshtml) { $(div).parent().prev().find('i').fadeOut(1000); $(div).html(imageshtml); });
				 
			});

            var section = $('body').attr('data-section');
            if(section > -1) {
			 $('.segment-div, .segment').hide(); 
			 $('.segment').eq(section).show();
			}
			
			var grade = compileLesson.dataJson.lessongrade;
			if (grade == '9' || grade == '10' || grade == '11' || grade == '12')
			{
				if (compileLesson.dataJson.lessontype == 'math') {
					$('#grtext4').html('Course');
				}
			}

			compileLesson.itemTypes();
			
            var intv = setInterval(function() {
                   /* no ajax incoming*/    /* all img have .complete == true */
                if($.active === 0 && _.chain($('img')).pluck('complete').every().value()) {
			    	window.status = 'ready';
			    	clearInterval(intv);
			    }
			}, 100);
			
		},

		itemTypes: function()
		{
			$('.item').each(function(index, val) 
			{
				// -- Check for HTML (tinyMCE)
				if ($(this).attr('data-html')) {
					$(this).html($(this).text());
				}

				// -- Check for checks
				if ($(this).attr('data-check')) {
					compileLesson.handleChecks($(this));
				}

				// -- Check for special instances
				if ($(this).attr('data-special')) {
					compileLesson.handleSpecial($(this));
				}

				// -- Finaly check for empties
				var data = $(this).html();
				if (data.length<1) {
					//$(this).addClass('empty');
					//$(this).html('Fill this in...');
				}
			});


			// -- Other special instances
			if (compileLesson.dataJson.lessontype == 'ela')
			{
				var val;
/*
				val = $('#compile-tbp').html();
				if (val.indexOf('What are the critical ideas') > -1) {
					$('#compile-tbp').html('');
				}

				val = $('#compile-mp').html();
				if (val.indexOf('provide information about the causes') > -1) {
					$('#compile-mp').html('');
				}

				val = $('#compile-ts').html();
				if (val.indexOf('E.g. The sentence structure') > -1) {
					$('#compile-ts').html('');
				}

				val = $('#compile-lf').html();
				if (val.indexOf('E.g. The vocabulary') > -1) {
					$('#compile-lf').html('');
				}

				val = $('#compile-kd').html();
				if (val.indexOf('E.g. The passage is self-contained') > -1) {
					$('#compile-kd').html('');
				}

				/*val = $('#compile-at').html();
				if (val.indexOf('E.g. Create an evidence') > -1) {
					$('#compile-at').html('');
				}*/

				$('#compile-vocab1').html($('#compile-vocab1').text());
				$('#compile-vocab2').html($('#compile-vocab2').text());
			} else
			{
				// -- Math Focus
				/*if (compileLesson.dataJson['cs-other'])
				{
					$('#focus-alternate-1').css('display', 'block');
					$('#focus-alternate-2').css('display', 'block');
				} else
				{
					var grade = compileLesson.dataJson.lessongrade;
					if (grade == '9' || grade == '10' || grade == '11' || grade == '12')
					{
						$('#focus-hs').css('display', 'block');
					} else {
						$('#focus-grades-1').css('display', 'block');
						if (compileLesson.dataJson['focus-supporting'] == '1') {
							$('#focus-grades-2').css('display', 'block');
						}
					}
				}*/
			}

			//require(['modules/sidebar-left'], function(sidebarLeft) {
            	sidebarLeft.configureHeights();
            //});
		},

		handleChecks: function(item)
		{
			var checkId = $(item).attr('data-id');
			$(item).html('');
			for (var i=0; i<5; ++i)
			{
				var fieldName = checkId + (i+1);
				if (compileLesson.dataJson[fieldName] !== undefined)
				{
					var val = compileLesson.dataJson[fieldName];
					if (val.indexOf('selected') > -1) 
					{
						var label = compileLesson.dataStandards.compile[checkId].label[i];
						var meaning = compileLesson.dataStandards.compile[checkId].meaning[i];

						var markup = label;
						markup += '<div>' + meaning + '</div>';
						if($(item).html()) $(item).append('<br>');
						$(item).append(markup);
					} 
				}
			}
		},

		handleSpecial: function(item)
		{
			var specialType = $(item).attr('data-special');
			var tagData, tags, compileMarkup, i, markup;

			// -- Literary Informational 
			if (specialType == 'literary')
			{
				var found = false;
				var val;

				if (compileLesson.dataJson.libtn1)
				{
					val = compileLesson.dataJson.libtn1;
					if (val.indexOf('selected') > -1) 
					{
						found = true;
						$(item).html('Literary Text');
					} 
				}

				if (compileLesson.dataJson.libtn2)
				{
					val = compileLesson.dataJson.libtn2;
					if (val.indexOf('selected') > -1) 
					{
						found = true;
						$(item).html('Informational Text');
					} 
				}

				if (!found) {
					//$(item).html('Choose Literary or Informational');
					//$(item).addClass('empty');
				}
			}


			// -- Text Based Questions
			if (specialType == 'tbq')
            {
                if (compileLesson.dataJson['tbq-items'])
                {
                    compileMarkup = '';
                    var dataMarkup = compileLesson.dataJson['tbq-items'];
                    $(dataMarkup).find('.tbq-item-input').each(function(index, val) 
                    {
                        var value = $(this).attr('value');
                        if (value!==undefined)
                        {
                            compileMarkup+=value;
                            compileMarkup+='<br/><br/>';
                        }
                    });

                    if (compileMarkup!=='')
                    {
                        compileMarkup = compileMarkup.slice(0, -5);
                        $(item).html(compileMarkup);
                    }
                }
            }


			// -- Standards Top
			if (specialType == 'standards')
			{
				if (compileLesson.dataJson['ela-standards-tags'])
				{
					tagData = compileLesson.dataJson['ela-standards-tags'];
					tags = tagData.split(',');

					for (i=0; i<tags.length; ++i)
					{
						markup = '<span class="compile-bubble">' + tags[i] + '</span>';
						$(item).append(markup);
					}
				} else if (compileLesson.dataJson['standards-tags'])
				{
					tagData = compileLesson.dataJson['standards-tags'];
					tags = tagData.split(',');

					// Filter out all clusters
					/*tags = _.reject(tags, function(val) {
						return val.substr(2,7)=='CLUSTER';
					});*/
					tags = _.difference(tags, window.standardsData.clusters.split(','));

					for (i=0; i<tags.length; ++i)
					{
						markup = '<span class="compile-bubble">' + tags[i] + '</span>';
						$(item).append(markup);
					}
				}
			}


			// -- Standards Bottom
			if (specialType == 'standards-list')
			{
				if (compileLesson.dataJson['ela-standards-tags'] || compileLesson.dataJson['standards-tags'] || compileLesson.dataJson['cs-other'])
				{
					tagData = compileLesson.dataJson['ela-standards-tags'] || compileLesson.dataJson['standards-tags'] || compileLesson.dataJson['cs-other'];
					tags = tagData.split(',');
					compileMarkup = '';
					if(compileLesson.dataJson['cs-other']) tags = [];

					for (i=0; i<tags.length; ++i)
					{
						var meaning = _.findWhere(compileLesson.dataStandards[utils.lessonType], {id:tags[i]});
						meaning = meaning.description;
						markup = tags[i] + ' - ' + meaning;
						compileMarkup += markup + '<br/>';
					}

					if(compileLesson.dataJson['cs-other']) compileMarkup = compileLesson.dataJson['cs-other'];
					compileMarkup = compileMarkup.slice(0, -5);
					$(item).html(compileMarkup);
				}
			}

			// -- Clusters
			if (specialType == 'cluster')
			{
				if (compileLesson.dataJson['standards-tags'])
				{
					tagData = compileLesson.dataJson['standards-tags'];
					tags = tagData.split(',');

					// Filter out all clusters
					/*tags = _.filter(tags, function(val) {
						return val.substr(2,7)=='CLUSTER';
					});*/
					tags = _.intersection(tags, window.standardsData.clusters.split(','));

					for (i=0; i<tags.length; ++i)
					{
						markup = '<span class="compile-bubble">' + tags[i] + '</span>';
						$(item).append(markup);
					}
				}
			}

			// -- Tools
			if (specialType == 'tools')
			{
				var toolList = ['Colored Pencils', 'Technology', 'Number line', 'Drawings', 'Graph Paper', 'Representations', 'Ruler', 'Tables', 'Manipulatives', 'Calculator', 'Coordinate plane', 'Other', 'Spreadsheet'];
				var tools = [];
				for (i=1; i<=toolList.length; ++i)
				{
					var toolData = compileLesson.dataJson['tools-check'+i];
					if (toolData!==undefined && toolData!=='')
					{
						if (toolData.indexOf('selected') > -1) {
							tools.push(toolList[i-1]);
						}
					}
				}

				if (tools.length>0) 
				{
					var toolString = tools.join(', ');
					$(item).html(toolString);
				}
			}
		}

	};

	return compileLesson;
});