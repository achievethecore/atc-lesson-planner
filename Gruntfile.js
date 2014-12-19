module.exports = function(grunt)
{
  grunt.initConfig(
  {
    pkg: grunt.file.readJSON('package.json'),

    compass: {
      dev: {
        options: {
          sassDir: 'assets/sass',
          cssDir: 'assets/css',
          environment: 'dev'
        }
      }
    },
    
    jshint: {
      options: { lastsemic: true },
      all: ['Gruntfile.js', 'webpack.config.js',  'assets/js/*.js', 'assets/js/modules/*.js', 'assets/js/views/*.js', 'assets/js/views/ela/*.js', 'assets/js/views/math/*.js']
    },
    
    webpack: {
    	someName: require('./webpack.config.js')
    },

    watch: {
      sass: {
        files: ['assets/sass/*.scss'],
        tasks: ['compass:dev']
      },

      js: {
        files: '<%= jshint.all %>',
        tasks: ['jshint:all', 'webpack']
      }
    }

  });
 
  
   
   grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  //grunt.loadNpmTasks('grunt-contrib-requirejs');
  
 
  grunt.registerTask('default', 'watch');
};