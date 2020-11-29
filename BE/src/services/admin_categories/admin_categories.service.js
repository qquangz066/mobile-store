// Initializes the `admin_categories` service on path `/admin/categories`
const { AdminCategories } = require('./admin_categories.class');
const hooks = require('./admin_categories.hooks');
const {getCategoriesModel} = require('../categories/categories.service');

module.exports = function (app) {
  const options = {
    Model: getCategoriesModel(),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/admin/categories', new AdminCategories(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('admin/categories');

  service.hooks(hooks);
};
