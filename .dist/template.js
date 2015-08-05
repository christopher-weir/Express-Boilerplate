(function(module) {
try { module = angular.module("templates-main"); }
catch(err) { module = angular.module("templates-main", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("modules/newtest/client/views/newtest.client.view.html",
    "<h1>newtest is working</h1>");
}]);
})();
