const get = require('lodash.get');

const jqx = (jsonObject, query) => {
  if (query === '.') {
    return jsonObject;
  }

  if (query.startsWith('.')) {
    let x = get(jsonObject, query.substring(1));
    return x;
  }
}

module.exports = jqx;