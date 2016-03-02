'use strict';

angular.module('zinkerz.home', ['ngRoute'])

    .config(function($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'Zinkerz/home.html'
        });

    });

