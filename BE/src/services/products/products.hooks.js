const {disallow} = require('feathers-hooks-common');

const searchRegex = function () {
  //http://localhost:3030/products?$or[0][name][$search]=xiaomi&$or[1][name][$search]=phone&$or[2][name][$search]=samsung
  return function (hook) {
    const query = hook.params.query;
    for (let field in query) {
      if (query[field].$search && field.indexOf('$') == -1) {
        query[field] = {$regex: new RegExp(query[field].$search, 'i')};
      }
      if (field === '$or') {
        query[field].map((action) => {
          let f = Object.keys(action)[0];
          if (action[f].$search) {
            action[f] = {$regex: new RegExp(action[f].$search, 'i')};
          }
          return action;
        });
      }
    }
    hook.params.query = query;
    return hook;
  };
};

module.exports = {
  before: {
    all: [],
    find: [searchRegex()],
    get: [],
    create: [disallow()],
    update: [disallow()],
    patch: [disallow()],
    remove: [disallow()]
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
