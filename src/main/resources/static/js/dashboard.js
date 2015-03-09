angular.module('dashboard', ['ui.bootstrap', 'ui.router', 'ngCookies', 'angular-svg-round-progress']);
'use strict';

/**
* Route configuration for the dashboard module.
*/
angular.module('dashboard').config(['$stateProvider', '$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  // For unmatched routes
  $urlRouterProvider.otherwise('/');

  // Application routes
  $stateProvider
  .state('index', {
    url: '/',
    templateUrl: 'templates/dashboard.html'
  })
  .state('tables', {
    url: '/tables',
    templateUrl: 'templates/tables.html'
  });
}
]);


angular.module('dashboard')
.controller('progressCtrl', ['$scope', '$timeout', 'roundProgressService', function($scope, $timeout, roundProgressService){

  $scope.current =        27;
  $scope.max =            50;
  $scope.uploadCurrent =  0;
  $scope.stroke =         3;
  $scope.radius =         30;
  $scope.isSemi =         false;
  $scope.rounded =        false;
  $scope.currentColor =   '#45ccce';
  $scope.bgColor =        '#eaeaea';
  $scope.iterations =     50;
  $scope.currentAnimation = 'easeOutCubic';

  var random = function(min, max){
    return Math.round(Math.floor(Math.random()*(max-min+1)+min));
  },
  timeout;

  $scope.increment = function(amount){
    $scope.current+=(amount || 1);
  };

  $scope.decrement = function(amount){
    $scope.current-=(amount || 1);
  };

  $scope.start = function(){
    $scope.stop();
    timeout = $timeout(function(){
      $scope.uploadCurrent+=random(1, 5);

      if($scope.uploadCurrent < 100){
        $scope.start();
      }
    }, random(100, 500));
  };

  $scope.stop = function(){
    $timeout.cancel(timeout);
  };

  $scope.reset = function(){
    $scope.stop();
    $scope.uploadCurrent = 0;
  };

  $scope.animations = [];

  angular.forEach(roundProgressService.animations, function(value, key){
    $scope.animations.push(key);
  });
}]);

/**
* Alerts Controller
*/
angular.module('dashboard')
.controller('AlertsCtrl', ['$scope', AlertsCtrl]);

function AlertsCtrl($scope) {
  /*$scope.alerts = [{
  type: 'success',
  msg: 'Thanks for visiting! Feel free to create pull requests to improve the dashboard!'
}, {
type: 'danger',
msg: 'Found a bug? Create an issue with as many details as you can.'
}];*/

$scope.addAlert = function() {
  $scope.alerts.push({
    msg: 'Another alert!'
  });
};

$scope.closeAlert = function(index) {
  $scope.alerts.splice(index, 1);
};
}
/**
* Master Controller
*/

angular.module('dashboard')
.controller('MasterCtrl', ['$scope', '$cookieStore', MasterCtrl]);

function MasterCtrl($scope, $cookieStore) {
  /**
  * Sidebar Toggle & Cookie Control
  */
  var mobileView = 992;

  $scope.getWidth = function() {
    return window.innerWidth;
  };

  $scope.$watch($scope.getWidth, function(newValue, oldValue) {
    if (newValue >= mobileView) {
      if (angular.isDefined($cookieStore.get('toggle'))) {
        $scope.toggle = ! $cookieStore.get('toggle') ? false : true;
      } else {
        $scope.toggle = true;
      }
    } else {
      $scope.toggle = false;
    }

  });

  $scope.toggleSidebar = function() {
    $scope.toggle = !$scope.toggle;
    $cookieStore.put('toggle', $scope.toggle);
  };

  window.onresize = function() {
    $scope.$apply();
  };
}
/**
* Loading Directive
* @see http://tobiasahlin.com/spinkit/
*/

angular
.module('dashboard')
.directive('rdLoading', rdLoading);

function rdLoading() {
  var directive = {
    restrict: 'AE',
    template: '<div class="loading"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>'
  };
  return directive;
};
/**
* Widget Body Directive
*/

angular
.module('dashboard')
.directive('rdWidgetBody', rdWidgetBody);

function rdWidgetBody() {
  var directive = {
    requires: '^rdWidget',
    scope: {
      loading: '@?',
      classes: '@?'
    },
    transclude: true,
    template: '<div class="widget-body" ng-class="classes"><rd-loading ng-show="loading"></rd-loading><div ng-hide="loading" class="widget-content" ng-transclude></div></div>',
    restrict: 'E'
  };
  return directive;
};
/**
* Widget Footer Directive
*/

angular
.module('dashboard')
.directive('rdWidgetFooter', rdWidgetFooter);

function rdWidgetFooter() {
  var directive = {
    requires: '^rdWidget',
    transclude: true,
    template: '<div class="widget-footer" ng-transclude></div>',
    restrict: 'E'
  };
  return directive;
};
/**
* Widget Header Directive
*/

angular
.module('dashboard')
.directive('rdWidgetHeader', rdWidgetTitle);

function rdWidgetTitle() {
  var directive = {
    requires: '^rdWidget',
    scope: {
      title: '@',
      icon: '@'
    },
    transclude: true,
    template: '<div class="widget-header"><i class="fa" ng-class="icon"></i> {{title}} <div class="pull-right" ng-transclude></div></div>',
    restrict: 'E'
  };
  return directive;
};
/**
* Widget Directive
*/

angular
.module('dashboard')
.directive('rdWidget', rdWidget);

function rdWidget() {
  var directive = {
    transclude: true,
    template: '<div class="widget" ng-transclude></div>',
    restrict: 'EA'
  };
  return directive;

  function link(scope, element, attrs) {
    /* */
  }
};
