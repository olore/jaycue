const get = require('lodash.get');
const handleSelect = require('./functions/select');
const { handleArrayIndexing, isArrayIndexing } = require('./base/array');

const parse = (jsonObject, filters) => {
  if (filters && filters.length === 0) {
    return jsonObject;
  }

  let filter = filters.shift().trim();

  if (filter.startsWith('.')) {
    filter = filter.substring(1);

    if (isArrayIndexing(filter)) {
      return parse(handleArrayIndexing(jsonObject, filter), filters);
    }

    // use our old friend lodash.get
    return parse(get(jsonObject, filter), filters);

  } else {

    if (filter.startsWith('select')) {
      let res = handleSelect(jsonObject, filter, filters);
      return parse(res.jsonObject, res.filters);
    }

    console.log('returning undefined! because ', filter);
    return undefined; // when filter doesn't start with .
  }
}

module.exports = {
  parse
};