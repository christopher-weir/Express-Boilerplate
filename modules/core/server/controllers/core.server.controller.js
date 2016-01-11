'use strict';

/**
 * Render the main applicaion page
 */
exports.renderTestPage = function( req, res ) {

    res.render('modules/core/server/views/index', {
        user: req.user || null
    });

};
