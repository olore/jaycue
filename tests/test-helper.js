const fs = require('fs');
const exec = require('child_process').execSync;
const jqx = require('../source');

const parseJSONFile = (filePath) => {
  return JSON.parse(fs.readFileSync(filePath).toString());
}

const compareResults = (jsonFile, query) => {
  let jsonObject = parseJSONFile(jsonFile);

  expect(
    jqx(jsonObject, query))
    .toEqual( 
      jq(jsonObject, query)
    );
}

// run actual jq command 
const jq = (jsonObject, query) => {
  let command = `echo "${echoify(jsonObject)}" | jq '${query}'`;
  let result = exec(command).toString();
  try {
    return JSON.parse(result);
  } catch(err) {
    console.log('Not valid JSON returned from jq', result);
    return result;
  }
}

const echoify = (jsonObject) => {
  return JSON.stringify(jsonObject).replace(/"/g, "\\\"");
}

module.exports = {
  compareResults,
  jq,
  parseJSONFile
}