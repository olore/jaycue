
const handleSelect = (data, filter, filters) => {
  let inParens = filter.match(/\((.*?)\)/)[1];
  let [field, op, value] = parseSelectValues(inParens);
  let suffix = filter.match(/select\(.*?\)(.*$)/)[1];

  let selectedData = undefined;

  data.split("\n").forEach((json) => {
    const parsed = JSON.parse(json);
    if (comparisonFunction(op, parsed[field], value)()) {
      selectedData = parsed;
    }
  });

  // treat anything after select() as a filter by putting it in in the front of the filters array
  if (suffix) {
    filters.unshift(suffix.trim());
  }
 
  return {
    jsonObject: selectedData,
    filters 
  };
}

// returns lhs, op, rhs
const parseSelectValues = (filter) => {
  let x = filter.split('!=');
  if (x.length == 2) {
    return [cleanFirstSelectArg(x[0]), '!=', cleanSecondSelectArg(x[1])];
  } else  {
    x = filter.split('==');
    return [cleanFirstSelectArg(x[0]), '==', cleanSecondSelectArg(x[1])];
  }
}

// in: ".id ", out: "id"
const cleanFirstSelectArg = (arg) => {
  return arg.substring(1).trim();
}

// in: "second", out: second
const cleanSecondSelectArg = (arg) => {
  return arg.replace(/\"/g, '').trim();
}

const comparisonFunction = (op, field, value) => {
  if (op === '!=') {
    return () => {
      return field != value;
    }
  } else if (op === '==') {
    return () => {
      return field === value;
    }
  } else {
    console.log(`Error: Unknown operator ${op}`);
    return undefined;
  }
}

module.exports = handleSelect;