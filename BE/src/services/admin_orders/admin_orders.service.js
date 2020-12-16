// Initializes the `admin_orders` service on path `/admin/orders`
const {AdminOrders} = require('./admin_orders.class');
const {getOrdersModel} = require('../orders/orders.service');
const hooks = require('./admin_orders.hooks');

module.exports = function (app) {
  const options = {
    Model: getOrdersModel(),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/admin/orders', new AdminOrders(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('admin/orders');

  service.hooks(hooks);
};
