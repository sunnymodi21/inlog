(function (app) {
  'use strict';

  app.registerModule('samples', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  //app.registerModule('samples.admin', ['core.admin']);
  //app.registerModule('samples.admin.routes', ['core.admin.routes']);
  app.registerModule('samples.routes', ['ui.router', 'core.routes']);
}(ApplicationConfiguration));
