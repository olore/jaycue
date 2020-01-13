const fs = require('fs');
const exec = require('child_process').execSync;

const jqx = require('../jqx');

function compareResults(jsonFile, query) {
  let jsonFileContents = fs.readFileSync(jsonFile).toString();
  let jsonObject = JSON.parse(jsonFileContents);

  expect(
    jqx(jsonObject, query))
    .toEqual( 
      jq(jsonObject, query)
    );
}

// run actual jq command 
function jq(jsonObject, query) {
  let command = `echo "${echoify(jsonObject)}" | jq '${query}'`;
  let result = exec(command).toString();
  return JSON.parse(result);
}

const echoify = (jsonObject) => {
  return JSON.stringify(jsonObject).replace(/"/g, "\\\"");
}

module.exports = {
  compareResults,
  jq
}