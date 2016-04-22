'use strict';

module.exports = {
    app: {
        title: 'Boila',
        description: 'Full-Stack JavaScript with ReactJs, Express, and Node.js'
    },
    port: process.env.PORT || 3000,
    templateEngine: 'handlebars',
    sessionSecret: 'ExpressBoilerplate',
    sessionCollection: 'sessions'
};
