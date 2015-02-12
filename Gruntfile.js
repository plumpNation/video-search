module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        jshint: {
            files: ['Gruntfile.js', 'app/**/*.js'],
            options: {
                globals: {
                    jQuery: true,
                    module: true
                }
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['jshint']);
};
