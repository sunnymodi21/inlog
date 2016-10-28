(function () {
  'use strict';

  // Devices controller
  angular
    .module('devices')
    .controller('DevicesModalViewController', DevicesModalViewController);

  DevicesModalViewController.$inject = ['$scope','$uibModalInstance', 'deviceResolve'];

  function DevicesModalViewController ($scope,$uibModalInstance,deviceResolve) {
    var vm = this;

 
    vm.device = deviceResolve;
    
    $scope.cancel = function() {
		
    $uibModalInstance.dismiss();
	
    };
 
  }
})();