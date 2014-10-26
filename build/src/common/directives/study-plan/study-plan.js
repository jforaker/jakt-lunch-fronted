angular.module('ai.common.directives.study-plan', [])

  .directive('aiStudyPlan', function aiStudyPlanDirective() {
      return {
          restrict: 'E',
          controller: 'StudyPlanCtrl',
          controllerAs: 'studyPlan',
          link: function Link(scope, elem, attrs) {

          },
          templateUrl: 'directives/study-plan/study-plan.tpl.html'
      };
  })

  .controller('StudyPlanCtrl', function aiStudyPlanController(notifications) {
    var vm = this;

    vm.addStudyPlan = function() {
      notifications.showSuccess({ message: 'Congrats, your study plan has been added', hide: true });
    };

    console.log('this', this);
  })

  ;