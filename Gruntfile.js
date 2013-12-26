/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            version: '<%= pkg.version %>',
            banner:
                '// AngularDevise\n' +
                '// -------------------\n' +
                '// v<%= pkg.version %>\n' +
                '//\n' +
                '// Copyright (c)<%= grunt.template.today("yyyy") %> Justin Ridgewell\n' +
                '// Distributed under MIT license\n' +
                '//\n' +
                '// https://github.com/cloudspace/angular_devise\n' +
                '\n'
        },

        preprocess: {
            build: {
                files: {
                    'lib/devise.js' : 'src/build/devise.js'
                }
            }
        },

        uglify : {
            options: {
                banner: "<%= meta.banner %>"
            },
            core : {
                src : 'lib/devise.js',
                dest : 'lib/devise-min.js',
            }
        },

        jshint: {
            options: {
                jshintrc : '.jshintrc'
            },
            devise : [ 'src/*.js' ],
            test : [ 'test/*.js', 'test/specs/*.js' ],
        },

        plato: {
            devise : {
                src : 'src/*.js',
                dest : 'reports',
                options : {
                    jshint : false
                }
            }
        },

        ngmin: {
            dist: {
                src: 'lib/devise.js',
                dest: 'lib/devise.js'
            }
        },

        karma: {
            options: {
                configFile: 'karma.conf.js',
            },
            unit: {
            },
            continuous: {
                singleRun: false,
                browsers: ['PhantomJS']
            }
        }
    });

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    // Default task.
    grunt.registerTask('lint-test', 'jshint:test');
    grunt.registerTask('test', 'karma:unit');
    grunt.registerTask('travis', ['jshint:devise', 'karma']);
    grunt.registerTask('default', ['jshint:devise', 'test', 'preprocess', 'ngmin', 'uglify']);

};
