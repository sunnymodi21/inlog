(function (app) {
  'use strict';

  app.registerModule('testingapis', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  //app.registerModule('testingapis.admin', ['core.admin']);
  //app.registerModule('testingapis.admin.routes', ['core.admin.routes']);
  app.registerModule('testingapis.routes', ['ui.router', 'core.routes']);
}(ApplicationConfiguration));
