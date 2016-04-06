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
        sass: [
            'app/*/sass/*/*.sass',
            'app/*/sass/*.sass',
            'app/*/sass/*/*.scss',
            'app/*/sass/*.scss'
        ],
        js: [
            'app/*/components/*.js',
            'app/*/components/*/*.js'
        ]
    },
    server: {
        views: [
            'app/*/views/*.html',
            'app/*/views/*/*.html'
        ],
        allJS: [
            'gulpfile.js',
            'server.js',
            'config/**/*.js',
            'app/*/**/*.js'
        ],
        models: ['app/*/models/**/*.js'],
        routes: ['app/!(core)/routes/**/*.js', 'app/core/routes/**/*.js']
    }
};
