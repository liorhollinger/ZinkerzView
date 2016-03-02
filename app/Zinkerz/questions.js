'use strict';

angular.module('zinkerz.questions', ['ngRoute'])

    .config(function ($routeProvider) {
        $routeProvider.when('/questions', {
            templateUrl: 'Zinkerz/questions.html',
            controller: 'QuestionsCtrl'
        });

    })

    .controller('QuestionsCtrl', function ($scope, QuestionsFactory, $timeout) {
        QuestionsFactory.query().success(function (jsonList) {
            $scope.questions = jsonList;
        });
        $scope.currentQuestion = 0;
        $scope.correctAnswers = 0;

        $scope.letters = ['A', 'B', 'C', 'D'];
        $scope.buttonInfo = 'Next question';
        $scope.answered = false;
        $scope.nextQuestion = function () {
            if ($scope.currentQuestion >= $scope.questions.length - 1) {
                $scope.questionsOver = true;
            }
            else {
                $scope.currentQuestion++;
                $scope.userSawAnswer = false;
            }
            $scope.answered = false;
        };
        $scope.userAnswered = function (answer) {
            if ($scope.answered)return;
            $scope.answered = true;
            if (answer.isCorrect) {
                answer.showCorrect = true;
                $scope.correctAnswers++
            }
            else {
                answer.userWrong = true;
                $scope.questions[$scope.currentQuestion].answers.forEach(function (answer) {
                    if (answer.isCorrect) {
                        answer.showCorrect = true;
                    }
                })
            }
            if ($scope.currentQuestion >= $scope.questions.length - 1) {
                $scope.buttonInfo = 'Results';
            }
            $scope.userSawAnswer = true
        };

    })

    .factory('QuestionsFactory', function ($http) {
        return {
            query: function () {
                return $http.get('server/questions.json');
            }
        }
    });