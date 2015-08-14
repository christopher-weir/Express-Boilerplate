'use strict';

angular.module('<%= module_name %>')
    .directive('<%= module_name %>', [
        function( ) {
            return {

                controller  : '<%= module_name %>Ctrl',

                templateUrl: 'modules/<%= module_name %>/client/views/<%= module_name %>.client.view.html'

            };
        }
    ]
);