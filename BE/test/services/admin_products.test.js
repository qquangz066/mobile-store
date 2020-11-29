const app = require('../../src/app');

describe('\'admin_products\' service', () => {
  it('registered the service', () => {
    const service = app.service('admin/products');
    expect(service).toBeTruthy();
  });
});
