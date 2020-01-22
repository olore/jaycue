const { parse } = require('./parser');

const jqx = (jsonObject, filter) => {

  if (filter === '.') {
    return jsonObject;
  }

  let filters = filter.split('|').map(str => str.trim());
  return parse(jsonObject, filters);
};

module.exports = jqx;