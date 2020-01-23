const get = require('lodash.get');
const handleSelect = require('./functions/select');
const { handleArrayIndexing, isArrayIndexing } = require('./base/array');

const parse = (data, filters) => {
  if (filters && filters.length === 0) {
    return data;
  }

  let filter = filters.shift().trim();

  if (filter.startsWith('.')) {
    filter = filter.substring(1);

    if (isArrayIndexing(filter)) {
      return parse(handleArrayIndexing(data, filter), filters);
    }

    let lodashDefault = undefined;

    if (filter.includes('?')) {
      filter = filter.replace('?', '');
      lodashDefault = null;
    }

    // use our old friend lodash.get
    return parse(get(data, filter, lodashDefault), filters);

  } else {

    if (filter.startsWith('select')) {
      let res = handleSelect(data, filter, filters);
      return parse(res.jsonObject, res.filters);
    }

    console.log('returning undefined! because ', filter);
    return undefined; // when filter doesn't start with .
  }
}

module.exports = {
  parse
};