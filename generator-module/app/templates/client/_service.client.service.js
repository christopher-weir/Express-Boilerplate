'use strict';


angular.module('<%= module_name %>')
    .factory('<%= module_name %>Service', [
        function () {

            return {

                test<%= module_name %>: function () {
                    return '<%= module_name %>';
                }


            };
        }
    ]);