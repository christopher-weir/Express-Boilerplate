'use strict';

module.exports = {
    app: {
        title: 'Express Boilerplate',
        description: 'Full-Stack JavaScript with MongoDB, Express, AngularJS, and Node.js'
    },
    port: process.env.PORT || 3000,
    templateEngine: 'handlebars',
    sessionSecret: 'ExpressBoilerplate',
    sessionCollection: 'sessions'
};
