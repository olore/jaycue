const get = require('lodash.get');

const jqx = (jsonObject, query) => {
  if (query === '.') {
    return jsonObject;
  }

  let result = undefined;
  if (query.startsWith('.')) {
    if (/\?$/.test(query)) {
      query = query.substring(1, query.length-1);
      result = get(jsonObject, query);
    } else {
      result = get(jsonObject, query.substring(1));
    }
    return result;
  }
}

module.exports = jqx;