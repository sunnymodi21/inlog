(function () {
  'use strict';

  angular
    .module('charts')
    .controller('ChartsController', ChartsController);

  ChartsController.$inject = ['$scope', '$state', '$filter','$window','$resource', 'DevicesService'];

  function ChartsController($scope, $state,$filter, $window, $resource,DevicesService) {
    var vm = this;
    vm.devices=DevicesService.query(function(){
        
        angular.forEach(vm.devices,function(device){
          var url='/api/things/'+device.deviceLabel
          var getData=$resource(url, {}, {
            query: {
                method: 'GET',
                isArray: true
            }
          })
          getData.query(function(res){
            device.data=res;
            device.types=Object.keys(device.data[0].body.data)
            device.type=device.types[0]
          });
      });
    });
  }
}());
