'use strict';

angular.module('tableOneApp')

.directive('headerContextMenu', function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            actions:"="
        },
        templateUrl: 'views/directives/header-context-menu.html',
        link: function (scope, element, attrs, ngModel) {
            
        }
    };
});