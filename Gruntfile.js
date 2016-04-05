module.exports = function(grunt) {
    grunt.initConfig({
        less: {
            development: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    // target.css file: source.less file
                    "resources/styles/css/styles.css": "resources/styles/less/styles.less"
                }
            }
        },
        browserify: {
            'resources/js/app.js': ['resources/js/app/app.js']
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                port: 9999,
                singleRun: true,
                browsers: ['PhantomJS'],
                logLeve: 'ERROR'
            }
        },
        watch: {
            styles: {
                // Which files to watch (all .less files recursively in the less directory)
                files: ['resources/styles/**/*.less'],
                tasks: ['less'],
                options: {
                    nospawn: true
                }
            },
            browserify: {
                files: ['resources/js/app/**/*.js'],
                tasks: ['browserify'],
                options: {
                    nospawn: true
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-karma');
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('test', ['karma']);
};