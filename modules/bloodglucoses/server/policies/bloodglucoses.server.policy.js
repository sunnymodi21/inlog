'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke bloodglucoses Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/bloodglucoses',
      permissions: '*'
    }, {
      resources: '/api/bloodglucoses/:bloodglucoseId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/bloodglucoses',
      permissions: ['get']
    }, {
      resources: '/api/bloodglucoses/:bloodglucoseId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/bloodglucoses',
      permissions: ['get']
    }, {
      resources: '/api/bloodglucoses/:bloodglucoseId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If bloodglucoses Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an bloodglucose is being processed and the current user created it then allow any manipulation
  if (req.bloodglucose && req.user && req.bloodglucose.user && req.bloodglucose.user.id === req.user.id) {
    return next();
  }

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};
