(function (app) {
  'use strict';

  app.registerModule('charts', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  //app.registerModule('charts.admin', ['core.admin']);
  //app.registerModule('charts.admin.routes', ['core.admin.routes']);
  app.registerModule('charts.routes', ['ui.router', 'core.routes']);
}(ApplicationConfiguration));
