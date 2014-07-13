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
          "dist/js/adventure.js": ["js/**/*.js"]
        },
        options: {
          transform: ['debowerify']
        }
      },
      tests: {
        files: {
          'test/test-webapp.js': 'test/webapp/**/*.js',
          'test/test-game.js': 'test/game/**/*.js',
          'test/test-engine.js': 'test/engine/**/*.js',
        }
      }
    },
    webpack: {
      someName: {
        // webpack options
        entry: "./js/index.js",
        output: {
            path: "dist/js",
            filename: "adventure.js",
        },

        stats: {
            // Configure the console output
            colors: true,
            modules: false,
            reasons: false
        }
      }
    },
    mocha: {
      options: {
        run: true,
        reporter: "Spec",
        log: true,
        logErrors: true
      },

      test_webapp: {
        src: ['test/webapp/test.html']
      },
      test_game: {
        src: ['test/game/test.html']
      },
      test_engine: {
        src: ['test/engine/test.html']
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
      dist: {
        src: 'css/text.css',
        dest: 'dist/css/text.css'
      }
    },
    connect: {
      server: {
        options: {
          port: 9001,
          base: 'dist',
          keepalive: true,
          hostname: '127.0.0.1'
        }
      }
    },
    watch: {
      scss: {
        files: 'scss/**/*.scss',
        tasks: ['sass']
      },
      css: {
        files: 'css/*.css',
        tasks: ['autoprefixer']
      },
      test: {
        files: ['test/**/*.js'],
        tasks: ['browserify:tests', 'mocha'],
        options: {
          livereload: false
        }
      },
      js: {
        files: ['js/**/*.js'],
        tasks : ['browserify:dist']
      },
      gruntfile: {
        files: "Gruntfile.js"
      },
      options: {
        livereload: true
      }

    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('dev', ['watch']);
};