const app = require('../../src/app');

describe('\'admin_orders\' service', () => {
  it('registered the service', () => {
    const service = app.service('admin/orders');
    expect(service).toBeTruthy();
  });
});
