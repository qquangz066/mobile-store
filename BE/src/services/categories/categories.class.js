const {Service} = require('feathers-mongoose');

exports.Categories = class Categories extends Service {
  async find(params) {
    params.query.status = 'enable';
    return await super.find(params);
  }

  async get(id, params) {
    params.query.status = 'enable';
    return await super.get(id, params);
  }
};
