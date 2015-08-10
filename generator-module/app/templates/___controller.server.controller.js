'use strict';
<% if (server_type == 'api') { %>

/**
 * Example api
 */
exports.<%= module_name %>Api = function(req, res) {

    res.send({'data': 'working'});

};

<% } %>
<% if (server_type == 'route') { %>

/**
 * Example page
 */
exports.<%= module_name %>Ctrl = function(req, res) {

    res.render('modules/<%= module_name %>/server/views/<%= module_name %>');

};

<% } %>