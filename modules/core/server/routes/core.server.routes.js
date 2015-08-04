'use strict';

module.exports = function(app) {
    // Root routing
    var core = require('../controllers/core.server.controller');

    console.log('------------------------\n\n\n\n test\n\n\n\n------------------------');

    // Define application route
    app.route('/').get( core.renderTestPage );
};
