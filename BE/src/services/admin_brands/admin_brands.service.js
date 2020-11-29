// Initializes the `admin_brands` service on path `/admin/brands`
const { AdminBrands } = require('./admin_brands.class');
const hooks = require('./admin_brands.hooks');
const {getBrandsModel} = require('../brands/brands.service');

module.exports = function (app) {
  const options = {
    Model: getBrandsModel(),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/admin/brands', new AdminBrands(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('admin/brands');

  service.hooks(hooks);
};
