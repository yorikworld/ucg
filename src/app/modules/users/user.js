function UserController($scope) {
    $scope.user = null;
    $scope.originalUser = null;
    $scope.title = 'Create new user';
    $scope.$watch('$ctrl.user', function (user) {
        $scope.user = user;
        $scope.originalUser = Object.assign({}, user);
        $scope.title = $scope.user.firstName + ' ' + $scope.user.firstName;
        if (user && user.isNewUser) {
            $scope.title = 'Create new user';
        }
    });

    $scope.createUser = function (user, isValid) {
        if(user && isValid) {
            $scope.$parent.createUser(user);
        }

    };

    $scope.deleteUser = function () {
        $scope.$parent.deleteUser($scope.user);
    };

    $scope.saveUser = function (user, isValid) {
        console.log('saveUser user', user, isValid);
        if (isValid) {
            $scope.$parent.saveUser({
                user: user,
                originalUser: $scope.originalUser
            });
        }
    };

    $scope.closeComponent = function () {
        $location.path('/users');
        $scope.user = null;
    };
}
angular.module('userModule', [])
    .component('user', {
        templateUrl: 'modules/users/user.tpl.html',
        controller: UserController,
        bindings: {
            user: '<',
            list: '<',
            onDelete: '&',
            onSave: '&'
        }
    });

