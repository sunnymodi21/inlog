(function () {
  'use strict';

  // Devices controller
  angular
    .module('devices')
    .controller('DevicesModalDeleteController', DevicesModalDeleteController);

  DevicesModalDeleteController.$inject = ['$scope','$uibModalInstance', 'deviceResolve'];

  function DevicesModalDeleteController ($scope,$uibModalInstance,deviceResolve) {
    var vm = this;

 
    vm.device = deviceResolve;
    vm.error = null;
    vm.form = {};
    vm.name = vm.device.name;
	
	$scope.remove = function() {
		
      vm.device.$remove(function(){
          $uibModalInstance.close(true);          
      }                                       
      ,function(){
         vm.error = res.data.message; 
      });
	}

      
    $scope.cancel = function() {
        $uibModalInstance.dismiss();
    };   
       
   
 
  }
})();