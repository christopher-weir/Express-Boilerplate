'use strict';

module.exports = {
    client: {
        lib: {
            css: [
                'public/lib/bootstrap/dist/css/bootstrap.css',
                'public/lib/bootstrap/dist/css/bootstrap-theme.css'
            ],
            js: [
                'bower_components/jquery-2.1.3.min/index.js',
                'bower_components/cloudinary/js/jquery.cloudinary.js',
                'bower_components/angular/angular.js',
                'modules/core/client/app/cloudinary.config.js',
                'bower_components/ngDialog/js/ngDialog.min.js',
                //'bower_components/angular-resource/angular-resource.js',
                //'public/lib/angular-animate/angular-animate.js',
                //'public/lib/angular-ui-router/release/angular-ui-router.js',
                //'public/lib/angular-ui-utils/ui-utils.js',
                //'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
                'bower_components/ng-file-upload/ng-file-upload-all.min.js',
                'bower_components/angular-sanitize/angular-sanitize.js',
                'modules/core/lib/ui-bootstrap-custom-0.13.0.min.js',
                'modules/core/lib/ui-bootstrap-custom-tpls-0.13.0.min.js'
            ],
            tests: ['public/lib/angular-mocks/angular-mocks.js']
        },
        css: [
            'modules/*/client/css/*.css'
        ],
        lessWatch: [
            'modules/*/client/less/*.less'
        ],
        js: [
            'modules/core/client/app/config.js',
            'modules/core/client/app/init.js',
            'modules/*/client/*.js',
            'modules/*/client/**/*.js'
        ],
        buildJs: [
            'modules/core/client/app/config.js',
            'modules/core/client/app/init.js',
            'modules/*/client/*.js',
            'modules/*/client/**/*.js',
            '.build/template.js'
        ],
        runJs: [
            'public/dist/application.js'
        ],
        views: ['modules/*/client/views/**/*.html']
    },
    server: {
        allJS: ['gruntfile.js', 'server.js', 'config/**/*.js', 'modules/*/server/**/*.js'],
        models: 'modules/*/server/models/**/*.js',
        routes: ['modules/!(core)/server/routes/**/*.js', 'modules/core/server/routes/**/*.js'],
        config: 'modules/*/server/config/*.js',
        policies: 'modules/*/server/policies/*.js',
        views: 'modules/*/server/views/*.html'
    }
};
