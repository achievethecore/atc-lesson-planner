define(
    ['jquery', 'view-templates/attach-document.html', 'modules/top-block', 'dropzone', 'modules/utils', 'handlebars', 'view-templates/attach-item.html'], 
    function($, template, topBlock, Dropzone, utils, Handlebars, templateFile)
{
	var attachDocument = 
	{
		template: template,
		templateFile: Handlebars.compile(templateFile),
		dropzone: null,

		getViewMarkup: function()
		{
			var viewHtml = this.template;
			return viewHtml;
		},

		initView: function()
		{
			$('.top-container .close-btn').click(function(event) 
			{
				topBlock.toggleHeight();
				return false;
			});

			attachDocument.initDropzone();
			attachDocument.checkForPastFiles();

			$('body').on('click', '.filelist .remove', function()
			{
				attachDocument.removeFile($(this));
				return false;
			});
		},

		initDropzone: function()
		{
			$('#dz-lessonid').val(utils.lessonId);

			// -- Create dropzone
			var dropzoneConfig = {
				url: 'upload.php',
				maxFilesize: 2,
				//acceptedFiles: 'image/*,application/pdf',
				autoProcessQueue: true,
				parallelUploads: 1,
				uploadMultiple: false,
				dictDefaultMessage: 'Drag & drop files here<div class="sub">or click to upload from your computer.</div>',
				addRemoveLinks: true,
				fallback: function() { this.element.innerHTML = "<div class=dz-message>You are using an unsupported version of Internet Explorer. <div class=\"sub\">To upload a file, you'll need to <a href='http://www.whatbrowser.org/' target='_blank'>upgrade to a modern browser</a>.</div></div>"; return this.element; },
				previewsContainer: '.dz-previews'
			};
			attachDocument.dropzone = new Dropzone('form#dropzone', dropzoneConfig);

			// -- Attach listeners
			attachDocument.dropzone.on('addedfile', function(file) {
				$('.dz-progress .progress-bar').css('width', '0px');
				$('.dz-progress .message .file').html('- ' + file.name);
				$('.dropzone').addClass('inprogress');
			});

			attachDocument.dropzone.on('uploadprogress', function(file, progress) {
				$('.dz-progress .progress-bar').css('width', Math.round(progress)+'%');
			});

			attachDocument.dropzone.on('success', function(file) 
			{
				$('.dz-progress .progress-bar').css('width', '100%');
				$('.dropzone').removeClass('inprogress');
				$('.dropzone .lpt-error').remove();
				attachDocument.addFileToList(file.name);
			});

			attachDocument.dropzone.on('error', function(file, error) {
				$('.dropzone').removeClass('inprogress').find('.sub').append('<div class=lpt-error>'+error+'</div>');
			});
		},

		checkForPastFiles: function()
		{
			var fileList = $('.dz-filelist').html();
			if (fileList!=='' && fileList.length>0)
			{
				var files = fileList.split(',');
				files = _.uniq(files);
				for (var i=0; i<files.length; ++i) {
					attachDocument.addFileToList(files[i]);
				}
			}
		},

		addFileToList: function(file)
		{
			// -- Add to actual file list
			var extension = file.substr(file.length-3).toLowerCase();

			var fileData = {};
			fileData.url = 'attachments/' + utils.lessonId + '/' + file;
			if (extension == 'jpg' || extension == 'peg') {
				fileData.icon = 'G';	
			} else {
				fileData.icon = 'G';
			}

			var fileName = file;
			if (fileName.length>=24) {
				fileName = fileName.substr(0, 21);
				fileName += '...';
			}
			fileData.fileName = fileName;
      fileData.file = file;
      var displayNames = JSON.parse($('.dz-displaynames').html()||'{}');
      if(displayNames[file])
        fileData.fileName = displayNames[file];
      displayNames[file] = fileName;
      $('.dz-displaynames').html(JSON.stringify(displayNames));

			var fileMarkup = attachDocument.templateFile(fileData);
			$('.filelist').append(fileMarkup);
      

      $('.filelist .edit').last().unbind('mousedown').mousedown(function() {
      	if($(this).prev('input').length) { $(this).prev('input').val('').focus().blur(); return; }
        var displayNames = JSON.parse($('.dz-displaynames').html()||'{}');
        $(this).prev().replaceWith('<input class=link data-file="'+file+'" value="'+displayNames[file]+'" />');
        $('.filelist input').bind('blur', function() {
            var displayNames = JSON.parse($('.dz-displaynames').html()||'{}');
            if($(this).val()) 
              displayNames[file] = $(this).val();
            $('.dz-displaynames').html(JSON.stringify(displayNames));
            $(this).replaceWith('<a href="'+fileData.url+'" data-file="'+file+'" class="link" target="_blank">'+displayNames[file]+'</a>');
        });
      });
			$('.attach-document').addClass('files');

			// -- Add to SM list
			if ($('.dz-filelist').html().length<1) {
				$('.dz-filelist').append(file);
			} else {
				$('.dz-filelist').append(',' + file);
			}
		},

		removeFile: function(file)
		{
			// -- Actually remove it
			file = $(file).parent();

			var fileName = $(file).find('.link').data('file');

			var fileList = $('.dz-filelist').html();
			var files = fileList.split(',');
			files = _.filter(files, function(x) { return x != fileName; });

			$('.dz-filelist').html( files.join(',') );

			$(file).remove();

			// -- Check if no more left
			if ($('.filelist').children().length<1) {
				$('.attach-document').removeClass('files');
			}
		}

	};

	return attachDocument;
});