'use strict';

module.exports = function(app) {

<% if (server_type == 'api' || server_type == 'both') { %>
    var <%= module_name %>Api = require('../controllers/<%= module_name %>-api.server.controller');
<% } %>
<% if (server_type == 'route' || server_type == 'both') { %>
    var <%= module_name %>Route = require('../controllers/<%= module_name %>-route.server.controller');
<% } %>
<% if (server_type == 'api' || server_type == 'both') { %>
    app.route('/api/<%= module_name %>')
        .post( <%= module_name %>.<%= module_name %>Api );
<% } %>
<% if (server_type == 'route' || server_type == 'both') { %>
    app.route('/<%= module_name %>')
        .get( <%= module_name %>.<%= module_name %>Ctrl );
<% } %>

};
