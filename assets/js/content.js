window.Content = {
    "ELA": {
        "Modules": [
            {
                "title": "Planning a Standards-Aligned Close-Reading Lesson",
                "Sections": [
                    {
                        "title": "Lesson Details",
                        "questions": [
                            {
                                "header": "Lesson Details",
                                "text": "What will I call this lesson, and when will I teach it?",
                                "compiletext" : " ",
                                "type": "header",
                                "sid": "li"
                            },
                            {
                                "header": "Name of Lesson",
                                "format": "inline",
                                "type": "text",
                                "sid": "li-2"
                            },
                            {
                                "header": "Class/Period",
                                "format": "inline",
                                "type": "text",
                                "sid": "li-1"
                            },
                            {
                                "header": "Lesson date",
                                "format": "inline",
                                "type": "text",
                                "sid": "li-3"
                            },
                            {
                                "header": "Number of days/class periods for lesson",
                                "format": "inline",
                                "type": "text",
                                "sid": "li-4"
                            }
                        ]
                    },
                    {
                        "title": "Text Choice",
                        "questions": function(sm, utils) { return [
                            {
                                "header": "Text Choice",
                                "text": /^(k|1|2)$/.test(utils.lessonGrade) ? "What is the title of the read-aloud anchor text(s) (e.g. book, article, etc.) I will use in the lesson?" : "What is the title of the anchor text(s) (e.g. book, article, etc.) I will use in the lesson?",
                                "format": "",
                                "type": "text",
                                "sid": "tc-1",
                                "cai": "1",
                            }
                        ]; }
                    },
                    {
                        "title": "Text Complexity",
                        "questions": function(sm, utils) { return [
                            {
                                "header": "Text Complexity",
                                "text": /^(k|1|2)$/.test(utils.lessonGrade) ? "Has this anchor text already been evaluated for its read-aloud complexity from a trusted source?" : "Has this anchor text already been evaluated for complexity from a trusted source?",
                                "format": "",
                                "type": "check2col",
                                "labels": ["Yes", "No"],
                                "sid": "tc2-check",
                                "cai": "1",
                            }
                        ]; }
                    },
                    {
                        "title": "Text Analysis",
                        "questions": [
                            {
                                "header": "Text Analysis",
                                "text": "Am I confident the anchor text(s) are at or above the complexity level expected for the grade and time in the school year?",
                                "format": "",
                                "type": "check2col",
                                "labels": ["Yes", "No"],
                                "cai": "1",
                                "sid": "ta-check",
                            }
                        ]
                    },
                    {
                        "title": "Quantitative Measure",
                        "sid": "ls",
                        "questions": [
                            {
                                "header": "Quantitative Measure",
                                "text": "Select the tool you will use to determine the quantitative level",
                                "format": "",
                                "type": "check",
                                "labels": [
											'ATOS Analyzer – Renaissance Learning ',
											'Degrees of Reading Power® – Questar',
											'The Lexile Framework® – MetaMetrix',
											'Coh-Metrix Easability Tool  – University of Memphis (For Flesch-Kincaid  measure)',
											'Reading Maturity – Pearson Knowledge Technologies'
										],
                                "sid": "lexscore-check",
                                "cai": "1B",
                            },
                            {
                                "header": "What is the quantitative measure for your text?",
                                "format": "inline",
                                "type": "text",
                                "cai": "1B",
                                "sid": "lexscore"
                            }
                        ]
                    }
                ]
            },
            {
                "title": "Evaluating for Qualitative Text Complexity",
                "sid": "litinfo",
                "Sections": [
                    {
                        "title": "Literary/Informational Choice",
                        "questions": [
							{ header: "Literary/Informational Choice",
							text: 'Please choose which best applies to your text.',
							format: '',
								type: "lit-info",
								sid: "libtn",
								labels: ["Literary", "Informational"],
								"cai": "1A",
							}
						]
                    },
                    {
                        "title": function(sm, utils) { return (sm.isInformational()?'Purpose':'Meaning'); },
                        "questions": function(sm, utils) { return [
                            {
                                "header": (sm.isInformational()?'Purpose':'Meaning'),
                                "text": "Note specific examples from the text that make it more or less complex" + (/^(k|1)$/.test(utils.lessonGrade) ? " for a read-aloud experience." : "."),
                                "compiletext": "Evidence",
                                "format": "",
                                "type": "textarea",
                                "sid": "mp-mce",
                                "cai": "1C",
                            },
                            {
                                "header": "",
                                "text": "Evaluate the complexity of the text by selecting one of the following:",
                                "format": "",
                                "type": "complexity",
                                "labels": (
									sm.isInformational()?[
										'Subtle, implied, difficult to determine; intricate, theoretical elements',
										'Implied, but fairly easy to infer; more theoretical than concrete',
										'Implied, but easy to identify based upon context or source',
										'Explicitly stated; clear, concrete with a narrow focus'
									]
									:[
										'Several levels and competing elements of meaning that are difficult to identify, separate, and interpret; themeis implicit or subtle, often ambiguous and revealed over the entirety of the text',
										'Several levels of meaning that may be difficult to identify or separate; theme is implicit or subtle and may be revealed over the entirety of the text',
										'More than one level of meaning with levels clearly distinguished from each other; theme is clear but may be conveyed with some subtlety',
										'One level of meaning; theme is obvious and revealed early in the text.',
									]
                                ),
                                "cai": "1C",
                                "sid": "mp-check"
                            }
                        ]}
                    },
                    {
                        "title": "Text Structure",
                        "questions": function(sm) { return  sm.isInformational()?
						[
                            {
                                "header":"Text Structure: Organization of Main Ideas, Text Features, and Use of Graphics",
                                "text": "Note specific examples from the text that make it more or less complex" + (/^(k|1)$/.test(utils.lessonGrade) ? " for a read-aloud experience." : "."),
                                "compiletext": "Evidence",
                                "format": "",
                                "type": "textarea",
                                "sid": "ts-mce",
                                "cai": "1B",
                            },
                            {
                                "header": "Organization",
                                "text": "Evaluate the complexity of the text by selecting one of the following:",
                                "format": "",
                                "type": "complexity",
                                "sid": "ts2-check",
                                "cai": "1B",
                                "labels": [
					'Connections between an extensive range of ideas or events are deep, intricate and often implicit or subtle; organization of the text is intricate or specialized for a particular discipline',
					'Connections between an expanded range ideas, processes or events are deeper and often implicit or subtle; organization may contain multiple pathways and may exhibit traits common to a specific discipline',
					'Connections between some ideas or events are implicit or subtle; organization is evident and generally sequential',
					'Connections between ideas, processes or events are explicit and clear; organization of text is clear or chronological or easy to predict'
				]
                            },
                            {
                                "header": "Text Features",
                                "text": "Evaluate the complexity of the text by selecting one of the following:",
                                "format": "",
                                "type": "complexity",
                                "sid": "ts3-check",
                                "cai": "1B",
                                "labels": [
					'If used, are essential in understanding content',
					'If used, greatly enhance the reader\'s understanding of content',
					'If used, enhance the reader\'s understanding of content',
					'If used, help the reader navigate and understand content but are not essential',
				]
                            },
                            {
                                "header": "Use of Graphics",
                                "text": "Evaluate the complexity of the text by selecting one of the following:",
                                "format": "",
                                "type": "complexity",
                                "sid": "ts4-check",
                                "cai": "1B",
                                "labels": [
						'If used, extensive, intricate, essential integrated graphics, tables, charts, etc., necessary to make meaning of text; also may provide information not otherwise conveyed in the text',
						'If used, essential integrated graphics, tables, charts, etc.; may occasionally be essential to understanding the text',
						'If used, graphics mostly supplementary to understanding of the text, such as indexes, glossaries; graphs, pictures, tables, and charts directly support the text',
						'If used, simple graphics, unnecessary to understanding the text but directly support and assist in interpreting the written text',
						''
					]
                            }
                        ]
						:
						[
                            {
                                "header":"Text Structure: Organization and Use of Graphics",
                                "text": "Note specific examples from the text that make it more or less complex" + (/^(k|1)$/.test(utils.lessonGrade) ? " for a read-aloud experience." : "."),
                                "compiletext": "Evidence",
                                "format": "",
                                "type": "textarea",
                                "sid": "ts-mce",
                                "cai": "1B"
                            },
                            {
                                "header": "Organization",
                                "text": "Evaluate the complexity of the text by selecting one of the following:",
                                "format": "",
                                "type": "complexity",
                                "sid": "ts2-check",
                                "cai": "1B",
                                "labels": [
					'Organization is intricate with regard to elements such as narrative viewpoint, time shifts, multiple characters, storylines and detail ',
					'Organization may include subplots, time shifts and more complex characters ',
					'Organization may have two or more storylines and occasionally difficult to predict ',
					'Organization of text is clear, chronological or easy to predict ',
				]
                            },
                            {
                                "header": "Use of Graphics",
                                "text": "Evaluate the complexity of the text by selecting one of the following:",
                                "format": "",
                                "type": "complexity",
                                "sid": "ts3-check",
                                "cai": "1B",
                                "labels": [
					'If used, minimal illustrations that support the text',
					'If used, a few illustrations that support the text',
					'If used, a range of illustrations that support selected parts of the text',
					'If used, extensive illustrations that directly support and assist in interpreting the written text',
					''
				]
                            }
                        ];
						 }
                    },
                    {
                        "title": "Language Features",
                        "questions": [
                            {
                                "header": "Language Features: Conventionality, Vocabulary, Sentence Structure",
                                "text": "Note specific examples from the text that make it more or less complex" + (/^(k|1)$/.test(utils.lessonGrade) ? " for a read-aloud experience." : "."),
                                "compiletext": "Evidence",
                                "format": "",
                                "type": "textarea",
                                "cai": "1B",
                                "sid": "lf-mce"
                            },
                            {
                                "header": "Conventionality",
                                "text": "Evaluate the complexity of the text by selecting one of the following:",
                                "format": "",
                                "type": "complexity",
                                "sid": "lf2-check",
                                "cai": "1B",
                                "labels": [
					'Dense and complex; contains abstract, ironic, and/or figurative language',
					'Complex; contains some abstract, ironic, and/or figurative language',
					'Largely explicit and easy to understand with some occasions for more complex meaning',
					'Explicit, literal, straightforward, easy to understand'
				]
                            },
                            {
                                "header": "Vocabulary",
                                "text": "Evaluate the complexity of the text by selecting one of the following:",
                                "format": "",
                                "type": "complexity",
                                "sid": "lf3-check",
                                "cai": "2C",
                                "labels": [
					'Generally unfamiliar, archaic, subject-specific, or overly academic language; may be ambiguous or purposefully misleading',
					'Somewhat complex language that is sometimes unfamiliar, archaic, subject-specific, or overly academic',
					'Mostly contemporary, familiar, conversational; rarely unfamiliar or overly academic',
					'Contemporary, familiar, conversational language'
				]
                            },
                            {
                                "header": "Sentence Structure",
                                "text": "Evaluate the complexity of the text by selecting one of the following:",
                                "format": "",
                                "type": "complexity",
                                "sid": "lf4-check",
                                "cai": "1B",
                                "labels": [
					'Mainly complex sentences often containing multiple concepts',
					'Many complex sentences with several subordinate phrases or clauses and transition words',
					'Simple and compound sentences, with some more complex constructions',
					'Mainly simple sentences'
				]
                            }
                        ]
                    },
                    {
                        "title": "Knowledge Demands",
                        "questions": function(sm) { return sm.isInformational() ?
						[
                            {
                                "header": "Knowledge Demands: Subject Matter Knowledge and Intertextuality",
                                "text": "Note specific examples from the text that make it more or less complex" + (/^(k|1)$/.test(utils.lessonGrade) ? " for a read-aloud experience." : "."),
                                "compiletext": "Evidence",
                                "format": "",
                                "type": "textarea",
                                "cai": "1B",
                                "sid": "kd-mce"
                            },
                            {
                                "header": "Subject Matter Knowledge",
                                "text": "Evaluate the complexity of the text by selecting one of the following:",
                                "format": "",
                                "type": "complexity",
                                "sid": "kd2-check",
                                "cai": "1B",
                                "labels": [
					'Extensive, perhaps specialized or even theoretical discipline-specific content knowledge; range of challenging abstract and theoretical concepts',
					'Moderate levels of discipline-specific content knowledge; some theoretical knowledge may enhance understanding; range of recognizable ideas and challenging abstract concepts',
					'Everyday practical knowledge and some discipline-specific content knowledge; both simple and more complicated, abstract ideas',
					'Everyday, practical knowledge; simple, concrete ideas'
				]
                            },
                            {
                                "header": "Intertextuality",
                                "text": "Evaluate the complexity of the text by selecting one of the following:",
                                "format": "",
                                "type": "complexity",
                                "sid": "kd3-check",
                                "cai": "1B",
                                "labels": [
					'Many references or allusions to other texts or outside ideas, theories, etc.',
					'Some references or allusions to other texts or outside ideas, theories, etc.',
					'A few references or allusions to other texts or outside ideas, theories, etc.',
					'No references or allusions to other texts, or outside ideas, theories, etc.'
				]
                            }
                        ]
						:
						[
                            {
                                "header": "Knowledge Demands: Life Experience, Intertextuality and Cultural Knowledge",
                                "text": "Note specific examples from the text that make it more or less complex" + (/^(k|1)$/.test(utils.lessonGrade) ? " for a read-aloud experience." : "."),
                                "compiletext": "Evidence",
                                "format": "",
                                "type": "textarea",
                                "cai": "1B",
                                "sid": "kd-mce"
                            },
                            {
                                "header": "Life Experience",
                                "text": "Evaluate the complexity of the text by selecting one of the following:",
                                "format": "",
                                "type": "complexity",
                                "sid": "kd2-check",
                                "cai": "1B",
                                "labels": [
					'Explores complex, sophisticated themes; experiences are distinctly different from the common reader',
					'Explores themes of varying levels of complexity; experiences portrayed are uncommon to most readers',
					'Explores a single theme; experiences portrayed are common to many readers',
					'Explores a single theme;experiences portrayed are everyday and common to most readers'
				]
                            },
                            {
                                "header": "Intertextuality and Cultural Knowledge",
                                "text": "Evaluate the complexity of the text by selecting one of the following:",
                                "format": "",
                                "type": "complexity",
                                "sid": "kd3-check",
                                "cai": "1B",
                                "labels": [
					'Many references or allusions to other texts or cultural elements',
					'Some references or allusions to other texts or cultural elements',
					'A few references or allusions to other texts or cultural elements',
					'No references or allusions to other texts or cultural elements'
				]
                            }
                        ];
						 }
                    }
                ]
            },
            {
                "title": "The Big Idea & Culminating Task",
                "Sections": [
                    {
                        "title": "The Big Idea",
                        "questions": [
                            {
                                "header": "The Big Idea",
                                "text": "What are the Big Ideas of the text?",
                                "format": "",
                                "type": "textarea",
                                "sid": "tbp-mce",
                                "cai": "1C"
                            }
                        ]
                    },
                    {
                        "title": "Culminating Task",
                        "questions": [
                            {
                                "header": "Culminating Task",
                                "text": "How will students demonstrate understanding of the Big Idea and what will the culminating activity be? How will I provide for authentic learning, application of literacy skills, student-directed inquiry, analysis, evaluation and/or reflection?",
                                "format": "",
                                "type": "textarea",
                                "cai": "2A,3A,3C",
                                "sid": "wwd2-mce"
                            }
                        ]
                    }
                ]
            },
            {
                "title": "Reader and Task",
                "sid": "twr",
                "Sections": [
                    {
                        "title": "Reader considerations",
                        "multi": true,
                        "questions": [
                            {
                                "header": "Student Engagement",
                                "text": "How will I ensure students do the majority of the work in the lesson? How will I provide students the opportunity to directly engage with the text?",
                                "format": "",
                                "type": "textarea",
                                "cai": "3A",
                                "sid": "twr1-mce"
                            },
                            {
                                "header": "Student Engagement",
                                "text": "How will I provide students opportunities to build understanding through productive struggle?",
                                "format": "",
                                "type": "textarea",
                                "cai": "3B",
                                "sid": "twr2-mce"
                            },
                            {
                                "header": "Student Engagement",
                                "text": "What specifically will I do to ensure students provide precise text evidence when writing and/or speaking about text? How will I contribute feedback to student responses to provide support for students in this process?",
                                "format": "",
                                "type": "textarea",
                                "cai": "3C",
                                "sid": "twr3-mce"
                            },
                            {
                                "header": "Student Engagement",
                                "text": "How will I provide students opportunities to work collaboratively to discuss each other’s thinking and clarify or improve understanding? How will I support students during these opportunities? What will my role be during this collaboration?",
                                "format": "",
                                "type": "textarea",
                                "cai": "3D",
                                "sid": "twr4-mce"
                            }
                        ]
                    },
                    {
                        "title": "Tasks",
                        "multi": true,
                        "sid": "wwd",
                        "questions": function(sm, utils) { return [
                            {
                                "header": "Student Supports",
                                "text": (
									/^(k|1)$/.test(utils.lessonGrade) ?
									"How will I check for understanding throughout the lesson? What scaffolds will I employ for students who are struggling with understanding during the lesson? What supports will I provide for students who read below the grade-level text band? What extensions will I provide for students who read above the grade-level text band?"
									:
									"How will I check for understanding throughout the lesson? What scaffolds will I employ for students who are struggling with understanding during the lesson? What supports will I provide for students who read below the grade-level text band? What extensions will I provide for students who read above the grade-level text band?"),
                                "format": "",
                                "type": "textarea",
                                "cai": "3E",
                                "sid": "wwd1-mce"
                            },
                            {
                                "header": "Integrate Targeted Instruction",
                                "text": (
									/^(k|[1-5])$/.test(utils.lessonGrade) ?
									"How will I integrate targeted instruction in such areas as grammar and conventions, writing strategies, discussion rules and all aspects of foundational reading (if applicable)?"
									:
									"How will I integrate targeted instruction in such areas as grammar and conventions, writing strategies, or discussion rules? "),
                                "format": "",
                                "type": "textarea",
                                "cai": "3F",
                                "sid": "wwd3-mce"
                            }
                            ];
                         }
                    }
                ]
            },
            {
                "title": "Text-Dependent Questions, Activities, & Tasks",
                "Sections": [
                    {
                        "title": "Creation of Text-Dependent Questions",
                        "questions": [
                        	{
								"header": "Text-Dependent Questions and Activities",
	                        	"text": "",
								"type": "tbq",
								"format": "",
								"cai": "2,3",
								"sid": "tbq"
							}
						]
                    },
                    {
                        "title": "Vocabulary",
                        "sid": "v",
                        "questions": [
                            {
                                "header": "Vocabulary",
                                "text": "What vocabulary words demand time and attention because they are critical to comprehension or are related to the big picture?  Once you have determined these words, you may choose to create additional text-dependent questions to address this vocabulary.",
                                "compiletext": "What vocabulary words demand time and attention because they are critical to comprehension or are related to the big picture?",
                                "format": "",
                                "type": "textarea",
                                "cai": "2C",
                                "sid": "vocab1-mce"
                            },
                            {
                                "header": "",
                                "text": "What vocabulary words demand time and attention but are not related to the big picture?",
                                "format": "",
                                "type": "textarea",
                                "cai": "2C",
                                "sid": "vocab2-mce"
                            }
                        ]
                    }
                ]
            },
            {
                "title": "Add Standards",
                "sid": "s",
                "Sections": [
                    {
                        "title": "Standards",
                        "questions": [
                        	{
								"header": "Standards",
	                        	"text": "What standard(s) am I targeting in this lesson?",
								"type": "standards",
								"format": "",
								"sid": "ela-standards-tags",
                                "cai": "1,2"
							}
						]
                    }
                ]
            }
        ]
    },
    "Math": {
        "Modules": [
            {
                "title": "Planning a Standards-Aligned Lesson",
                "Sections": [
                    {
                        "title": "Lesson Details",
                        "questions": [
                            {
                                "header": "Lesson Details",
                                "text": "What will I call this lesson, and when will I teach it?",
                                "compiletext" : " ",
                                "type": "header",
                                "sid": "li"
                            },
                            {
                                "header": "Name of Lesson",
                                "format": "inline",
                                "type": "text",
                                "sid": "li-2"
                            },
                            {
                                "header": "Class/Period",
                                "format": "inline",
                                "type": "text",
                                "sid": "li-1"
                            },
                            {
                                "header": "Lesson date",
                                "format": "inline",
                                "type": "text",
                                "sid": "li-3"
                            },
                            {
                                "header": "Number of days/class periods for lesson",
                                "format": "inline",
                                "type": "text",
                                "sid": "li-4"
                            }
                        ]
                    },
                    {
                        "title": "Clusters & Standards",
                        "sid": "clst",
                        "questions": [
                        	{
								"header": "Selecting Clusters & Standards",
	                        	"text": "What standard(s) and/or cluster(s) am I targeting in this lesson?",
								"type": "standards",
								"format": "",
								"cai": "1A",
								"sid": "standards-tags"
							}
						]
                    },
                    {
                        "title": "Coherence",
                        "questions": function(sm, utils) {
							var mathBase = require('views/math/_base');

							return [
                            {
                                "header": ('Coherence'),
                                "text": (mathBase.hasMajorWork() ?
											'How does this work connect to previous or future work in the grade and what will I do to make that connection?'
											:
											mathBase.hasSupportingWork() ?
												'If applicable, how does this supporting work of the grade connect to the major work of the grade and what will I do to make that connection? '
											:
											mathBase.hasAdditionalWork() ?
												'How does this work connect to work in previous or future grades and what will I do to make that connection?'
											:
												'Why am I covering content from a different grade level and how does it connect to on-grade level work?'
												),
                                "format": "",
                                "type": "textarea",
                                "cai": "1B",
                                "sid": "coh-mce"
                            }
                        ]; }
                    },
                    {
                        "title": "Learning Goal",
                        "questions": [
                            {
                                "header": "Learning Goal",
                                "text": "What is the mathematical learning goal of the lesson?",
                                "format": "",
                                "type": "textarea",
                                "cai": "1A",
                                "sid": "lg-mce"
                            }
                        ]
                    },
                    {
                        "title": "Rigor",
                        "sid": "rigor",
                        "questions": [
                            {
                                "header": "Rigor",
                                "text": "Which aspect(s) of rigor do the targeted standards require?",
                                "format": "",
                                "type": "check",
                                "sid": "ar-check",
                                "cai": "1C",
                                "labels": ["Conceptual understanding", "Procedural skill and fluency", "Application"],
                            }
                        ]
                    },
                    {
                        "title": "Mathematical Explanations",
                        "sid": "me2",
                        "questions": [
                            {
                                "header": "Mathematical Explanations",
                                "text": "What explanations, representations, tasks, and/or examples will I share to make the mathematics of this lesson clear?",
                                "format": "",
                                "type": "textarea",
                                "cai": "2C",
                                "sid": "me1-mce"
                            }
                        ]
                    },
                    {
                        "title":  function(sm, utils) { return utils.isHS() ? "Course-Level Problems": "Grade-Level Problems" },
                        "questions": function(sm, utils) { return [
                            {
                                "header": utils.isHS() ? "Course-Level Problems": "Grade-Level Problems",
                                "text": ( utils.isHS() ? "What course-level problem(s) will I ask the whole class to solve? Attach a document or write below." : "What grade-level problem(s) will I ask the whole class to solve? Attach a document or write below." ),
                                "format": "",
                                "type": "textarea",
                                "cai": "3A",
                                "sid": "grp-mce"
                            }
                        ] }
                    },
                    {
                        "title": "Checks for Understanding",
                        "sid": "cfu",
                        "questions": [
                            {
                                "header": "Checks for Understanding",
                                "text": "What strategies and opportunities will I use to check for understanding throughout the lesson? What questions or problems will I ask?",
                                "format": "",
                                "type": "textarea",
                                "cai": "2C",
                                "sid": "cu1-mce"
                            }
                        ]
                    },
                    {
                        "title": "Discussion Questions",
                        "sid": "sdq",
                        "questions": [
                            {
                                "header": "Discussion Questions",
                                "text": "What questions will I ask to prompt students to share their thinking about the content of the lesson and when will that happen?",
                                "format": "",
                                "type": "textarea",
                                "cai": "3C",
                                "sid": "dq1-mce"
                            }
                        ]
                    }
                ]
            },
            {
                "title": "Mathematics of the Lesson",
                "Sections": [
                    {
                        "title": "Selected Standard(s)",
                        "sid": "focus",
                        "questions": [
                            {
                                "header": "Selected Standards",
                                "text": "Will the lesson address a part of the standard(s) or the entire standard(s)? Explain.",
                                "format": "",
                                "type": "textarea",
                                "cai": "1A",
                                "sid": "focusq1-mce"
                            }
						]
                    },
                    {
                        "title": "Key Mathematics",
                        "sid": "keymath",
                        "refs": "me",
                        "questions": [
                            {
                                "header": "Key Mathematics",
                                "text": "What is the key mathematical idea or concept from the standard(s) I am targeting?",
                                "format": "",
                                "type": "textarea",
                                "cai": "1A",
                                "sid": "km1-mce"
                            },
                            {
                                "header": "",
                                "text": "How will I ensure the lesson will meet the expectations of the standard(s) targeted?",
                                "format": "",
                                "type": "textarea",
                                "cai": "1A",
                                "sid": "km2-mce"
                            }
						]
                    },
                    {
                        "title": "Mathematical Explanations",
                        "sid": "me",
                        "refs": "me",
                        "questions": [
                            {
                                "header": "Mathematical Explanations",
                                "text": "What common misconceptions and opportunities for growth do I anticipate will arise?",
                                "format": "",
                                "type": "textarea",
                                "cai": "2D",
                                "sid": "me2-mce"
                            },
                            {
                                "header": "",
                                "text": "How am I going to address these misconceptions to strengthen students’ understanding of the content?",
                                "format": "",
                                "type": "textarea",
                                "cai": "2D",
                                "sid": "me3-mce"
                            }
                        ]
                    },
                    {
                        "title": "Mathematical Language",
                        "sid": "ml",
                        "refs": "me",
                        "questions": [
                            {
                                "header": "Mathematical Language",
                                "text": "What mathematical language should students use in this lesson?",
                                "format": "",
                                "type": "textarea",
                                "cai": "3E",
                                "sid": "ml1-mce"
                            },
                            {
                                "header": "",
                                "text": "What informal mathematical language do I expect to hear?",
                                "format": "",
                                "type": "textarea",
                                "cai": "3E",
                                "sid": "ml2-mce"
                            },
                            {
                                "header": "",
                                "text": "How will I connect students' informal language to the precise mathematical language of this lesson?",
                                "format": "",
                                "type": "textarea",
                                "cai": "3E",
                                "sid": "ml3-mce"
                            }
                        ]
                    }
                ]
            },
            {
                "title": "Coherent Connections",
                "Sections": [
                    {
                        "title": "Coherence: Prior Knowledge",
                        "refs": "coh",
                        "questions": [
                            {
                                "header": "Prior Knowledge",
                                "text": "What prior skills and knowledge might students bring to this lesson?",
                                "format": "",
                                "type": "textarea",
                                "cai": "1B",
                                "sid": "cpk1-mce"
                            },
                            {
                                "header": "",
                                "text": "What unfinished learning from earlier grades might I need to address within the context of this lesson?",
                                "format": "",
                                "type": "textarea",
                                "cai": "1B",
                                "sid": "cpk2-mce"
                            },
                            {
                                "header": "",
                                "text": "How will the lesson explicitly connect to and build on students’ prior skills and knowledge? What will I say or show my students to make this connection clear?",
                                "format": "",
                                "type": "textarea",
                                "cai": "1B",
                                "sid": "cpk3-mce"
                            }
                        ]
                    },
                    {
                        "title": "Coherence: Future Work",
                        "refs": "coh",
                        "questions": [
                            {
                                "header": "Future Work",
                                "text": "How do the mathematics of this lesson lay the foundation for future work?",
                                "format": "",
                                "type": "textarea",
                                "cai": "1B",
                                "sid": "cfw-mce"
                            }
                        ]
                    }
                ]
            },
            {
                "title": "Problems & Exercises",
                "Sections": [
                    {
                        "title": "Adapting the Lesson",
                        "sid": "atl",
                        "refs": "coh,grp",
                        "questions": function(sm, utils) { return [
                            {
                                "header": "Adapting The Lesson",
                                "text": "Think about students who might need extra support or extension: what scaffolding will I use to support students?",
                                "format": "",
                                "type": "textarea",
                                "cai": "1A,3A",
                                "sid": "al1-mce"
                            },
                            {
                                "header": "",
                                "text": "How will I address remediation or unfinished learning in the context of the on-course-level work?",
                                "format": "",
                                "type": "textarea",
                                "sid": "al2-mce"
                            },
                            {
                                "header": "",
                                "text": "What extension work will I prepare for students who are ready for deeper engagement with "+(utils.isHS()?"course":"grade")+"-level content?",
                                "format": "",
                                "type": "textarea",
                                "sid": "al3-mce"
                            }
                        ]; }
                    },
                    {
                        "title": "Student Thinking",
                        "refs": "grp",
                        "questions": [
                            {
                                "header": "Student Thinking",
                                "text": "Which problem(s) will prompt students to share their thinking and apply their mathematical language?",
                                "format": "",
                                "type": "textarea",
                                "cai": "3C,3E",
                                "sid": "st-mce"
                            }
                        ]
                    },
                    {
                        "title": "Perseverance",
                        "refs": "grp",
                        "questions": [
                            {
                                "header": "Student Perseverance",
                                "text": "Which problem(s), if any, will require students to persevere?",
                                "format": "",
                                "type": "textarea",
                                "cai": "3B",
                                "sid": "pers-mce"
                            },
                            {
                                "header": "",
                                "text": "How will I encourage students to persist with this problem even in the face of difficulty?",
                                "format": "",
                                "type": "textarea",
                                "sid": "pers2-mce"
                            }
                        ]
                    },
                    {
                        "title": "Justifications",
                        "refs": "grp",
                        "questions": [
                            {
                                "header": "Justifications",
                                "text": "Which problem(s) will require students to explain and justify their work?",
                                "format": "",
                                "type": "textarea",
                                "cai": "3C",
                                "sid": "just-mce"
                            }
                        ]
                    },
                    {
                        "title": "Solution Methods",
                        "refs": "grp",
                        "sid": "sm",
                        "questions": [
                            {
                                "header": "Solution Methods",
                                "text": "What solution methods or representations do I anticipate seeing from students?",
                                "format": "",
                                "type": "textarea",
                                "cai": "2B",
                                "sid": "solmeth-mce"
                            },
                            {
                                "header": "",
                                "text": "How will I connnect these solution methods or representations to each other to strengthen all students' understanding?",
                                "format": "",
                                "type": "textarea",
                                "sid": "solmeth2-mce"
                            }
                        ]
                    },
                    {
                        "title": "Tools",
                        "refs": "grp",
                        "questions": function(sm, utils) { return (utils.getCurrentView(true)=='compile-lesson') ?
                            [{
                                "header": "Tools",
                                "text": "See Beyond the Lesson Guide",
                                "format": "",
                                "type": "",
                                "cai": "",
                                "sid": ""
                            }]:[{
                                "header": "Tools",
                                "text": "Select the tools that may be useful as students solve the problems posed in this lesson.",
                                "format": "",
                                "type": "check",
                                "sid": "tools-check",
                                "cai": "3F",
                                "labels": ["Colored pencils", "Technology", "Number line", "Drawings", "Graph Paper", "Representaions", "Ruler", "Tables", "Manipulatives", "Calculator", "Coordinate plane", "Other", "Spreadsheet"],
                            },
                            {
                                "header": "",
                                "text": "How will I encourage them to independently choose appropriate tools?",
                                "format": "",
                                "type": "textarea",
                                "cai": "3F",
                                "sid": "tool1-mce"
                            }
                        ]}
                    },
                    {
                        "title": "Addressing Rigor",
                        "sid": "as",
                        "refs": "rigor,grp",
                        "questions": [
                            {
                                "header": "Addressing Rigor",
                                "text": "Describe how the problems in this lesson address the aspect(s) of rigor called for by the standard(s) being addressed?",
                                "format": "",
                                "type": "textarea",
                                "cai": "1C",
                                "sid": "addrigor-mce"
                            }
                        ]
                    }
                ]
            },
            {
                "title": "Formative Assessment Strategies",
                "Sections": [
                    {
                        "title": "Checks for Understanding",
                        "refs": "cfu",
                        "questions": [
                            {
                                "header": "Checks For Understanding",
                                "text": "How will I use the information gained from these checks for understanding?",
                                "format": "",
                                "type": "textarea",
                                "cai": "2C",
                                "sid": "cu2-mce"
                            },
                            {
                                "header": "",
                                "text": "In what ways may I need to adapt the lesson as a result of this data?",
                                "format": "",
                                "type": "textarea",
                                "sid": "cu22-mce"
                            }
                        ]
                    },
                    {
                        "title": "Feedback & Revision",
                        "sid": "fr",
                        "refs": "cfu",
                        "questions": function(sm, utils) { return (utils.getCurrentView(true)=='compile-lesson') ?
                            [{
                                "header": "Feedback & Revision",
                                "text": "See Beyond the Lesson Guide",
                                "format": "",
                                "type": "",
                                "cai": "",
                                "sid": ""
                            }]:[{
                                "header": "Feedback & Revision",
                                "text": "How will I provide feedback to students?",
                                "format": "",
                                "type": "textarea",
                                "cai": "3G",
                                "sid": "fr1-mce"
                            },
                            {
                                "header": "",
                                "text": "Will there be an opportunity in this lesson for students to revise their work? If so, when?",
                                "format": "",
                                "type": "textarea",
                                "cai": "3G",
                                "sid": "fr2-mce"
                            }
                        ]}
                    }
                ]
            },
            {
                "title": "Classroom Discussion",
                "Sections": [
                    {
                        "title": "Structuring Discussions",
                        "sid": "scd",
                        "refs": "dq",
                        "questions": [
                            {
                                "header": "Structuring Discussions",
                                "text": "What ideas/concepts from the selected standard(s) will I focus on during discussions?",
                                "format": "",
                                "type": "textarea",
                                "cai": "2A,2C",
                                "sid": "scd1-mce"
                            },
                            {
                                "header": "",
                                "text": "What criteria will I use to determine which students will be chosen to share their mathematical work? How will I sequence this sharing of student representations and/or solution methods to connect and strengthen all students’ understanding of the content?",
                                "format": "",
                                "type": "textarea",
                                "sid": "scd2-mce"
                            }
                        ]
                    },
                    {
                        "title": "Student-driven Discussions",
                        "sid": "sd",
                        "refs": "dq",
                        "questions": [
                            {
                                "header": "Student-driven Discussions",
                                "text": "How will I encourage students to engage in mathematical discourse? How can I facilitate student discussions that prompt students to critique the reasoning of others, justify solutions, ask questions, and learn from other students’ thinking?",
                                "format": "",
                                "type": "textarea",
                                "cai": "3C,3D",
                                "sid": "sd1-mce"
                            }
                        ]
                    },
                    {
                        "title": "Lesson Summary",
                        "sid": "ls",
                        "refs": "dq",
                        "questions": [
                            {
                                "header": "Lesson Summary",
                                "text": "What will the summary of the lesson look or sound like?",
                                "format": "",
                                "type": "textarea",
                                "cai": "2D",
                                "sid": "ls1-mce"
                            },
                            {
                                "header": "",
                                "text": "What student work and discussion will I highlight to reinforce the mathematical learning goal(s) of the lesson?",
                                "format": "",
                                "type": "textarea",
                                "cai": "2E",
                                "sid": "ls2-mce"
                            }
                        ]
                    }
                ]
            }
        ]
    }
};
