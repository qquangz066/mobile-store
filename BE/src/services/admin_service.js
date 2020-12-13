const {Service} = require('feathers-mongoose');

exports.AdminService = class AdminService extends Service {

  async find(params) {
    params.query.status = {
      $ne: 'deleted'
    };
    return await super.find(params);
  }

  async get(id, params) {
    params.query.status = {
      $ne: 'deleted'
    };
    return await super.get(id, params);
  }

  // eslint-disable-next-line no-unused-vars
  async remove(id, params) {
    return await super.patch(id, {status: 'deleted'});
  }

};
