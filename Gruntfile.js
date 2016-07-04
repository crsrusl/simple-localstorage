module.exports = function (grunt) {
    require("load-grunt-tasks")(grunt);

    grunt.initConfig({
        babel: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    "dist/app.js": "src/app.js"
                }
            }
        },
        uglify: {
            simpleLocalStorage: {
                options: {
                    sourceMap: true
                },
                files: {
                    'dist/app.min.js': ['dist/app.js']
                }
            }
        },
        watch: {
            scripts: {
                files: ['src/app.js'],
                tasks: ['default'],
                options: {
                    spawn: false,
                }
            }
        }
    });

    grunt.registerTask("default", ["babel", "uglify"]);

};