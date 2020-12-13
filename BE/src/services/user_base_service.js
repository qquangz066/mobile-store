const {Service} = require('feathers-mongoose');

exports.UserBaseService = class UserBaseService extends Service {

  async find(params) {
    params.query.status = 'enable';
    return await super.find(params);
  }

  async get(id, params) {
    params.query.status = 'enable';
    return await super.get(id, params);
  }

};
