(function () {
  'use strict';

  angular
    .module('users')
    .controller('SettingsApiController', SettingsApiController);

  SettingsApiController.$inject = ['$scope', '$http', '$location', 'UsersService', 'Authentication'];

  function SettingsApiController($scope, $http, $location, UsersService, Authentication) {
    var vm = this;

    vm.user = Authentication.user;
    vm.updateToken = updateToken;
    //console.log(vm.user);
    // Update a user profile
    function updateToken(isValid) {
      vm.success = vm.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.userForm');

        return false;
      }

      var user = new UsersService(vm.user);

      user.$update(function (response) {
        $scope.$broadcast('show-errors-reset', 'vm.userForm');

        vm.success = true;
        Authentication.user = response;
      }, function (response) {
        vm.error = response.data.message;
      });
    }
  }
}());
