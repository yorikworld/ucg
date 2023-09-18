function UserListController($scope, Http, $attrs) {
    $scope.userList = Http.userListResponse;
    $scope.selectedUser = null;
    $scope.selectUser = function (user) {
        $scope.selectedUser = Object.assign({}, user);
    };

    $scope.createUserAction = function () {
        $scope.selectedUser = {
            id:Math.floor(Math.random() * 100),
            userName: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            userType: 'Driver',
            isNewUser: true
        };
    };
    $scope.createUser = function (user) {
        user.isNewUser = false;
        $scope.userList.push(user);
        $scope.selectedUser=null;
    };

    $scope.deleteUser = function(user) {
        $scope.userList.splice($scope.userList.findIndex((item) => item.id === user.id), 1);
        $scope.selectedUser = null;
    };

    $scope.saveUser = function(userObj) {
        const index = $scope.userList.findIndex((item) => {
            return item.id === userObj.user.id; });
        $scope.userList[index]=userObj.user;
        console.log('saveUser userList', userObj, index,$scope.userList);
    };
}
angular.module('userListModule', ['ngRoute'])
    .component('userList', {
        templateUrl: 'modules/users/user-list.tpl.html',
        controller: UserListController
    });
