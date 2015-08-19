'use strict';



/**
 * Module dependencies.
 */
var _               = require('lodash');
var defaultAssets   = require('./config/assets/default');
var gulp            = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var runSequence     = require('run-sequence');
var plugins         = gulpLoadPlugins();

// Set NODE_ENV to 'test'
gulp.task('env:test', function () {
    process.env.NODE_ENV = 'test';
});

// Set NODE_ENV to 'development'
gulp.task('env:dev', function () {
    process.env.NODE_ENV = 'development';
});

// Set NODE_ENV to 'production'
gulp.task('env:prod', function () {
    process.env.NODE_ENV = 'production';
});


// Nodemon task
gulp.task('nodemon', function () {
    return plugins.nodemon({
        script: 'server.js',
        nodeArgs: ['--debug'],
        ext: 'js,html',
        watch: _.union(defaultAssets.server.views, defaultAssets.server.allJS, defaultAssets.server.config)
    });
});


// Watch Files For Changes
gulp.task('watch', function() {
    // Start livereload
    plugins.livereload.listen();

    // Add watch rules
    gulp.watch(defaultAssets.server.views, ['concact-html', 'jshint', 'buildLib', 'buildJs', 'uglify']).on('change', plugins.livereload.changed);
    gulp.watch(defaultAssets.server.allJS, ['jshint']).on('change', plugins.livereload.changed);
    gulp.watch(defaultAssets.client.views, ['concact-html', 'jshint', 'buildLib', 'buildJs', 'uglify']).on('change', plugins.livereload.changed);
    gulp.watch(defaultAssets.client.js, ['concact-html', 'jshint', 'buildLib', 'buildJs', 'uglify']).on('change', plugins.livereload.changed);
    gulp.watch(defaultAssets.client.less, ['less']).on('change', plugins.livereload.changed);
});

gulp.task('concact-html', function() {
    return gulp.src(defaultAssets.client.views)
        .pipe(plugins.html2js({
        outputModuleName: 'templates-main',
        useStrict: true
    }))
    .pipe(plugins.concat('template.js'))
    .pipe(gulp.dest('./.dist'));
});

// JS linting task
gulp.task('jshint', function () {
    return gulp.src(_.union(defaultAssets.server.allJS, defaultAssets.client.js ))
        .pipe(plugins.plumber())
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('default'))
        .pipe(plugins.jshint.reporter('fail'));
});


// JS minifying task
gulp.task('buildLib', function () {
    return gulp.src(defaultAssets.client.lib.js)
        .pipe(plugins.concat('lib.js'))
        .pipe(gulp.dest('./.dist'));
});


// JS minifying task
gulp.task('buildJs', function () {
    return gulp.src(defaultAssets.client.js)
        .pipe(plugins.ngAnnotate())
        .pipe(plugins.concat('application.js'))
        .pipe(gulp.dest('./.dist'));
});


// JS minifying task
gulp.task('uglify', function () {

    if( process.env.NODE_ENV === 'production' ){
        return gulp.src([
                './.dist/lib.js',
                './modules/core/client/app/config.js',
                './modules/core/client/app/init.js',
                './.dist/application.js',
                './.dist/template.js'
            ])
            .pipe(plugins.ngAnnotate())
            .pipe(plugins.uglify({
                mangle: false
            }))
            .pipe(plugins.concat('app.min.js'))
            .pipe(gulp.dest('public/js'));
    }else{
        return gulp.src([
                './.dist/lib.js',
                './modules/core/client/app/config.js',
                './modules/core/client/app/init.js',
                './.dist/application.js',
                './.dist/template.js'
            ])
            .pipe(plugins.ngAnnotate())
            .pipe(plugins.concat('app.js'))
            .pipe(gulp.dest('public/js'));
    }
});

// CSS minifying task
gulp.task('cssmin', function () {
    return gulp.src('./modules/core/client/less/app.less')
        .pipe(plugins.plumber())
        .pipe(plugins.less())
        .pipe(plugins.cssmin())
        .pipe(plugins.rename('app.min.css'))
        .pipe(gulp.dest('./public/dist'));
});

// Less task
gulp.task('less', function () {
    return gulp.src('./modules/core/client/less/app.less')
        .pipe(plugins.plumber())
        .pipe(plugins.less())
        .pipe(plugins.rename('app.css'))
        .pipe(gulp.dest('./public/dist'));
});

// Karma test runner task
gulp.task('karma', function (done) {
    return gulp.src([])
        .pipe(plugins.karma({
            configFile: 'karma.conf.js',
            action: 'run',
            singleRun: true
        }));
});





// Lint CSS and JavaScript files.
gulp.task('lint', function(done) {
    runSequence('less', [ 'jshint'], done);
});

// Lint project files and minify them into two production files.
gulp.task('build', function(done) {
    runSequence('env:dev' ,'lint', ['uglify', 'cssmin'], done);
});

// Run the project in debug mode
gulp.task('debug', function(done) {
    runSequence('env:dev', 'lint', ['nodemon', 'watch'], done);
});

// Run the project in production mode
gulp.task('prod', function(done) {
    runSequence('build', 'lint', ['nodemon', 'watch'], done);
});

// Run the project in development mode
gulp.task('default', function(done) {
    runSequence('env:dev', 'concact-html', 'jshint', 'buildLib', 'buildJs', 'uglify', 'lint', ['nodemon', 'watch'], done);
});