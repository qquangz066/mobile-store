const {authenticate} = require('@feathersjs/authentication').hooks;
const checkPermissions = require('feathers-permissions');

module.exports = {
  before: {
    all: [authenticate('jwt'), checkPermissions({roles: ['admin'], field: 'role'})],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
