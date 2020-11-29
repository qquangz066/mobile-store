// Initializes the `products` service on path `/products`
const {Products} = require('./products.class');
const createModel = require('../../models/products.model');
const hooks = require('./products.hooks');

let productsModel;

module.exports = {
  products: function (app) {
    productsModel = createModel(app);
    const options = {
      // eslint-disable-next-line no-unused-vars
      Model: productsModel,
      paginate: app.get('paginate')
    };

    // Initialize our service with any options it requires
    app.use('/products', new Products(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('products');

    service.hooks(hooks);
  },
  //Im doing this because it's got error when two service create new instances of the same model.
  getProductsModel: function () {
    return productsModel;
  }
};
