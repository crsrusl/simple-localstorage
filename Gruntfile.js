module.exports = function (grunt) {
    require("load-grunt-tasks")(grunt);

    grunt.initConfig({
        "babel": {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    "dist/app.js": "src/app.js"
                }
            }
        }
    });

    grunt.registerTask("default", ["babel"]);

};