var eBase = 
{

	createMCE: function(id, onChange)
	{
		tinymce.init({
			selector: id,
			height: 325, 
			toolbar: "bold italic underline | bullist", 
			plugins: "paste", 
			paste_as_text: true, 
			menubar: false, 
			statusbar: false, 
			browser_spellcheck: true,
			skin_url:'assets/css/skins/lightgray',
			setup: function(editor)
			{
				editor.on('change', function(event) {
					editor.save();  
					if(typeof onChange == 'function') onChange(editor, event);
				});
			}
		});
	},
	
	PDExamples: function(elementary, secondary, bigidea) {
		var titles = ['Charlotte\'s Web', '1984'];
		var files = ['1622', '2403'];
		if(stateManager.isInformational()) {
			titles = ['The Moon Book', 'The Great Fire'];
			files = ['1578', '801'];
		}
		var i = /^(k|[1-5])$/.test(utils.lessonGrade) ? 0 : 1; 
		
		
		if(bigidea) { // big idea & culminating task use both lit & info
			titles = ['Charlotte\'s Web', 'The Great Fire'];
			files = ['1622', '801'];
		}
		
		return ['div', 
			['h4', 'Example'],
			['p', 'For example, from "' + titles[i] + '":' ],
			['blockquote', [elementary, secondary][i]],
			['p', ['a', {href:'//achievethecore.org/file/'+files[i], target:'_blank'}, titles[i] + ' Lesson']]
			];
	},
	
	PDSimple: function(header, body) {
		return ['div', 
			['h4', header],
			['p', body ]
			];
	}
	

};

module.exports = eBase;
