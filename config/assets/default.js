'use strict';

module.exports = {
    client: {
        lib: {
            css: [],
            js: [
                'node_modules/react/dist/react.min.js',
                'node_modules/react-dom/dist/react-dom.min.js'
            ],
            tests: []
        },
        css: [
            'modules/*/client/css/*.css'
        ],
        less: [
            'modules/*/client/less/*.less'
        ],
        js: [
            'modules/*/client/*.js',
            'modules/*/client/!(app)/*.js'
        ],
        views: ['modules/*/client/views/**/*.html']
    },
    server: {
        allJS: ['gulpfile.js', 'server.js', 'config/**/*.js', 'modules/*/server/**/*.js'],
        models: 'modules/*/server/models/**/*.js',
        routes: ['modules/!(core)/server/routes/**/*.js', 'modules/core/server/routes/**/*.js'],
        config: 'modules/*/server/config/*.js',
        policies: 'modules/*/server/policies/*.js',
        views: 'modules/*/server/views/*.html'
    }
};
