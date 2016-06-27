module.exports = function (grunt) {
    require("load-grunt-tasks")(grunt);
    
    grunt.initConfig({
        "babel": {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    "dist/js/app.js": "src/js/app.js"
                }
            }
        }
    });

    grunt.registerTask("default", ["babel"]);

};