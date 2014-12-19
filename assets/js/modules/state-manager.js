/* 

Overview: Automatic state management in regards to keeping track of user progress

Notes:
All state managed items(SMI) will be tagged with class 'sm'
When an SMI is added to the stage it will be flagged with sloaded="false".
As the SM runs through its loop it will either update the blob or pull from the blob (local one)
All SMI's marked as sloaded false will pull from the blob. Once pulled it should set to true.
That way on the next iteration the SM knows to update the blob and not the SMI.
Individual modules and items will be responsible for triggering an update() command as needed.
That way as soon as a new SMI item propgates it can instantly pull from the blob.
Each SMI has an 'stype':
[attribute]
html
value
ddlabel
When the SMI iterates through it will set its type
with the value found based on the SMI's 'sid'. 

When a new module is loaded it updates the SM's activeFields in order to compare for differences. At the
end of an SM loop if there is a change/dirty state it updates it and sends it to the DB. This was to 
hopefully lessen the burd on actual server traffic unless needed.

*For the most part the SM and tool as a whole are self sufficient. Meaning you should not have
to do much besides set those fields and it will handle the rest. There are however a few select cases
where additional logic is needed. The following are those specific instances:
math/cluster, math/standards, math/type-work

*/


var stateManager = 
	{
		dataBlob: '{}',
		dataJson: null,
		activeFields: {},
		isHalted: false,

		init: function()
		{
			stateManager.dataJson = JSON.parse(stateManager.dataBlob);
			setInterval(stateManager.update, 150);
		},
		
		isSelected: function(check) {

				return /selected/.test(stateManager.dataJson[check]);

		},
		
		isInformational: function() { return stateManager.isSelected('libtn2'); },

		update: function(dbSync)
		{
			if (!stateManager.isHalted)
			{
				var viewProgress = false;
				var dirty = false;

				$('.sm').each(function(index, value)
				{
					var sType = $(this).attr('data-stype');
					var sId = $(this).attr('data-sid');
					var sLoaded = $(this).attr('data-sloaded');
					var jsonValue = stateManager.dataJson[sId];
					
					if (sLoaded === false || sLoaded == 'false' || dbSync === true)
					{
						if (jsonValue !== undefined && jsonValue != 'undefined')
						{
							if (sType == 'html') {
								$(this).html(jsonValue);
							} else if (sType == 'value') {
								$(this).val(jsonValue);
							} else if (sType == 'ddlabel') {
								$(this).find('.ddlabel').text(jsonValue);
							} else {
								$(this).attr(sType, jsonValue);
							}
						}

						$(this).attr('data-sloaded', 'true');
					} else {
						if (sType == 'html') {
							if ($(this).html() != stateManager.dataJson[sId] && stateManager.dataJson[sId] !== undefined) {
								dirty = true;
							}
							stateManager.dataJson[sId] = $(this).html();
						} else if (sType == 'value') {
							if ($(this).val() != stateManager.dataJson[sId] && stateManager.dataJson[sId] !== undefined) {
								dirty = true;
							}
							stateManager.dataJson[sId] = $(this).val();
						} else if (sType == 'ddlabel') {
							if ($(this).find('.ddlabel').text() != stateManager.dataJson[sId]) {
								dirty = true;
							}
							stateManager.dataJson[sId] = $(this).find('.ddlabel').text();
						} else {
							if ($(this).attr(sType) != stateManager.dataJson[sId] && stateManager.dataJson[sId] !== undefined) {
								dirty = true;
							}
							stateManager.dataJson[sId] = $(this).attr(sType);
						}
					}

					// Check active fields for subnav tagging
					if (stateManager.activeFields[sId] == '1' && dirty) 
					{
						var activeValue = stateManager.dataJson[sId];
						if (activeValue !== '' && activeValue !== undefined && activeValue != 'undefined') {
							viewProgress = true;
						}
					}
				});

				if (viewProgress === true) {
					sidebarLeft.toggleStateIcon('self', 'complete', true);
				}

				if (dirty) {
					//console.log(stateManager.dataJson);
					var account = require('modules/account');
					account.updateBlobOnDB(stateManager.dataJson);
				}
			}
		},

		updateWithBlob: function(blob)
		{
			stateManager.dataJson = JSON.parse(blob);
			stateManager.update(true);
		},

		addToBlob: function(index, value)
		{
			stateManager.dataJson[index] = value;
			stateManager.updateDebounced();
			//account.updateBlobOnDB(stateManager.dataJson);
		},
		
		updateDebounced: _.debounce(function() {
			var account = require('modules/account');
			account.updateBlobOnDB(stateManager.dataJson);
		}, 50),

		halt: function() 
		{
			stateManager.isHalted = true;
		},

		resume: function()
		{
			/*
			console.log('SM Resume');
			console.log('dataJson: ', stateManager.dataJson);
			console.log('dataBlob: ', stateManager.dataBlob);
			console.log('activeFields: ', stateManager.activeFields);
			*/
			stateManager.isHalted = false;
		},

		reset: function()
		{
			stateManager.dataBlob = '{}';
			stateManager.activeFields = {};
			stateManager.dataJson = JSON.parse('{}');
			//console.log('SM Reset');
			//console.log(stateManager.dataJson);
		}
	};

module.exports = stateManager;