module.exports = function (grunt) {

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        eslint: {
            target: [
                "javascripts/**/*.js"
            ],
            options: {
                configFile: "eslint.json"
            }
        },

        concat: {
            js: {
                options: {
                    separator:';'
                },
                src: [
                    // Non-CDN libs
                    "wp-content/themes/camp5/libs/p.js",

                    // Global
                    "wp-content/themes/camp5/js/camp5/global.js",

                    // Common

                    // Services

                    // Models

                    // Controllers
                    "wp-content/themes/camp5/js/camp5/controllers/base.js",
                    "wp-content/themes/camp5/js/camp5/controllers/index.js"

                    // Templates
                ],
                dest: 'wp-content/themes/camp5/js/camp5.js'
            },
            css: {
                src: [
                    // Theme header
                    'wp-content/themes/camp5/theme-header.css',

                    // Libs

                    // Rest
                    'wp-content/themes/camp5/style.css'
                ],
                dest: 'wp-content/themes/camp5/style.css'
            }
        },

        sass: {
            build: {
                files: {
                    'wp-content/themes/camp5/style.css': 'wp-content/themes/camp5/sass/style.scss'
                }
            }
        },

        watch: {
            js: {
                files: ['<%= concat.js.src %>'],
                tasks: ['buildjs']
            },

            css: {
                files: ['wp-content/themes/camp5/sass/**/*.scss'],
                tasks: ['buildcss']
            }
        }
    });

    grunt.registerTask('default', ['buildjs', 'buildcss']);
    grunt.registerTask('buildjs',  ['eslint', 'concat:js']);
    grunt.registerTask('buildcss',  ['sass', 'concat:css']);
};
