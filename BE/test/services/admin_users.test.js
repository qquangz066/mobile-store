const app = require('../../src/app');

describe('\'admin_users\' service', () => {
  it('registered the service', () => {
    const service = app.service('admin/users');
    expect(service).toBeTruthy();
  });
});
