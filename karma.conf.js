module.exports = function(config) {
    config.set({

        basePath: '',
        frameworks: ['browserify', 'jasmine'],

        files: [
            'node_modules/angular/angular.min.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'resources/js/app.js',
            'resources/js/app/**/*.js',
            'resources/js/test/**/*test.js'
        ],


        exclude: [
        ],

        preprocessors: {
            'Module.js': ['browserify'],
            'resources/js/app/**/*.js': ['browserify'],
            'resources/js/test/**/*test.js': ['browserify']
        },

        browserify: {
            debug: true,
            transform: ['babelify', 'stringify']
        },

        reporters: ['progress'],

        port: 9876,

        colors: true,

        logLevel: config.LOG_DEBUG,

        autoWatch: true,

        browsers: ['Chrome'],

        singleRun: false
    });
};