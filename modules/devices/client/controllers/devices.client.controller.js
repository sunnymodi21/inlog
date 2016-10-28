(function () {
  'use strict';

  angular
    .module('devices')
    .controller('DevicesController', DevicesController);

  DevicesController.$inject = ['$scope', '$state', '$window', 'deviceResolve'];

  function DevicesController($scope, $state, $window, device) {
    var vm = this;

    vm.device = device;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Device
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.device.$remove($state.go('devices.list'));
      }
    }
    function edit(res) {
        $state.go('devices.create'); // should we send the User to the list or the updated Device's view?
      }
    // Save Device
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.deviceForm');
        return false;
      }

      // Create a new device, or update the current instance
      vm.device.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('devices.list'); // should we send the User to the list or the updated Device's view?
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
