(function(module) {
try { module = angular.module("templates-main"); }
catch(err) { module = angular.module("templates-main", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("modules/footer/client/views/footer.client.view.html",
    "<h1>footer is working</h1>\n" +
    "\n" +
    "<p>ebd footer</p>");
}]);
})();

(function(module) {
try { module = angular.module("templates-main"); }
catch(err) { module = angular.module("templates-main", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("modules/phonebook/client/views/phonebook.client.view.html",
    "<h1>phonebook is working awefawe faw fa w awef </h1>");
}]);
})();
