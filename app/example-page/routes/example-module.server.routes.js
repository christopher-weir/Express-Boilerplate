'use strict';

module.exports = function(app) {
    // Root routing
    var exampleModule = require('../controllers/example-module.server.controller');

    // Define application route
    app.route('/example')
        .get(
            exampleModule.renderExamplePage
        );
};
