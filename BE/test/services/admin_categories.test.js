const app = require('../../src/app');

describe('\'admin_categories\' service', () => {
  it('registered the service', () => {
    const service = app.service('admin/categories');
    expect(service).toBeTruthy();
  });
});
