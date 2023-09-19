function AppController($scope) {}
function PageNotFound($scope) {}
angular.module('app', ['templates.app', 'ngRoute', 'userModule', 'userListModule'])
    .config(function($routeProvider) {
        $routeProvider.when('/',
            {
                redirectTo: '/users',
            })
            .when('/users',
            {
                templateUrl: 'modules/users/user-list.tpl.html',
                controller: UserListController
            })
            .when('/users/:userId',
                {
                    templateUrl: 'modules/users/user-list.tpl.html',
                    controller: UserListController
                })
            .when('/404', {
                templateAs: 'pageNotFound.tpl.html',
                controller: PageNotFound
            })
            .otherwise({redirectTo: '/404'});
    })
    .component('appController', {
        templateUrl: 'app.tpl.html',
        controller: AppController
    })
    .controller('PageNotFound', ['$scope', PageNotFound])
    .factory('Http', ['$http', function (http) {
        return {
            getUsers: function () {
                return http({
                    method: 'GET',
                    url: '/assets/http/users.json'
                })
                    .then(function (res) {
                        return {
                            ...res,
                            data: res.data.map((item,i) => Object.assign({ id: i+1 }, item))
                        }
                    })
            }
        };
    }])
    .directive('password', function() {
        const PASSWORD_REGEXP = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$validators.checkPassword = function(modelValue, viewValue) {
                    if (ctrl.$isEmpty(modelValue)) {
                        return true;
                    }
                    if (viewValue.length < 8) {
                        return false;
                    }
                    return PASSWORD_REGEXP.test(viewValue);
                };
            }
        };
    })
    .directive('email', function() {
        const EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$validators.email = function(modelValue, viewValue) {
                    if (ctrl.$isEmpty(modelValue)) {
                        return true;
                    }
                    return EMAIL_REGEXP.test(viewValue);
                };
            }
        };
    })
    .directive('unique', function() {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$validators.userNameUnique = function(modelValue) {
                    if (ctrl.$isEmpty(modelValue)) {
                        return true;
                    }
                    if (!scope.$parent.user.isNewUser) {
                        return true;
                    }
                    return !scope.$parent.$ctrl.list.find(user => !user.isNewUser && String(user.userName).toLowerCase() === String(modelValue).toLowerCase());
                };
            }
        };
    });
