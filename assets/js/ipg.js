define(
    ['jquery', 'handlebars', 'view-templates/ipg-ela.html', 'view-templates/ipg-math.html'],
    function ($, Handlebars, elaTemplate, mathTemplate)
{
    var ipg = 
    {
        lessonTemplate: null,
        elaTemplate: elaTemplate,
        mathTemplate: mathTemplate,
        dataStandards: null,
        dataJson: null,
        lessonType: null,
        lessonGrade: null,

        initialize: function()
        {
            var lessonId = $('body').attr('data-id');
            $.get('/lpt-get-data/' + lessonId + '/static', function(response)
            {
                var rJSON = JSON.parse(response);
                ipg.dataJson = JSON.parse(rJSON.state);
                ipg.lessonType = ipg.dataJson.lessontype;
                ipg.lessonGrade = ipg.dataJson.lessongrade;

                console.log(ipg.dataJson);

                ipg.getData();
            });
        },

        getData: function()
        {
            //$.get('assets/data/standards.json', function(response)
            //{
                ipg.dataStandards = window.standardsData; /*JSON.parse(response);

                var standardsHTML = $(standardsHTMLData);

				ipg.dataStandards.ela = standardsHTML.filter('.standards-ela').find('option').map(function() {
					return { id:this.value, description:this.innerHTML.replace(this.value+": ", "") };
				}).get();

				ipg.dataStandards.math = standardsHTML.filter('.standards-math').find('option').map(function() {
					return { id:this.value, description:this.innerHTML.replace(this.value+": ", "") };
				}).get();*/


                ipg.parseTemplate();
            //});
        },

        parseTemplate: function()
        {
            if (ipg.lessonType == 'ela') {
                ipg.lessonTemplate = Handlebars.compile(ipg.elaTemplate);
            } else {
                ipg.lessonTemplate = Handlebars.compile(ipg.mathTemplate);
            }


            // -- Header
            if (ipg.dataJson['li-3']) {
                $('.date').html('Date: ' + ipg.dataJson['li-3']);
            }
            $('.subject').html(ipg.lessonType.toUpperCase());
            $('.grade').html('GRADE: ' + ipg.lessonGrade.toUpperCase());
            $('.header').css('visibility', 'visible');


            // -- Add CA/IND to dataJson
            if (ipg.lessonType == 'ela')
            {
                ipg.dataJson.ca2 = ipg.dataStandards.cai.ela.ca2.c;
                ipg.dataJson.ca3 = ipg.dataStandards.cai.ela.ca3.c;

                if (ipg.lessonGrade == '3' || ipg.lessonGrade == '4' || ipg.lessonGrade == '5' || ipg.lessonGrade == '6' || ipg.lessonGrade == '7' || ipg.lessonGrade == '8' || ipg.lessonGrade == '9' || ipg.lessonGrade == '10' || ipg.lessonGrade == '11' || ipg.lessonGrade == '12')
                {
                    ipg.dataJson.ca1 = ipg.dataStandards.cai.ela.ca1.b;

                    ipg.dataJson.i1b = ipg.dataStandards.cai.ela.i1b.b;
                    ipg.dataJson.i1c = ipg.dataStandards.cai.ela.i1c.b;
                    ipg.dataJson.i2c = ipg.dataStandards.cai.ela.i2c.b;
                    ipg.dataJson.i3a = ipg.dataStandards.cai.ela.i3a.b;
                    ipg.dataJson.i3b = ipg.dataStandards.cai.ela.i3b.b;
                    ipg.dataJson.i3c = ipg.dataStandards.cai.ela.i3c.b;
                    ipg.dataJson.i3d = ipg.dataStandards.cai.ela.i3d.b;
                    ipg.dataJson.i3e = ipg.dataStandards.cai.ela.i3e.b;
                } else {
                    ipg.dataJson.ca1 = ipg.dataStandards.cai.ela.ca1.a;

                    ipg.dataJson.i1b = ipg.dataStandards.cai.ela.i1b.a;
                    ipg.dataJson.i1c = ipg.dataStandards.cai.ela.i1c.a;
                    ipg.dataJson.i2c = ipg.dataStandards.cai.ela.i2c.a;
                    ipg.dataJson.i3a = ipg.dataStandards.cai.ela.i3a.a;
                    ipg.dataJson.i3b = ipg.dataStandards.cai.ela.i3b.a;
                    ipg.dataJson.i3c = ipg.dataStandards.cai.ela.i3c.a;
                    ipg.dataJson.i3d = ipg.dataStandards.cai.ela.i3d.a;
                    ipg.dataJson.i3e = ipg.dataStandards.cai.ela.i3e.a;
                }
            } else if (ipg.lessonType == 'math')
            {
                ipg.dataJson.ca1 = ipg.dataStandards.cai.math.ca1.c;
                ipg.dataJson.ca2 = ipg.dataStandards.cai.math.ca2.c;
                ipg.dataJson.ca3 = ipg.dataStandards.cai.math.ca3.c;

                if (ipg.lessonGrade == '9' || ipg.lessonGrade == '10' || ipg.lessonGrade == '11' || ipg.lessonGrade == '12')
                {
                	ipg.dataJson.ca2 = ipg.dataStandards.cai.math.ca2.b;
                	ipg.dataJson.ca3 = ipg.dataStandards.cai.math.ca3.b;

                    ipg.dataJson.i1a = ipg.dataStandards.cai.math.i1a.b;
                    ipg.dataJson.i1b = ipg.dataStandards.cai.math.i1b.b;
                    ipg.dataJson.i1c = ipg.dataStandards.cai.math.i1c.b;
                    ipg.dataJson.i2a = ipg.dataStandards.cai.math.i2a.b;
                    ipg.dataJson.i2b = ipg.dataStandards.cai.math.i2b.b;
                    ipg.dataJson.i2c = ipg.dataStandards.cai.math.i2c.b;
                    ipg.dataJson.i2d = ipg.dataStandards.cai.math.i2d.b;
                    ipg.dataJson.i2e = ipg.dataStandards.cai.math.i2e.b;
                    ipg.dataJson.i3a = ipg.dataStandards.cai.math.i3a.b;
                    ipg.dataJson.i3b = ipg.dataStandards.cai.math.i3b.b;
                    ipg.dataJson.i3c = ipg.dataStandards.cai.math.i3c.b;
                    ipg.dataJson.i3d = ipg.dataStandards.cai.math.i3d.b;
                    ipg.dataJson.i3e = ipg.dataStandards.cai.math.i3e.b;
                    ipg.dataJson.i3f = ipg.dataStandards.cai.math.i3f.b;
                    ipg.dataJson.i3g = ipg.dataStandards.cai.math.i3g.b;
                } else {
                	ipg.dataJson.ca2 = ipg.dataStandards.cai.math.ca2.a;
                	ipg.dataJson.ca3 = ipg.dataStandards.cai.math.ca3.a;

                    ipg.dataJson.i1a = ipg.dataStandards.cai.math.i1a.a;
                    ipg.dataJson.i1b = ipg.dataStandards.cai.math.i1b.a;
                    ipg.dataJson.i1c = ipg.dataStandards.cai.math.i1c.a;
                    ipg.dataJson.i2a = ipg.dataStandards.cai.math.i2a.a;
                    ipg.dataJson.i2b = ipg.dataStandards.cai.math.i2b.a;
                    ipg.dataJson.i2c = ipg.dataStandards.cai.math.i2c.a;
                    ipg.dataJson.i2d = ipg.dataStandards.cai.math.i2d.a;
                    ipg.dataJson.i2e = ipg.dataStandards.cai.math.i2e.a;
                    ipg.dataJson.i3a = ipg.dataStandards.cai.math.i3a.a;
                    ipg.dataJson.i3b = ipg.dataStandards.cai.math.i3b.a;
                    ipg.dataJson.i3c = ipg.dataStandards.cai.math.i3c.a;
                    ipg.dataJson.i3d = ipg.dataStandards.cai.math.i3d.a;
                    ipg.dataJson.i3e = ipg.dataStandards.cai.math.i3e.a;
                    ipg.dataJson.i3f = ipg.dataStandards.cai.math.i3f.a;
                    ipg.dataJson.i3g = ipg.dataStandards.cai.math.i3g.a;
                }
            }

            // -- Compile it
            var compiledMarkup = ipg.lessonTemplate(ipg.dataJson);
            $('.data').html(compiledMarkup);
            ipg.itemTypes();
        },

        itemTypes: function()
        {
            $('.item').each(function(index, val)
            {
                // -- Check for HTML (tinymce)
                if ($(this).attr('data-html')) {
                    $(this).html($(this).text());
                }

                // -- Check for checks
                if ($(this).attr('data-check')) {
                    ipg.handleChecks($(this));
                }

                // -- Check for special instances
                if ($(this).attr('data-special')) {
                    ipg.handleSpecial($(this));
                }

                // -- Finally check for empties
                var data = $(this).html();
                if (data.length<1) {
                    $(this).addClass('empty');
                    $(this).html('Fill this in...');
                }
            });

            window.status = 'ready';
        },

        handleChecks: function(item)
        {
            var checkId = $(item).attr('data-id');
            $(item).html('');
            for (var i=0; i<5; ++i)
            {
                var fieldName = checkId + (i+1);
                if (ipg.dataJson[fieldName] !== undefined)
                {
                    var val = ipg.dataJson[fieldName];
                    if (val.indexOf('selected') > -1)
                    {
                        var label = ipg.dataStandards.compile[checkId].label[i];
                        var meaning = ipg.dataStandards.compile[checkId].meaning[i];

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

                if (ipg.dataJson.libtn1)
                {
                    val = ipg.dataJson.libtn1;
                    if (val.indexOf('selected') > -1)
                    {
                        found = true;
                        $(item).html('Literary Text');
                    }
                }

                if (ipg.dataJson.libtn2)
                {
                    val = ipg.dataJson.libtn2;
                    if (val.indexOf('selected') > -1)
                    {
                        found = true;
                        $(item).html('Informational Text');
                    }
                }

                if (!found) {
                    $(item).html('Choose Literary or Informational');
                    $(item).addClass('empty');
                }
            }

            // -- Text Based Questions
            if (specialType == 'tbq')
            {
                if (ipg.dataJson['tbq-items'])
                {
                    compileMarkup = '';
                    var dataMarkup = ipg.dataJson['tbq-items'];
                    $(dataMarkup).find('.tbq-item-input').each(function(index, val)
                    {
                        var value = $(this).attr('value');
                        if (value!==undefined)
                        {
                            compileMarkup+=value;
                            compileMarkup+='<br/>';
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
                if (ipg.dataJson['ela-standards-tags'])
                {
                    tagData = ipg.dataJson['ela-standards-tags'];
                    tags = tagData.split(',');

                    for (i=0; i<tags.length; ++i)
                    {
                        markup = '<span class="compile-bubble">' + tags[i] + '</span>';
                        $(item).append(markup);
                    }
                } else if (ipg.dataJson['standards-tags'])
                {
                    tagData = ipg.dataJson['standards-tags'];
                    tags = tagData.split(',');

                    // Filter out all clusters
                    tags = _.difference(tags, window.standardsData.clusters.split(','));

                    tags = tags.join(', ');
                    (item).append(tags);
                    /*
                    for (i=0; i<tags.length; ++i)
                    {
                        markup = '<span class="compile-bubble">' + tags[i] + '</span>';
                        $(item).append(markup);
                    }
                    */
                }
            }


            // -- Standards Bottom
            if (specialType == 'standards-list')
            {
                if (ipg.dataJson['ela-standards-tags'])
                {
                    tagData = ipg.dataJson['ela-standards-tags'];
                    tags = tagData.split(',');
                    compileMarkup = '';

                    for (i=0; i<tags.length; ++i)
                    {
                        var meaning = _.findWhere(ipg.dataStandards[ipg.lessonType], {id:tags[i]});
                        meaning = meaning.description;
                        markup = tags[i] + ' - ' + meaning;
                        compileMarkup += markup + '<br/>';
                    }

                    compileMarkup = compileMarkup.slice(0, -5);
                    $(item).html(compileMarkup);
                }
            }

            // -- Clusters
            if (specialType == 'cluster')
            {
                if (ipg.dataJson['standards-tags'])
                {
                    tagData = ipg.dataJson['standards-tags'];
                    tags = tagData.split(',');

                    // Filter out all clusters
                    tags = _.intersection(tags, window.standardsData.clusters.split(','));

                    tags = tags.join(', ');
                    (item).append(tags);
                    /*
                    for (i=0; i<tags.length; ++i)
                    {
                        markup = '<span class="compile-bubble">' + tags[i] + '</span>';
                        $(item).append(markup);
                    }
                    */
                }
            }

            // -- Focus
            if (specialType == 'focus')
            {
                markup = '';
                var grade = ipg.dataJson.lessongrade;
                if (grade == '9' || grade == '10' || grade == '11' || grade == '12')
                {
                    if (ipg.dataJson['focus-widely'] == '1') {
                        markup += '<p>The standard(s) targeted for this lesson is a part of the Widely Applicable Prerequisites. As a reminder, a majority of instructional time over the course of the year should be focused on developing knowledge and skills that are widely applicable as prerequisites for postsecondary education.</p>';
                    } else {
                        markup = "<p>The standard(s) targeted for this lesson are not part of the Widely Applicable Prerequisites. As a reminder, a majority of instructional time over the course of the year should be focused on developing knowledge and skills that are widely applicable as prerequisites for postsecondary education.</p>";
                    }
                } else {
                    if (ipg.dataJson['focus-major'] == '1') {
                        markup += '<p>The standard(s) targeted in this lesson is major work. As a reminder, 65-85% of instructional time over the course of the year should be focused on the major work of the grade.</p>';
                    } else {
                        markup += '<p>The standard(s) targeted in this lesson is not major work. As a reminder, 65-85% of instructional time over the course of the year should be focused on the major work of the grade.</p>';
                    }
                }

                $(item).append(markup);
            }
        }
    };

    return ipg;
});
