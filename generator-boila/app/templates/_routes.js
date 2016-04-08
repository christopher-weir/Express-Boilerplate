'use strict';

module.exports = function(app) {

    // Root routing
    var <%= module_name_js %> = require('../controllers/<%= module_name_folder %>.server.controller');

    // Define application route
    app.route('/<%= module_name_folder %>')
        .get(
            <%= module_name_js %>.<%= module_name_js %>
        );
};
