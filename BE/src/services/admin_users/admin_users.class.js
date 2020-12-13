const {MethodNotAllowed} = require('@feathersjs/errors');
const {Service} = require('feathers-mongoose');

exports.AdminUsers = class AdminUsers extends Service {

  async find(params) {
    params.query.status = {
      $ne: 'deleted'
    };
    params.query.role = {
      $ne: 'admin'
    };
    return await super.find(params);
  }

  async get(id, params) {
    params.query.status = {
      $ne: 'deleted'
    };
    params.query.role = {
      $ne: 'admin'
    };
    return await super.get(id, params);
  }

  async create(data, params) {
    if (data.role === 'admin') {
      return Promise.reject(new MethodNotAllowed('Can not create admin user'));
    }
    return await super.create(data, params);
  }

  async update(id, data, params) {
    let user = await super.get(id);
    if (user.role === 'admin') {
      return Promise.reject(new MethodNotAllowed('Can not update admin user'));
    }
    return await super.update(id, data, params);
  }

  async patch(id, data, params) {
    let user = await super.get(id);
    if (user.role === 'admin') {
      return Promise.reject(new MethodNotAllowed('Can not update admin user'));
    }
    return await super.patch(id, data, params);
  }

  async remove(id, params) {
    let user = await super.get(id);
    if (user.role === 'admin') {
      return Promise.reject(new MethodNotAllowed('Can not remove admin user'));
    }
    return await super.remove(id, params);
  }

};
