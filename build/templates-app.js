(function(module) {
try { app = angular.module("templates-app"); }
catch(err) { app = angular.module("templates-app", []); }
app.run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboard/dashboard.tpl.html",
    "<header class=\"header black-bg\">\n" +
    "    <a href class=\"logo\"><b>LUNCH APP</b></a>\n" +
    "\n" +
    "    <div class=\"top-menu\">\n" +
    "        <ul class=\"nav pull-right top-menu\">\n" +
    "            <li><a class=\"logout\" href ng-click=\"handleSignOutBtnClick()\">Logout</a></li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "\n" +
    "    <div style=\"width: 500px\" ng-show=\"!user.signedIn\">\n" +
    "        <ng-include src=\"'user/login.tpl.html'\"></ng-include>\n" +
    "    </div>\n" +
    "\n" +
    "    <div style=\"width: 500px\" ng-show=\"!user.signedIn\">\n" +
    "        <ng-include src=\"'user/signup.tpl.html'\"></ng-include>\n" +
    "    </div>\n" +
    "\n" +
    "</header>\n" +
    "\n" +
    "\n" +
    "<section id=\"dashboard\" ng-show=\"user.signedIn\">\n" +
    "    <div class=\"main-container\">\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "        <br><br><br>\n" +
    "\n" +
    "            <!--<div><pre>{{eventNotifications | json}}</pre></div>-->\n" +
    "\n" +
    "            <div class=\"col-sm-12\">\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"col-md-6\">\n" +
    "                        <h1>RESTAURANTS</h1>\n" +
    "                    </div>\n" +
    "                    <div class=\"col-md-6\">\n" +
    "                        <div style=\"height: 0px;width: 100%\">\n" +
    "                            <a href class=\"icon-add\" ai-popover template=\"dashboard/popover-add.tpl.html\" placement=\"\">\n" +
    "                                <i class=\"fa fa-plus-circle\" style=\"font-size: 35px;\"></i>  <h1 style=\"display: inline-block\">Add new restaurant</h1>\n" +
    "                            </a>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div ng-repeat=\"activity in activities\" ng-animate=\" 'animate' \">[{{activity.timestamp | date:'mediumTime'}}]{{activity.message}}</div>\n" +
    "            <div class=\"col-lg-9 col-md-9 main-chart\">\n" +
    "                <div class=\"row\">\n" +
    "                    <div style=\"width: 200px; margin: 20px\" masonry masonry-options=\"{ transitionDuration: '0.4s', isFitWidth:true }\" item-selector=\".card\" class=\"masonry\" ng-cloak>\n" +
    "\n" +
    "                        <!-- restaurant PANEL -->\n" +
    "                        <div class=\"card mb\" masonry-brick ng-repeat=\"restaurant in restaurants track by $index\" ng-cloak>\n" +
    "                            <div class=\"weather-2 pn\">\n" +
    "                                <div class=\"weather-2-header\">\n" +
    "                                    <div class=\"row\">\n" +
    "                                        <div class=\"col-sm-6 col-xs-6\">\n" +
    "                                            <p>{{restaurant.name}} - count</p>\n" +
    "                                        </div>\n" +
    "                                        <div class=\"col-sm-6 col-xs-6 goright\">\n" +
    "                                            <p class=\"small\">{{date | date:'MMMM d, yyyy'}}</p>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                                <div class=\"row centered\">\n" +
    "                                    <img ng-src=\"http://lorempixel.com/100/100/food/{{$index}}\" class=\"img-circle\" width=\"120\">\n" +
    "                                </div>\n" +
    "                                <div class=\"row data\">\n" +
    "                                    <div class=\"col-sm-6 col-xs-6 goleft\">\n" +
    "                                        <h4><b><i class=\"fa fa-cutlery\"></i>&nbsp;&nbsp;{{ restaurant.type_of_food }}</b></h4>\n" +
    "                                        <h6><i class=\"fa fa fa-ambulance\"></i>&nbsp;&nbsp;Health factor: {{ restaurant.health }}</h6>\n" +
    "                                        <h6><i class=\"fa fa-map-marker\"></i>&nbsp;&nbsp;Proximity: {{ restaurant.proximity_to_office }}</h6>\n" +
    "                                    </div>\n" +
    "                                    <div class=\"col-sm-6 col-xs-6 goright\">\n" +
    "                                        <a href><h5 ng-click=\"upvote(restaurant.id)\"><i class=\"fa fa-thumbs-up fa-2x\"></i></h5></a>\n" +
    "                                        <h6><i class=\"fa fa-dollar\"></i>&nbsp;&nbsp;Value: {{ restaurant.value }}</h6>\n" +
    "                                        <h5><i class=\"fa fa-money\"></i>&nbsp;&nbsp;Cash only? {{ restaurant.cash_only }}</h5>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"col-lg-3 col-md-3 ds\">\n" +
    "                <!-- VOTES -->\n" +
    "                <h3>{{eventNotifications_count}} VOTES</h3>\n" +
    "                <div style=\"max-height: 700px;overflow-y: scroll;\">\n" +
    "                    <div class=\"desc\" ng-repeat=\"notification in eventNotifications | limitTo: 50\">\n" +
    "                        <div class=\"thumb\">\n" +
    "                            <span class=\"badge bg-theme\"><i class=\"fa fa-clock-o\"></i></span>\n" +
    "                        </div>\n" +
    "                        <div class=\"details\">\n" +
    "                            <p ng-show=\"notification.voted_by\"><muted><span am-time-ago=\"notification.time\"></span></muted><br/>\n" +
    "                                <a href>{{notification.voted_by}}</a> voted for {{notification.restaurant.name}}<br/>\n" +
    "                            </p>\n" +
    "                            <p ng-show=\"notification.added_by\"><muted><span am-time-ago=\"notification.time\"></span></muted><br/>\n" +
    "                                <a href>{{notification.added_by}}</a> added {{notification.restaurant.name}}<br/>\n" +
    "                            </p>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <br /><br />\n" +
    "\n" +
    "            <div class=\"col-lg-3 col-md-3 ds\">\n" +
    "                <!-- TEAM ONLINE SECTION -->\n" +
    "                <h3>TEAM JAKT</h3>\n" +
    "                <div class=\"desc\" ng-repeat=\"user in userList track by $index\" ng-cloak>\n" +
    "                    <div class=\"thumb\">\n" +
    "                        <img class=\"img-circle\" ng-src=\"http://fillmurray.com/45/{{($index + 1 * 10) + 30}}\" width=\"45px\" height=\"45px\" align=\"\">\n" +
    "                    </div>\n" +
    "                    <div class=\"details\">\n" +
    "                        <p class=\"name\"><a href=\"#\">{{user.email}}</a></p>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "        </div><! --/row -->\n" +
    "    </div>\n" +
    "</section>\n" +
    "\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("templates-app"); }
catch(err) { app = angular.module("templates-app", []); }
app.run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboard/popover-add.tpl.html",
    "<form class=\"form-login\">\n" +
    "    <h2 class=\"form-login-heading\">Add a new restaurant</h2>\n" +
    "    <div class=\"login-wrap\">\n" +
    "        <input ng-model=\"newRestaurant.name\" type=\"text\" placeholder=\"Some restaurant\" class=\"form-control\" />\n" +
    "        <br />\n" +
    "        <input ng-model=\"newRestaurant.type_of_food\" type=\"text\" placeholder=\"What kind(s) of food?\" class=\"form-control\"/>\n" +
    "        <br />\n" +
    "        <input ng-model=\"newRestaurant.value\" type=\"text\" placeholder=\"what is the value factor (0-10)\" class=\"form-control\"/>\n" +
    "        <br />\n" +
    "        <input ng-model=\"newRestaurant.cash_only\" type=\"text\" placeholder=\"Cash only?  (true or false)\" class=\"form-control\"/>\n" +
    "        <br />\n" +
    "        <input ng-model=\"newRestaurant.health\" type=\"text\" placeholder=\"is it healthy? (0-10)\" class=\"form-control\" />\n" +
    "        <br />\n" +
    "        <input ng-model=\"newRestaurant.proximity_to_office\" type=\"text\" placeholder=\"how close is it to the office? (0-10)\" class=\"form-control\"/>\n" +
    "        <br />\n" +
    "        <!--<input ng-model=\"newRestaurant.logo\" type=\"text\" placeholder=\"logo (screenshot url only please)\" />-->\n" +
    "        <!--<br />-->\n" +
    "        <button type=\"submit\" class=\"btn btn-theme btn-block add-rest\" ng-click=\"submitNewRestaurant(newRestaurant)\"><i class=\"fa fa-plus-circle\"></i> Submit</button>\n" +
    "    </div>\n" +
    "</form>");
}]);
})();

(function(module) {
try { app = angular.module("templates-app"); }
catch(err) { app = angular.module("templates-app", []); }
app.run(["$templateCache", function($templateCache) {
  $templateCache.put("user/login.tpl.html",
    "<h1>Login</h1>\n" +
    "\n" +
    "<form class=\"form-login\" ng-submit=\"submitLogin(loginForm)\">\n" +
    "    <h2 class=\"form-login-heading\">sign in now</h2>\n" +
    "    <div class=\"login-wrap\">\n" +
    "        <input type=\"email\" name=\"email\" ng-model=\"loginForm.email\" required=\"required\" class=\"form-control\"/>\n" +
    "        <br>\n" +
    "        <input type=\"password\" name=\"password\" ng-model=\"loginForm.password\" required=\"required\" class=\"form-control\"/>\n" +
    "        <br />\n" +
    "\n" +
    "        <button type=\"submit\" class=\"btn btn-theme btn-block\" href=\"index.html\" type=\"submit\"><i class=\"fa fa-lock\"></i> SIGN IN</button>\n" +
    "        <hr>\n" +
    "\n" +
    "        <div class=\"registration\">\n" +
    "            Don't have an account yet?<br/>\n" +
    "            <a class=\"\" href=\"#\">\n" +
    "                Create an account\n" +
    "            </a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</form>");
}]);
})();

(function(module) {
try { app = angular.module("templates-app"); }
catch(err) { app = angular.module("templates-app", []); }
app.run(["$templateCache", function($templateCache) {
  $templateCache.put("user/signup.tpl.html",
    "<h1>Sign up</h1>\n" +
    "\n" +
    "<form ng-submit=\"submitRegistration(registrationForm)\" role=\"form\" ng-init=\"registrationForm = {}\">\n" +
    "    <div class=\"form-group\">\n" +
    "        <label>email</label>\n" +
    "        <input type=\"email\" name=\"email\" ng-model=\"registrationForm.email\" required=\"required\" class=\"form-control\"/>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"form-group\">\n" +
    "        <label>password</label>\n" +
    "        <input type=\"password\" name=\"password\" ng-model=\"registrationForm.password\" required=\"required\" class=\"form-control\"/>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"form-group\">\n" +
    "        <label>password confirmation</label>\n" +
    "        <input type=\"password\" name=\"password_confirmation\" ng-model=\"registrationForm.password_confirmation\" required=\"required\" class=\"form-control\"/>\n" +
    "    </div>\n" +
    "\n" +
    "    <button type=\"submit\" class=\"btn btn-primary btn-lg\">Register</button>\n" +
    "</form>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("templates-app"); }
catch(err) { app = angular.module("templates-app", []); }
app.run(["$templateCache", function($templateCache) {
  $templateCache.put("user/user.tpl.html",
    "<h1>User</h1>\n" +
    "<div ui-view=\"main\"></div>\n" +
    "");
}]);
})();
