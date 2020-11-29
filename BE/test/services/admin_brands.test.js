const app = require('../../src/app');

describe('\'admin_brands\' service', () => {
  it('registered the service', () => {
    const service = app.service('admin/brands');
    expect(service).toBeTruthy();
  });
});
