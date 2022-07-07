
const handleSelect = (data, filter) => {
  let [, inParens, suffix] = filter.match(/\((.*?)\)(.*$)/);
  let [field, op, value] = parseSelectValues(inParens);

  let matchedData = undefined;

  data.split("\n").forEach((json) => {
    const parsed = JSON.parse(json);
    if (comparisonFunction(op, parsed[field], value)()) {
      matchedData = parsed;
    }
  });

  return {
    jsonObject: matchedData,
    newFilter: suffix && suffix.trim() 
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
  const possibleNumber = Number(arg);
  if (!Number.isNaN(possibleNumber)) {
    return possibleNumber;
  }
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
