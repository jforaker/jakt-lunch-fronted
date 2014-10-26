(function(module) {
try { app = angular.module("templates-common"); }
catch(err) { app = angular.module("templates-common", []); }
app.run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/footer.tpl.html",
    "<footer id=\"page-footer\">\n" +
    "	<div class=\"container\">\n" +
    "		<div class=\"row\">\n" +
    "			<ul>\n" +
    "				<li class=\"col-sm-2 col-sm-offset-2\"><a ui-sref=\"terms\">Terms of Use</a></li>\n" +
    "				<li class=\"col-sm-2\"><a ui-sref=\"privacy\">Privacy Policy</a></li>\n" +
    "				<li class=\"col-sm-2\"><a ui-sref=\"faq\">FAQ</a></li>\n" +
    "				<li class=\"col-sm-2\">Alta Ipsum© 2014</li>\n" +
    "			</ul>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</footer>");
}]);
})();

(function(module) {
try { app = angular.module("templates-common"); }
catch(err) { app = angular.module("templates-common", []); }
app.run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/popover-notifications.tpl.html",
    "<div class=\"popover notifications\">\n" +
    "    <div class=\"arrow\"></div>\n" +
    "\n" +
    "    <div>\n" +
    "        <div ng-repeat=\"notification in notifications\">\n" +
    "            <p>{{ notification.title }}</p>\n" +
    "\n" +
    "            <p>\n" +
    "                <span>{{ notification.subject }}</span>\n" +
    "                <span>{{ notification.date }}</span>\n" +
    "            </p>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);
})();
