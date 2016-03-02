'use strict';

angular.module('zinkerz-app', [
    'ngRoute',
    'zinkerz.home',
    'zinkerz.questions'
]).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/home'});
    }]);
