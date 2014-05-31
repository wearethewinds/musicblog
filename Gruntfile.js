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
        uglify: {
            development: {
                files: {
                    'resources/js/page.min.js': ['resources/js/page.js']
                }
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
            minify: {
                files: ['resources/js/page.js'],
                tasks: ['uglify'],
                options: {
                    nospawn: true
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['watch']);
};