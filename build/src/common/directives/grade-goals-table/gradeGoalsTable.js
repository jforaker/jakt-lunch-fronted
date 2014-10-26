angular.module('ai.common.directives.gradeGoalsTable', [])

/*
    MUST PASS IN ARRAY TO "list" attribute from your controller
    for ex:
        terms.gradeGoalsList = [{
             "course": "",
             "term": "",
             "grade_goal": "",
             "grade_current": "",
             "grade_goal_percentage": "",
             "grade_goal_letter": "",
             "grade_current_percentage": "",
             "grade_current_letter": ""
        }];

        <grade-goals-table list="terms.gradeGoalsList" ng-model="terms.gradeGoalsList"></grade-goals-table>
*/

    .directive('gradeGoalsTable', function(ngTableParams, $filter) {
        return {
            restrict: 'EA',
            require: 'ngModel',
            scope: {
                ngModel: '=',
                list: '='
            },
            link: function(scope, elem, attrs, ngModel) {

                scope.columns = [];
                scope.rows = [];

//                angular.forEach(scope.list, function (item) {
//                    scope.rows.push(item);
//                    scope.columns.push(item);
//                    scope.columns.push({
//                        "term": item.term + ' desired'
//                    });
//                });

                console.log('scope.columns ', scope.columns);
                console.log('scope.rows ', scope.rows);

                scope.gradeGoalsList = scope.list;
                scope.tableParams = new ngTableParams({
                    page: 1,
                    count: scope.gradeGoalsList.length
                },{
                    counts: [],
                    getData: function($defer, params) {
                        var orderedData = params.sorting()?$filter('orderBy')(scope.gradeGoalsList, params.orderBy()):scope.gradeGoalsList;
                        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    }
                });

                scope.editId = -1;
                scope.setEditId =  function(pid) {
                    scope.editId = pid;
                };

                scope.addClazzRow = function (id) {
                    scope.rows.push({
                        "course": "",
                        "term": "",
                        "grade_goal": "",
                        "grade_current": "",
                        "grade_goal_percentage": "",
                        "grade_goal_letter": "",
                        "grade_current_percentage": "",
                        "grade_current_letter": ""
                    });
                };

                scope.removeClazzRow =  function(index) {
                    scope.rows.splice(index, 1);
                };

                scope.myData = [];
                scope.obje = {};
                scope.myColumns = [];

                angular.forEach(scope.list, function (item, ind) {
                    var obj = {};
                    obj['f' + (ind)] = item.term;
                    //scope.myData.push(obj);

                    scope.obje[ind] = item.term;

                    console.log('scope.obj ', scope.obje);


                    scope.columns.push(item);
                    scope.columns.push({
                        "term": item.term + ' desired'
                    });
                });
                
                scope.myData.push(scope.obje);


                scope.mydata = [
                    {
                        1: "Quarter 1 actual",
                        2: "Quarter 1 desired",
                        3: "quarter 2 actial",
                        4: "wuarter 2 desired"
                    }
                ];
                console.log('scope.myData ', scope.myData);

                scope.mycolumns = [{
                    name: "Quarter 1",
                    fieldname: "1",
                    type: "input"
                }, {
                    name: "Quarter 1 desired",
                    fieldname: "2",
                    type: "textarea"
                },{
                    name: "Quarter 2",
                    fieldname: "3",
                    type: "input"
                },{
                    name: "Quarter 2 desired",
                    fieldname: "4",
                    type: "textarea"
                }];

            },
            templateUrl: 'directives/grade-goals-table/grade-goals-table.tpl.html'
        };
    })

    .directive("mycontrol", function ($compile) {
        return {
            restrict: "E",
            template: "<input ng-model='myCell'>",
            scope: {
                myCell: '='
            }
        };
    })

;