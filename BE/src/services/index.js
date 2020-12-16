const {users} = require('./users/users.service.js');
const {categories} = require('./categories/categories.service.js');
const {brands} = require('./brands/brands.service.js');
const {products} = require('./products/products.service.js');
const {orders} = require('./orders/orders.service.js');
const adminBrands = require('./admin_brands/admin_brands.service.js');
const adminCategories = require('./admin_categories/admin_categories.service.js');
const adminProducts = require('./admin_products/admin_products.service.js');
const adminUsers = require('./admin_users/admin_users.service.js');
const login = require('./login/login.service.js');
const adminOrders = require('./admin_orders/admin_orders.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(categories);
  app.configure(brands);
  app.configure(products);
  app.configure(orders);
  app.configure(adminBrands);
  app.configure(adminCategories);
  app.configure(adminProducts);
  app.configure(adminUsers);
  app.configure(login);
  app.configure(adminOrders);
};
