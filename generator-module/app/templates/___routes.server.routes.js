'use strict';

module.exports = function(app) {
    // Root routing
    var <%= module_name %> = require('../controllers/<%= module_name %>.server.controller');

    //console.log('------------------------\n\n\n\n test\n\n\n\n------------------------');

    // Define application route
    app.route('/').get( <%= module_name %>.<%= module_name %>Ctrl );
};
