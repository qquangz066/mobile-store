// Initializes the `admin_users` service on path `/admin/users`
const {AdminUsers} = require('./admin_users.class');
const {getUsersModel} = require('../users/users.service.js');
const hooks = require('./admin_users.hooks');

module.exports = function (app) {
  const options = {
    Model: getUsersModel(),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/admin/users', new AdminUsers(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('admin/users');

  service.hooks(hooks);
};
