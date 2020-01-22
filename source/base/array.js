const handleArrayIndexing = (jsonObject, filter) => {
  if (filter === '[]') {
    return jsonObject.map(obj => JSON.stringify(obj)).join("\n");
  }

  let innards = filter.match(/\[(.*?)\]/)[1];
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
    if (/^\[-/.test(filter)) { // negative index
      let digit = filter.match(/^\[-(\d)\]/)[1];
      return jsonObject.reverse()[digit];
    }
  }

  // fall back - shouldn't get here
  return jsonObject;
}

const isArrayIndexing = (filter) => {
  return ((filter.startsWith('[')
      && !filter.startsWith('["')   // .["test"] (not array indexing)
      && (!/\[\d+]/.test(filter)))  // .[1] (not array indexing)
      || filter.includes(':'));     // .[1:4] (is array indexing)
}

module.exports = {
  isArrayIndexing,
  handleArrayIndexing
};