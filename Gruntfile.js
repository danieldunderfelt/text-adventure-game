/**
 * This is Activeark JWT's default Gruntfile, feel free to edit to your
 * own taste, but remember to add it to .gitignore if you do.
 */
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %>\n <%= grunt.template.today("yyyy-mm-dd") %>\n Author:<%= pkg.author %>\n License: <%= pkg.license %>\n*/\n',

    browserify: {
      dist: {
        files: {
          "dist/js/text.js": "js/**/*.js"
        },
        options: {
          transform: ['debowerify']
        }
      }
    },
    sass: {
      dist: {
        files: {
          'css/text.css': ['scss/text.scss'],
        }
      }
    },
    autoprefixer : {
      single_file: {
        src: 'css/text.css',
        dest: 'dist/css/text.css'
      }
    },
    watch: {
      scss: {
        files: 'scss/**/*.scss',
        tasks: ['sass']
      },
      css: {
        files: 'css/*.css',
        tasks: ['autoprefixer'],
        options: {
          livereload: true
        }
      },
      js: {
        files: ['js/**/*.js'],
        tasks : ['browserify']
      },
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['uglify', 'sass', 'cssmin']);
  grunt.registerTask('dev', ['watch']);
};