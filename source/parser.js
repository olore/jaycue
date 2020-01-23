const get = require('lodash.get');
const handleSelect = require('./functions/select');
const { handleArrayIndexing, isArrayIndexing } = require('./base/array');

// recursively call `parse` until there are no more `filters`
const parse = (data, filters) => {
  if (filters && filters.length === 0) {
    return data;
  }

  let filter = filters.shift().trim();

  if (filter.startsWith('.')) {
    return handleStartingDot(data, filter, filters);

  } else if (filter.startsWith('select')) {
    let res = handleSelect(data, filter);
    if (res.newFilter) {
      filters.unshift(res.newFilter);
    }
    return parse(res.jsonObject, filters);

  } else {
    console.log('returning undefined! because unknown filter:', filter);
    return undefined; // when filter doesn't start with . or 'select'
  }
}

const handleStartingDot = (data, _filter, filters) => {
  let filter = _filter.substring(1);

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
}

module.exports = {
  parse
};