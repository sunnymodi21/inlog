(function () {
  'use strict';

  angular
    .module('samples.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('samples', {
        url: '/samples',
        controller: 'SamplesController',
        controllerAs: 'vm',
        templateUrl: 'modules/samples/client/views/home-samples.client.view.html',
        data: {
           roles: ['user', 'admin'],
          pageTitle: 'Samples'
        }
      })
  }
}());

