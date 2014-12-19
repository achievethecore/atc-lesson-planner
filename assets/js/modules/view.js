/*

Overview: view functions

*/


define(
	['jquery', 'modules/utils', 'modules/state-manager' ],
	function($, utils, stateManager)
{
	var view = 
	{
		breadcrumb: function(id) {
			return '<div class="sm breadcrumb" data-id="0_0" data-stype="class" data-sid="bc'+id+'" data-sloaded="false"></div>';
		},
		
		view: function(id, children) {
			return view.breadcrumb(id) + '<div class="view '+ id +'" data-ca="ca1" data-indicator="i1b">'+ children.join("") +'</div>';
		},
		
		steps: function(t) {
			return '<span class="steps">'+t+'</span>';
		},
		
		header: function(h1, p, needhelp, step) {
			return '<h1 class="main-h1">'+ h1 +'<p>'+p+'</p>'+ ( (needhelp === false) ? '' : '<div class="header-buttons"><a href="#" class="btn-strive"></a></div>') + '</h1>';
		},
		
		checkbox: function(id,i,label,sublabel) {
			return '<li><div class="checkbox sm" data-stype="class" data-sid="'+id+'-check'+(1+i)+'" data-sloaded="false"></div>'+
				'<div class="checkbox-content"><h1>'+label+'</h1>'+(sublabel||'')+'</div></li>';
				
		},
		
		checkboxes: function(id, boxes) {
			return '<ul class="checkboxes small wide">'+ boxes.map(function(e,i){return view.checkbox(id,i,e);}).join('') +'</ul>';
		},
		
		checkboxes_2col: function(id, boxes) {
			return '<ul class="checkboxes small">'+ boxes.map(function(e,i){return view.checkbox(id,i,e);}).join('') +'</ul>';
		},
		
		complexity: function(id, descriptions) {
			var labels = ['Exceedingly Complex', 'Very Complex', 'Moderately Complex', 'Slightly Complex', 'NA'];
			
			return '<ul class="checkboxes small wide">'+ descriptions.map(function(e,i){return view.checkbox(id,i,labels[i],e);}).join('') +'</ul>';
		},
		
		input: function(h1, id) {
			return '<h1 class="input-h1">'+h1+'</h1>'+
					'<input type="text" class="sm small" data-stype="value" data-sid="'+id+'" data-sloaded="false">';
		},
		
		mce: function(id) {
			return '<textarea id="'+id+'-text" class="sm" data-stype="value" data-sid="'+id+'-mce" data-sloaded="false"></textarea>';
		},
		
		standardsSelectedContainer: function() {
			return '<div class="standards-selected">Standards Selected:	<span class="standards-list"></span></div>';
		},
		
		
		prevnext: function(nextOnly) {
			if(nextOnly)
				return '<a href="#" class="np view-next large">NEXT<span>]</span></a>';
			
			return '<div class="prev-next-wrapper">'+
					'<a href="#" class="np view-prev large"><span>[</span>PREVIOUS</a>'+
					'<a href="#" class="np view-next large">NEXT<span>]</span></a>'+
				'</div>';
		},
		
		formatContent: function(content) {
			var questions = content.questions;
			if(typeof questions == 'function') questions = questions(stateManager, utils);
			if(content.multi === true) questions = [ questions[app.subPage] ];
			
			var id = questions[0].sid.split('-')[0];
			
			return view.view(id, _.map(questions, function(q, i) {
				var h = view.header(q.header, q.text, id !== 'li');
				if(q.type == 'header')
					return h;
				if(q.format == 'inline')
					return view.input(q.header, q.sid);
				else if(i > 0) // add <hr> to separate non-inline q's
					h = '<hr>' + h;
				if(q.type == 'text')
					h += view.input('', q.sid);
				else if(q.type == 'textarea') 
					h += view.mce(q.sid.replace('-mce', ''));
				else if(q.type == 'complexity')
					h += view.complexity(q.sid.replace('-check', ''), q.labels);
				else if(q.type == 'check')
					h += view.checkboxes(q.sid.replace('-check', ''), q.labels);
				else if(q.type == 'check2col')
					h += view.checkboxes_2col(q.sid.replace('-check', ''), q.labels);
				return h;
			}).concat([view.prevnext(id === 'li')])
			);
		},
	};

	return view;
});