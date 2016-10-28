(function () {
  'use strict';

  angular
    .module('devices.services')
    .factory('DevicesService', DevicesService);

  DevicesService.$inject = ['$resource'];

  function DevicesService($resource) {
    var Device = $resource('api/devices/:deviceId', {
      deviceId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Device.prototype, {
      createOrUpdate: function () {
        var device = this;
        return createOrUpdate(device);
      }
    });

    return Device;

    function createOrUpdate(device) {
      if (device._id) {
        return device.$update(onSuccess, onError);
      } else {
        return device.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(device) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      console.log(error);
    }
  }
}());
