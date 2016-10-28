(function () {
  'use strict';

  // Devices controller
  angular
    .module('devices')
    .controller('DevicesModalEditController', DevicesModalEditController);

  DevicesModalEditController.$inject = ['$scope','$filter','$uibModalInstance','$http', 'deviceResolve','$state'];

  function DevicesModalEditController ($scope,$filter,$uibModalInstance,$http,deviceResolve,$state) {
    var vm = this;

    vm.device = deviceResolve;
	
	vm.showtext=false;
	vm.showlabel=true;
	vm.error = null;
    vm.form = {};
	
    $scope.cancel = function() {
        $uibModalInstance.dismiss();
    }; 
      
    $scope.remove = function() {
      vm.device.$remove(function(){
          $uibModalInstance.close(true);          
      }                                       
      ,function(){
         vm.error = res.data.message; 
      });
      
    }
   
   vm.save = function(){
       //console.log(vm.device)
        // TODO: move create/update logic to service
      if (vm.device._id) {
        vm.device.$update(successCallback, errorCallback);
      } 

      function successCallback(res) {
       $uibModalInstance.dismiss();
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
	
    }
       
 
  }
})();