module.exports = function(grunt) {
	//require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
	require('load-grunt-tasks')(grunt, {
		scope : 'devDependencies'
	});
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		banner: '/*!\n' +
            ' * Bootstrap v<%= pkg.version %>\n' +
            ' * Pattern Library\n' +
            ' */\n',
		conf : {
			path : '.',
			bootstrap_folder : '<%= conf.path %>/bootstrap',

			/*project-1 config*/
			P1_folder : '<%= conf.path %>/project-1',
			P1_scss_folder : '<%= conf.P1_folder %>/scss',
			P1_css_folder : '<%= conf.P1_folder %>/dist/css',
			P1_js_folder : '<%= conf.P1_folder %>/js',
			P1_djs_folder : '<%= conf.P1_folder %>/dist/js',
			P1_doc_folder : '<%= conf.P1_folder %>/docs',
			P1_scss : '<%= conf.P1_scss_folder %>/p1.scss',
			P1_css : '<%= conf.P1_css_folder %>/p1.css',
			P1_port : '1111',
			
			/*project-2 config*/
			P2_folder : '<%= conf.path %>/project-2',
			P2_scss_folder : '<%= conf.P2_folder %>/scss',
			P2_css_folder : '<%= conf.P2_folder %>/dist/css',
			P2_doc_folder : '<%= conf.P2_folder %>/docs',
			P2_scss : '<%= conf.P2_scss_folder %>/p2.scss',
			P2_css : '<%= conf.P2_css_folder %>/p2.css',
			P2_port : '2222',
			
			/*project-3 config*/
			P3_folder : '<%= conf.path %>/project-3',
			P3_scss_folder : '<%= conf.P3_folder %>/scss',
			P3_css_folder : '<%= conf.P3_folder %>/dist/css',
			P3_doc_folder : '<%= conf.P3_folder %>/docs',
			P3_scss : '<%= conf.P3_scss_folder %>/p3.scss',
			P3_css : '<%= conf.P3_css_folder %>/p3.css',
			P3_port : '3333'

			
		},

		/*Validate html files with htmlhint.*/
		htmllint : {
			lintP1 : {
				options : {},
				src : ['<%= conf.P1_doc_folder %>/**/*.html']
			}
		},

		/*Validate js files with htmlhint.*/
		jshint : {
			options : {},
			hintP1 : ['<%= conf.P1_js_folder %>/**/*.js']
		},

		/*Compile less files to css files*/
		less : {
			compileP1 : {
				src : '',
				dest : ''
			}
		},
		
		/*Compile scss files to css files*/
		sass: {
			compileP1: {		 
			        src: '<%= conf.P1_scss %>',
			        dest: '<%= conf.P1_css %>'		   
		   },
		    compileP2: {		 
			        src: '<%= conf.P2_scss %>',
			        dest: '<%= conf.P2_css %>'		   
		    },
		     compileP3: {		 
			        src: '<%= conf.P3_scss %>',
			        dest: '<%= conf.P3_css %>'		   
		    }
		},

		/*CSSmin css files*/
		cssmin : {
			minifyP1 : {
				src : '',
				dest : ''
			}
		},
		
		/*contact js files*/
		concat : {
			options : {
				banner : '<%= banner %>\n',
				stripBanners : false
			},
			concatP1 : {
				src : [				
				'<%= conf.bootstrap_folder %>/js/transition.js', 
				'<%= conf.bootstrap_folder %>/js/alert.js', 
				'<%= conf.bootstrap_folder %>/js/button.js', 
				'<%= conf.bootstrap_folder %>/js/carousel.js', 
				'<%= conf.bootstrap_folder %>/js/collapse.js', 
				'<%= conf.bootstrap_folder %>/js/dropdown.js', 
				'<%= conf.bootstrap_folder %>/js/modal.js', 
				'<%= conf.bootstrap_folder %>/js/tooltip.js', 
				'<%= conf.bootstrap_folder %>/js/popover.js', 
				'<%= conf.bootstrap_folder %>/js/scrollspy.js', 
				'<%= conf.bootstrap_folder %>/js/tab.js', 
				'<%= conf.bootstrap_folder %>/js/affix.js',
				
				'<%= conf.P1_js_folder %>/multi-item-carousel.js',
				'<%= conf.P1_js_folder %>/p1-customize.js'

				],
				dest : '<%= conf.P1_djs_folder %>/p1.js' 
			}
		},
		
		/*Compile js files and compress.*/
		uglify: {
			options: {
				preserveComments: 'some'
			},
			uglifyP1: {
				src: '<%= concat.concatP1.dest %>',
				dest: '<%= conf.P1_djs_folder %>/p1.min.js'
			}
	  },

		/*Copy files*/
		copy : {
			distP1 : {
				expand : true,
				cwd : '<%= conf.P1_folder %>/dist/',
				src : ['**/*'],
				dest : '<%= conf.P1_folder %>/docs/dist/'
			},
			distP2 : {
				expand : true,
				cwd : '<%= conf.P2_folder %>/dist/',
				src : ['**/*'],
				dest : '<%= conf.P2_folder %>/docs/dist/'
			},
			distP3 : {
				expand : true,
				cwd : '<%= conf.P3_folder %>/dist/',
				src : ['**/*'],
				dest : '<%= conf.P3_folder %>/docs/dist/'
			}
		},

		/*Jekyll*/
		jekyll : {
			buildP1 : {
				options : {
					config : '<%= conf.P1_folder %>/_config.yml',
					serve : false
				}
			},
			serveP1 : {
				options : {
					config : '<%= conf.P1_folder %>/_config.yml',
					port : '<%= conf.P1_port %>',
					serve : true
				}
			},
			buildP2 : {
				options : {
					config : '<%= conf.P2_folder %>/_config.yml',
					serve : false
				}
			},
			serveP2 : {
				options : {
					config : '<%= conf.P2_folder %>/_config.yml',
					port : '<%= conf.P2_port %>',
					serve : true
				}
			},
			buildP3 : {
				options : {
					config : '<%= conf.P3_folder %>/_config.yml',
					serve : false
				}
			},
			serveP3 : {
				options : {
					config : '<%= conf.P3_folder %>/_config.yml',
					port : '<%= conf.P3_port %>',
					serve : true
				}
			}
		},

		/*zip files*/
		compress : {
			zipP1_dist : {
				options : {
					archive : 'P1-dist.zip',
					mode : 'zip',
					level : 9,
					pretty : true
				},
				files : [{
					expand : true,
					cwd : '<%= conf.P1_folder %>/_gh_pages/dist/',
					src : ['**'],
					dest : 'P1-dist'
				}]
			}
		},

		/*Watch event for files, including add, change, delete*/
		watch : {
			scssP1 : {
				files : ['<%= conf.P1_scss_folder %>/**/*.scss'],
				tasks : ['sass:compileP1', 'copy:distP1', 'jekyll:buildP1']
			},
			jsP1 : {
				files : ['<%= conf.P1_js_folder %>/**/*.js','<%= conf.P1_doc_folder %>/dist/js/**/*.js'],
				tasks : ['concat:concatP1','uglify:uglifyP1', 'copy:distP1', 'jekyll:buildP1']
			},
			htmlP1 : {
				files : ['<%= conf.P1_doc_folder %>/**/*.html','<%= conf.P1_doc_folder %>/dist/js/**/*.html'],
				tasks : ['htmllint:lintP1','jekyll:buildP1'] 
			},
			scssP2 : {
				files : ['<%= conf.P2_scss_folder %>/**/*.scss'],
				tasks : ['sass:compileP2', 'copy:distP2', 'jekyll:buildP2']
			},
			jsP2 : {
				files : ['<%= conf.P2_doc_folder %>/dist/js/**/*.js'],
				tasks : ['jekyll:buildP2']
			},
			htmlP2 : {
				files : ['<%= conf.P2_doc_folder %>/**/*.html','<%= conf.P2_doc_folder %>/dist/js/**/*.html'],
				tasks : ['jekyll:buildP2'] 
			},
			scssP3 : {
				files : ['<%= conf.P3_scss_folder %>/**/*.scss'],
				tasks : ['sass:compileP3', 'copy:distP3', 'jekyll:buildP3']
			},
			jsP3 : {
				files : ['<%= conf.P3_doc_folder %>/dist/js/**/*.js'],
				tasks : ['jekyll:buildP3']
			},
			htmlP3 : {
				files : ['<%= conf.P3_doc_folder %>/**/*.html','<%= conf.P3_doc_folder %>/dist/js/**/*.html'],
				tasks : ['jekyll:buildP3'] 
			}
		}
	});

	/*Register changePort tasks*/
	grunt.registerTask('changeP1Port', function() {
		var port = grunt.option('port') || grunt.config.get('conf.P1_port');
		grunt.config.set('conf.P1_port', port);
	});
	grunt.registerTask('changeP2Port', function() {
		var port = grunt.option('port') || grunt.config.get('conf.P2_port');
		grunt.config.set('conf.P2_port', port);
	});
	grunt.registerTask('changeP3Port', function() {
		var port = grunt.option('port') || grunt.config.get('conf.P3_port');
		grunt.config.set('conf.P3_port', port);
	});

	/*Register jekyll serve tasks*/
	/** If you want to customize your server port when run jekyll.
	 * 	Run command: grunt jekyllP1 --port=[port], like: grunt jekyllP1 --port=6001;
	 * 	If you do not want to customize your server port
	 * 	Run command: grunt jekyllP1, it will use default port.
	 */
	grunt.registerTask('jekyllP1', ['changeP1Port', 'jekyll:serveP1']);
	grunt.registerTask('jekyllP2', ['changeP2Port', 'jekyll:serveP2']);
	grunt.registerTask('jekyllP3', ['changeP3Port', 'jekyll:serveP3']);

	/*Register default tasks*/
	grunt.registerTask('P1', ['sass:compileP1', 'cssmin:minifyP1', 'copy:distP1', 'concat:concatP1', 'uglify:uglifyP1', 'jekyll:buildP1', 'compress:zipP1_dist']);
	
};
