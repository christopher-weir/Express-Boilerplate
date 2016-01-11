'use strict';

/**
 * Render the main applicaion page
 */
exports.renderIndexPage = function( req, res ) {

    res.render('modules/core/server/views/index', {
        user: req.user || null
    });

};
