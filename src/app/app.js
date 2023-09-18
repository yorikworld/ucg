function AppController($scope) {}
function PageNotFound($scope) {}
angular.module('app', ['templates.app', 'userModule', 'userListModule'])
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
    .factory('Http', function () {
        return {
            userListResponse: [
                {
                    userName: 'John',
                    firstName: 'Dou',
                    lastName: 'asd',
                    email: '',
                    password: '',
                    userType: 'Admin',
                    isNewUser: false
                },
                {
                    userName: 'John2',
                    firstName: 'Dou2',
                    lastName: '',
                    email: '',
                    password: '',
                    userType: 'Driver',
                    isNewUser: false
                },
                {
                    userName: 'John3',
                    firstName: 'Dou3',
                    lastName: '',
                    email: '',
                    password: '',
                    userType: 'Driver',
                    isNewUser: false
                },
                {
                    userName: 'John4',
                    firstName: 'Dou4',
                    lastName: '',
                    email: '',
                    password: '',
                    userType: 'Driver',
                    isNewUser: false
                }
            ].map((item,i) => {
                return Object.assign({ id: i+1 }, item);
            })
        };
})
    .directive('password', function() {
        var PASSWORD_REGEXP = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;
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
        var EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
                ctrl.$validators.userNameUnique = function(modelValue, viewValue) {
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
