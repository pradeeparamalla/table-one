'use strict';

/**
 * @ngdoc overview
 * @name tableOneApp
 * @description
 * # tableOneApp
 *
 * Main module of the application.
 */
angular
  .module('tableOneApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngDragDrop'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
