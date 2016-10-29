(function () {
  'use strict';

  angular
    .module('devices')
    .controller('DevicesListController', DevicesListController);

  DevicesListController.$inject = ['$uibModal','DevicesService'];

  function DevicesListController($uibModal,DevicesService) {
    var vm = this;

    vm.devices = DevicesService.query();
    
    vm.deleteDevices = function(){
        angular.forEach(vm.devices,function(value,key){
           if(value.selected === true){
               console.log('deleting....');
               value.$remove(function(){
                   vm.devices = DevicesService.query();
               });     
			}
       });
    } 
	
	
	function selectAllDevices(){
   			angular.forEach(vm.devices,function(value,key){
   				
   				value.selected=true;
   				
   			})} ;
			
			
 vm.openViewModal = openViewModal;
    
    // open a model
    function openViewModal(deviceId){
          var modalInstance  = $uibModal.open({
            templateUrl: 'modules/devices/client/views/modalview-device.client.view.html',
            controller: 'DevicesModalViewController',
            controllerAs: 'vm',
            size: 'lg',
            backdrop: 'static',
            resolve: {
                deviceResolve: DevicesService.get({
                    deviceId: deviceId })
            }
         });
         
          modalInstance.result.then(function () {
     			vm.devices = DevicesService.query();
    	  }, function () {
     		
   		  });
         
    }    
      
      
  vm.openEditModal = openEditModal;
    
    // open a model
    function openEditModal(deviceId){
         //console.log(deviceId);
          var modalInstance  = $uibModal.open({
            templateUrl: 'modules/devices/client/views/modaledit-device.client.view.html',
            controller: 'DevicesModalEditController',
            controllerAs: 'vm',
            size: 'lg',
            backdrop: 'static',
            resolve: {
                deviceResolve: DevicesService.get({
                    deviceId: deviceId })			
				}
            
         });
         
          modalInstance.result.then(function () {
     			
    	  }, function () {
     		 
   		  });
         
    } 
      
      
      
      
    vm.openDeleteModal = openDeleteModal;
    
    // open a model
    function openDeleteModal(deviceId){
         //console.log(deviceId);
          var modalInstance  = $uibModal.open({
            templateUrl: 'modules/devices/client/views/modaldelete-device.client.view.html',
            controller: 'DevicesModalDeleteController',
            controllerAs: 'vm',
            size: 'sm',
            backdrop: 'static',
            resolve: {
                deviceResolve: DevicesService.get({
                    deviceId: deviceId })
            }
         });
         
          modalInstance.result.then(function () {
     			vm.devices = DevicesService.query();
    	  }, function () {
               
   		  });
         
    } 
      
      
      
      
      
  }
})();
