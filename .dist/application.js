'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');
ApplicationConfiguration.registerModule('templates-main');
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('footer');
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('phonebook');
'use strict';

angular.module('core').controller('CoreCtrl', [
    '$scope',
    function( $scope ) {
        console.log('test');
    }
]);
'use strict';

angular.module('footer').controller('footerCtrl', [
    '$scope',
    function( $scope ) {
        console.log('footer is working');
    }
]);
'use strict';

angular.module('footer')
    .directive('footer', [
        function( ) {
            return {

                restrict: 'A',

                controller  : 'footerCtrl',

                templateUrl: 'modules/footer/client/views/footer.client.view.html'

            };
        }
    ]
);
'use strict';


angular.module('footer')
    .factory('footerService', [
        function () {

            return {

                testfooter: function () {
                    return 'footer';
                }


            };
        }
    ]);
'use strict';

angular.module('phonebook').controller('phonebookCtrl', [
    '$scope',
    function( $scope ) {
        console.log('phonebook is working');
    }
]);
'use strict';

angular.module('phonebook')
    .directive('phonebook', [
        function( ) {
            return {

                controller  : 'phonebookCtrl',

                templateUrl: 'modules/phonebook/client/views/phonebook.client.view.html'

            };
        }
    ]
);
'use strict';


angular.module('phonebook')
    .factory('phonebookService', [
        function () {

            return {

                testphonebook: function () {
                    return 'phonebook';
                }


            };
        }
    ]);