'use strict';

/**
 * Module dependencies.
 */
var config          = require('../config');
var express         = require('express');
var morgan          = require('morgan');
var bodyParser      = require('body-parser');
var multer          = require('multer');
var favicon         = require('serve-favicon');
var compress        = require('compression');
var methodOverride  = require('method-override');
var cookieParser    = require('cookie-parser');
var helmet          = require('helmet');
var consolidate     = require('consolidate');
var path            = require('path');
var fs              = require('fs');
var handlebars      = require('handlebars');
var layouts         = require('handlebars-layouts');

/**
 * Initialize local variables
 */
module.exports.initLocalVariables = function (app) {
    // Setting application local variables
    app.locals.title        = config.app.title;
    app.locals.description  = config.app.description;
    app.locals.jsFiles      = config.files.client.js;
    app.locals.cssFiles     = config.files.client.css;

    if( process.env.NODE_ENV === 'production' ){
        app.locals.node_production = true;
    }else{
        app.locals.node_production = false;
    }

    // Passing the request url to environment locals
    app.use(function (req, res, next) {
        res.locals.host = req.protocol + '://' + req.hostname;
        res.locals.url = req.protocol + '://' + req.headers.host + req.originalUrl;
        next();
    });
};

/**
 * Initialize application middleware
 */
module.exports.initMiddleware = function (app) {
    // Showing stack errors
    app.set('showStackError', true);

    // Enable jsonp
    app.enable('jsonp callback');

    // Should be placed before express.static
    app.use(compress({
        filter: function (req, res) {
            return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
        },
        level: 9
    }));

    // Initialize favicon middleware
    app.use(favicon('./modules/core/client/img/brand/favicon.ico'));

    // Environment dependent middleware
    if (process.env.NODE_ENV === 'development') {
        // Enable logger (morgan)
        app.use(morgan('dev'));

        // Disable views cache
        app.set('view cache', false);
    } else if (process.env.NODE_ENV === 'production') {
        app.locals.cache = 'memory';
    }

    // Request body parsing middleware should be above methodOverride
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());

    // Add the cookie parser and flash middleware
    app.use(cookieParser());
    //app.use(flash());

    // Add multipart handling middleware
    // app.use(multer({
    //     dest: './uploads/',
    //     inMemory: true
    // }));
};

/**
 * Configure view engine
 */
module.exports.initViewEngine = function (app) {


    handlebars.registerHelper(layouts(handlebars));
    handlebars.registerPartial('layout', fs.readFileSync('modules/core/server/views/layout.server.view.html', 'utf8'));
    handlebars.registerPartial('navbar', fs.readFileSync('modules/core/server/views/navbar.server.view.html', 'utf8'));

    handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {

        switch (operator) {
            case '===':
                return (v1 === v2) ? options.fn(this) : options.inverse(this);
            case '<':
                return (v1 < v2) ? options.fn(this) : options.inverse(this);
            case '<=':
                return (v1 <= v2) ? options.fn(this) : options.inverse(this);
            case '>':
                return (v1 > v2) ? options.fn(this) : options.inverse(this);
            case '>=':
                return (v1 >= v2) ? options.fn(this) : options.inverse(this);
            case '&&':
                return (v1 && v2) ? options.fn(this) : options.inverse(this);
            case '||':
                return (v1 || v2) ? options.fn(this) : options.inverse(this);
            default:
                return options.inverse(this);
        }
    });


    app.engine('server.view.html', consolidate[config.templateEngine]);

    // Set views path and view engine
    app.set('view engine', 'server.view.html');
    app.set('views', './');
};

/**
 * Invoke modules server configuration
 */
module.exports.initModulesConfiguration = function (app, db) {
    config.files.server.configs.forEach(function (configPath) {
        require(path.resolve(configPath))(app, db);
    });
};

/**
 * Configure Helmet headers configuration
 */
module.exports.initHelmetHeaders = function (app) {
    // Use helmet to secure Express headers
    app.use(helmet.xframe());
    app.use(helmet.xssFilter());
    app.use(helmet.nosniff());
    app.use(helmet.ienoopen());
    app.disable('x-powered-by');
};

/**
 * Configure the modules static routes
 */
module.exports.initModulesClientRoutes = function (app) {
    // Setting the app router and static folder
    app.use('/', express.static(path.resolve('./public')));

    // Globbing static routing TODO FIX
    // config.folders.client.forEach(function (staticPath) {
    //     app.use(staticPath.replace('/client', ''), express.static(path.resolve('./' + staticPath)));
    // });
};

/**
 * Configure the modules ACL policies
 */
module.exports.initModulesServerPolicies = function (app) {
    // Globbing policy files
    config.files.server.policies.forEach(function (policyPath) {
        require(path.resolve(policyPath)).invokeRolesPolicies();
    });
};

/**
 * Configure the modules server routes
 */
module.exports.initModulesServerRoutes = function (app) {
    // Globbing routing files
    config.files.server.routes.forEach(function (routePath) {
        console.log(routePath);
        require(path.resolve(routePath))(app);
    });
};

/**
 * Configure error handling
 */
module.exports.initErrorRoutes = function (app) {
    // Assume 'not found' in the error msgs is a 404. this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.
    app.use(function (err, req, res, next) {
        // If the error object doesn't exists
        if (!err) return next();

        // Log it
        console.error(err.stack);

        // Redirect to error page
        res.redirect('/server-error');
    });

    // Assume 404 since no middleware responded
    app.use(function (req, res) {
        // Redirect to not found page
        res.redirect('/not-found');
    });
};

/**
 * Initialize the Express application
 */
module.exports.init = function () {
    // Initialize express app
    var app = express();

    // Initialize local variables
    this.initLocalVariables(app);

    // Initialize Express middleware
    this.initMiddleware(app);

    // Initialize Express view engine
    this.initViewEngine(app);

    // Initialize Modules configuration
    this.initModulesConfiguration(app);

    // Initialize Helmet security headers
    this.initHelmetHeaders(app);

    // Initialize modules static client routes
    this.initModulesClientRoutes(app);

    // Initialize modules server authorization policies
    this.initModulesServerPolicies(app);

    // Initialize modules server routes
    this.initModulesServerRoutes(app);

    // Initialize error routes
    this.initErrorRoutes(app);

    return app;
};
