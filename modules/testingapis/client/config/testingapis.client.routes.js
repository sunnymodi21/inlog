(function () {
  'use strict';

  angular
    .module('testingapis.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('testingapis', {
        url: '/testingapis',
        controller: 'TestingapisController',
        controllerAs: 'vm',
        templateUrl: 'modules/testingapis/client/views/home-testingapis.client.view.html',
        data: {
           roles: ['user', 'admin'],
          pageTitle: 'TestingApis'
        }
      })
  }
}());

