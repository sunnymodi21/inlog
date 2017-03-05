(function () {
  'use strict';

  angular
    .module('charts.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('charts', {
        url: '/charts',
        controller: 'ChartsController',
        controllerAs: 'vm',
        templateUrl: 'modules/charts/client/views/home-charts.client.view.html',
        data: {
           roles: ['user', 'admin'],
          pageTitle: 'Charts'
        }
      })
  }
}());

