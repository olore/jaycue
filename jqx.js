const get = require('lodash.get');

const jqx = (jsonObject, query) => {
  if (query === '.') {
    return jsonObject;
  }

  let result = undefined;
  if (query.startsWith('.')) {
    query = query.substring(1);

    if ((query.startsWith('[')
        && !query.startsWith('["')
        && (!/\[\d/.test(query)))
        || query.includes(':')) {
      return handleArrayIndexing(jsonObject, query);
    }

    if (/\?$/.test(query)) {
      query = query.substring(0, query.length-1);
    }

    result = get(jsonObject, query);

    return result;
  } else {
    return undefined; // when query doesn't start with .
  }
}

const handleArrayIndexing = (jsonObject, query) => {
  let innards = query.match(/\[(.*?)\]/)[1];
  if (innards.includes(':')) { // it's a range
    if (/^:/.test(innards)) { // only end
      let digit = Number(innards.match(/^:(-*\d)/)[1]);
      if (digit < 0) {
        return jsonObject.reverse().slice(0, digit);
      } else {
        return jsonObject.slice(0, digit);
      }

    } else if (/:$/.test(innards)) { // only start
      let digit = Number(innards.match(/(-*\d):$/)[1]);
      if (digit < 0) {
        return jsonObject.reverse().slice(digit);
      } else {
        return jsonObject.slice(digit);
      }

    } else {
      // TODO: not handling negatives here yet
      let res = innards.match(/(\d):(\d)$/);
      let start = Number(res[1]);
      let end = Number(res[2]);
      return jsonObject.slice(start, end);

    }
  } else {
    if (/^\[-/.test(query)) { // negative index
      let digit = query.match(/^\[-(\d)\]/)[1];
      return jsonObject.reverse()[digit];
    }
  }

  // fall back - shouldn't get here
  return undefined;
};

module.exports = jqx;