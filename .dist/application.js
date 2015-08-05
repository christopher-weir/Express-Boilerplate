'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');
ApplicationConfiguration.registerModule('templates-main');
'use strict';

angular.module('core').controller('CoreCtrl', [
    '$scope',
    function( $scope ) {
        console.log('test');
    }
]);