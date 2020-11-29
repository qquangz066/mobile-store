// Initializes the `admin_products` service on path `/admin/products`
const { AdminProducts } = require('./admin_products.class');
const {getProductsModel} = require('../products/products.service.js');
const hooks = require('./admin_products.hooks');

module.exports = function (app) {
  const options = {
    Model: getProductsModel(),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/admin/products', new AdminProducts(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('admin/products');

  service.hooks(hooks);
};
