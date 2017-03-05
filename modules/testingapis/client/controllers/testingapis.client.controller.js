(function () {
  'use strict';

  angular
    .module('testingapis')
    .controller('TestingapisController', TestingapisController);

  TestingapisController.$inject = ['$scope', '$state', '$window','$resource', 'DevicesService'];

  function TestingapisController($scope, $state, $window, $resource,DevicesService) {
    var vm = this;
    vm.devices=DevicesService.query();
    vm.error = null;
    vm.send=send;
    vm.api={};
    vm.api.header={};
    vm.api.url='/api/things/{token}/{device label}'
    vm.api.headerType='Content-Type';
    vm.api.header[vm.api.headerType]='application/json';
    vm.api.body='{"body":{"data":{"co2":{"value":26},"noise":{"value":27},"co":{"value":30}}}}';
    vm.methods=['get','post']
    vm.api.method='get';
    function send() {
      if(vm.api.method==='get'){
        var getData=$resource(vm.api.url, {}, {
          query: {
              method: 'GET',
              isArray: true
          }
        })
        getData.query(function(res){
          vm.api.response=JSON.stringify(res)
        });
      }
      else if(vm.api.method==='post'){
          var headers=vm.api.headers
          var body=JSON.parse(vm.api.body);
          var postData=$resource(vm.api.url, {}, {
              post: {
                  method: 'POST',
                  headers:  headers
              }
          });
          postData.post(body, function(res){
            vm.api.response=JSON.stringify(res)
          })
          
      }
    }
  }
}());
