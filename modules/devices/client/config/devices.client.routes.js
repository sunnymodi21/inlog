(function () {
  'use strict';

  angular
    .module('devices.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('devices', {
        url: '/devices',
        controller: 'DevicesListController',
        controllerAs: 'vm',
        templateUrl: 'modules/devices/client/views/home-devices.client.view.html',
        data: {
           roles: ['user', 'admin'],
          pageTitle: 'Devices'
        }
      })
       .state('devices.create', {
        url: '/create',
        templateUrl: 'modules/devices/client/views/form-device.client.view.html',
        controller: 'DevicesController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Devices Create'
        },
        resolve: {
          deviceResolve: newDevice
        }
      })
      .state('devices.edit', {
        url: '/:deviceId/edit',
        templateUrl: 'modules/devices/client/views/form-device.client.view.html',
        controller: 'DevicesController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Devices Edit'
        },
        resolve: {
          deviceResolve: getDevice
        }
      })
      .state('devices.list', {
        url: '/list',
        templateUrl: 'modules/devices/client/views/list-devices.client.view.html',
        controller: 'DevicesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Devices List'
        }
      })
      .state('devices.view', {
        url: '/:deviceId',
        templateUrl: 'modules/devices/client/views/view-device.client.view.html',
        controller: 'DevicesController',
        controllerAs: 'vm',
        resolve: {
          deviceResolve: getDevice
        },
        data: {
          pageTitle: 'Device {{ deviceResolve.title }}'
        }
      });
  }

  getDevice.$inject = ['$stateParams', 'DevicesService'];

  function getDevice($stateParams, DevicesService) {
    return DevicesService.get({
      deviceId: $stateParams.deviceId
    }).$promise;
  }

  newDevice.$inject = ['DevicesService'];

  function newDevice(DevicesService) {
    return new DevicesService();
  }
}());

