define(
    ['jquery', 'modules/utils', 'tinymce', 'modules/state-manager', 'modules/sidebar-right', 'views/math/_base'], 
    function ($, utils, tinyMCE, stateManager, sidebarRight, mathBase)
{
	var coherenceFW = 
	{

		createMCE: function(id, onChange)
		{
			tinymce.init({
				selector: id,
				height: 325, 
				toolbar: "bold italic underline overline | bullist subscript superscript symbols frac", 
				plugins: "paste", 
				paste_as_text: true, 
				menubar: false, 
				statusbar: false, 
				browser_spellcheck: true,
				skin_url:'assets/css/skins/lightgray',
				forced_root_block: false, /* to allow inline tables - emits no <p> */
				setup: function(editor)
				{
					editor.on('change', function(event) {
						editor.save();
						if(typeof onChange == 'function') onChange(editor, event);
					});
						
					editor.on('init', function(event) {	
		                editor.formatter.register('overline', {
		                    inline: 'span',
		                    styles: { textDecoration: 'overline' },
		                    exact: true
		                });
					
	                });
	                
					editor.addButton('overline', {
						tooltip: 'Overline',
						text: '¯¯',
		                onclick: function() {
		                    tinymce.activeEditor.execCommand('mceToggleFormat', false, 'overline');
		                },
							// from tinymce/classes/ui/FormatControls.js
						onPostRender: function() {
							var self = this;
		
							// TODO: Fix this
							if (editor.formatter) {
								editor.formatter.formatChanged('overline', function(state) {
									self.active(state);
								});
							} else {
								editor.on('init', function() {
									editor.formatter.formatChanged('overline', function(state) {
										self.active(state);
									});
								});
							}
						}
					});


					var syms = '><≥≤=≠≈÷×π±∥¢$□∆∠°µ√';
			        editor.addButton('symbols', {
			            type: 'menubutton',
			            text: '√',
			            icon: false,
			            menu: $.map(syms.split(''), function(e,i) { return { text:e, onclick:function(){editor.insertContent(e)} } }) 
			        });
			        editor.addButton('frac', {
			            text: 'x/y',
			            icon: false,
			            onclick:function(){ editor.insertContent('<table style="text-align:center;display:inline-table;"><tr><td style="border-bottom:1px solid"></td></tr><tr><td></td></tr></table>') } 
			        });
				}
			});
		},
		
		hasMajorWork: function() {
			if(utils.isHS()) return true; // not really defined
			
			var blob = stateManager.dataJson;
			
			if(!blob['standards-tags']) return false;
			
			var allTags = blob['standards-tags'].split(',');
			
			return _.intersection(allTags, window.standardsData.major.split(',')).length > 0;

		},
		hasSupportingWork: function() {
			if(utils.isHS()) return true; // not really defined
			
			var blob = stateManager.dataJson;
			
			if(!blob['standards-tags']) return false;
			
			var allTags = blob['standards-tags'].split(',');
			
			return _.intersection(allTags, window.standardsData.supporting.split(',')).length > 0;

		},
		hasAdditionalWork: function() {
			if(utils.isHS()) return true; // not really defined
			
			var blob = stateManager.dataJson;
			
			if(!blob['standards-tags']) return false;
			
			var allTags = blob['standards-tags'].split(',');
			
			return _.intersection(allTags, window.standardsData.additional.split(',')).length > 0;

		},

		loadStandards: function(immediateTags)
		{
			var blob = stateManager.dataJson;
			
			var expanded = $('.standards-list.expanded').length > 0;

			$('.view .main-h1 + .standards-selected > div > .standards-list').empty().append(
				['div', {class:'k8'}].concat(
					['Major', 'Supporting', 'Additional', 'Practice'].map(function(e) {
						return ['div', {class:e.toLowerCase()},
							['div', {class:'standards-selected'}, (expanded ? (e + ' work of the grade: ') : ''),
								['span', {class:'standards-list'}]
							]
						 ];
					})
				)
			.toDomNodes());
			$('.view .main-h1 + .standards-selected > div > .standards-list').append(
				['div', {class:'hs'}].concat(
					['Widely', 'Non-widely', 'Practice'].map(function(e) {
						return ['div', {class:e.toLowerCase()},
							['div', {class:'standards-selected'}, (expanded ? ( e + '-applicable Prerequisites: ') : ''),
								['span', {class:'standards-list'}]
							]
						 ];
					})
				)
			.toDomNodes());

			// -- Check, Find, & Load Standards
			var standards = false;
			if (blob['standards-tags'] || immediateTags)
			{
				standards = true;
				var allTags = blob['standards-tags'].split(',');
				if(immediateTags) allTags = immediateTags.split(',');
				if(immediateTags === "") allTags = [];
				
				// Filter out all clusters
				//allTags = _.difference(allTags, window.standardsData.clusters.split(','));
				
				// Draw & Sort Tags
				var i;
				$('.k8').toggle(!utils.isHS());
				$('.hs').toggle(utils.isHS());
				
				var standardToTag = function(id) {
						return ['a', {class:'standards-btn '+ (/CLUSTER/.test(id)?'cluster-btn':''), title:(_.findWhere(window.standardsData.math,{id: id}).description||'').replace('\n','')}, ['b', id]
							].toDomNodes();
				};
					
				if (utils.isHS())
				{


					// Sort Tags
					var widelyBlob = window.standardsData.widely;
					var widelyTags = widelyBlob.split(',');
					// remove clusters from widely
					widelyTags = _.difference(widelyTags, window.standardsData.clusters.split(','));
					var widelyMatches = _.intersection(widelyTags, allTags);

					$('.hs .widely').toggle(widelyMatches.length > 0);

					_.each(widelyMatches, function(e) {
						var tagMarkup = ['a', {class:'standards-btn', title:_.findWhere(window.standardsData.math,{id: e}).description}, ['b', e]
							].toDomNodes();
						$('.view .hs .widely .standards-selected > span').append(tagMarkup);
					});

					
					var nonWidely = _.difference(allTags, widelyTags);
					nonWidely = _.difference(nonWidely, window.standardsData.clusters.split(','));
					
					$('.hs .non-widely').toggle(nonWidely.length > 0);
					
					_.each(nonWidely, function(e) {
						var tagMarkup = ['a', {class:'standards-btn', title:_.findWhere(window.standardsData.math,{id: e}).description}, ['b', e]
							].toDomNodes();
						$('.view .hs .non-widely .standards-selected > span').append(tagMarkup);
					});
					
					
					// Sort clusters
					var widelyClusterBlob = window.standardsData.widelyclusters;
					var widelyClusterTags = widelyClusterBlob.split(',');
					var widelyClusterMatches = _.intersection(widelyClusterTags, allTags);
					
					$('.hs .cluster').toggle(widelyClusterMatches.length > 0);

						_.each(widelyClusterMatches, function(e) {
							var tagMarkup = ['a', {class:'standards-btn cluster-btn', title:_.findWhere(window.standardsData.math,{id: e}).description}, ['b', e]
								].toDomNodes();
							$('.view .hs .cluster .standards-selected > span').append(tagMarkup);
						});
						
						$('.hs .practice').toggle(false);
						/*
					var hsMPMatches = _.filter(allTags, function(a) { return /^MP/.test(a); });
					
					$('.hs .practice').toggle(hsMPMatches.length > 0);
					$('.view .hs .practice .standards-selected > span').append(_.map(hsMPMatches, standardToTag));*/
				} else {

					// Sort tags
					var majorBlob = window.standardsData.major;
					var majorTags = majorBlob.split(',');

					var supportingBlob = window.standardsData.supporting;
					var supportingTags = supportingBlob.split(',');

					var additionalBlob = window.standardsData.additional;
					var additionalTags = additionalBlob.split(',');
					
					var majorMatches = _.intersection(majorTags, allTags);
					var supportingMatches = _.intersection(supportingTags, allTags);
					var additionalMatches = _.intersection(additionalTags, allTags);
					
					var MPMatches = _.filter(allTags, function(a) { return /^MP/.test(a); });
					

					$('.k8 .major').toggle(majorMatches.length > 0);
					$('.view .k8 .major .standards-selected > span').append(_.map(majorMatches, standardToTag));


					$('.k8 .supporting').toggle(supportingMatches.length > 0);

					$('.view .k8 .supporting .standards-selected > span').append(_.map(supportingMatches, standardToTag));
	

					$('.k8 .additional').toggle(additionalMatches.length > 0);
					$('.view .k8 .additional .standards-selected > span').append(_.map(additionalMatches, standardToTag));
					
					$('.k8 .practice').toggle(MPMatches.length > 0);
					$('.view .k8 .practice .standards-selected > span').append(_.map(MPMatches, standardToTag));

				}
				
				if(expanded) { // standard selection page
					$('.expanded .standards-btn').each(function() {
						$(this).append(': ' + _.unescape($(this).attr('title'))).attr('title', null);
						$(this).append('<span href="#" class="select2-search-choice-close" tabindex="-1"></span>');
					});
				}
				else { // buttons with tooltips
					$('.standards-btn').tooltip({placement:'bottom', container:'.col-middle', html:true});
				}
			}
			else { // no standards
				$('.view .k8, .view .hs').css('display', 'none');
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
		},
		
		
		PDSimple: function(header, body) {
			return ['div', 
				['h4', header ],
				['p', body ]
				];
		},
		
		PDCourseGrade: function(header, body) {
			return ['div', 
				['h4', header.replace(/Grade/g, utils.isHS() ? 'Course':'Grade' ).replace(/grade/g, utils.isHS() ? 'course':'grade' ) ],
				['p', body.replace(/Grade/g, utils.isHS() ? 'Course':'Grade' ).replace(/grade/g, utils.isHS() ? 'course':'grade' ) ]
				];
		}

	};

	return coherenceFW;
});