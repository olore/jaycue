const jqx = require('../jqx');
const fs = require('fs');
const exec = require('child_process').execSync;

test('Identity', () => {
  let query = '.';
  let jsonFile = __dirname + '/mocks/simple.json';
  compareResults(jsonFile, query);
});


test('Object Identifier-Index', () => {
  let query = '.foo';
  let json = {"foo": 42, "bar": "less interesting data"}
  expect(jqx(json, query)).toEqual(jq(json, query));
});


test('can get top level string', () => {
  let query = '.versionString';
  let jsonFile = __dirname + '/mocks/simple.json';
  compareResults(jsonFile, query);
});

test('can get top level number', () => {
  let query = '.version';
  let jsonFile = __dirname + '/mocks/simple.json';
  compareResults(jsonFile, query);
});

test('can get 2nd level string', () => {
  let query = '.name.full';
  let jsonFile = __dirname + '/mocks/simple.json';
  compareResults(jsonFile, query);
});

test('can get an object', () => {
  let query = '.name';
  let jsonFile = __dirname + '/mocks/simple.json';
  compareResults(jsonFile, query);
});

function compareResults(jsonFile, query) {
  let jsonFileContents = fs.readFileSync(jsonFile).toString();
  let jsonObject = JSON.parse(jsonFileContents);

  expect(
    jqx(jsonObject, query))
    .toEqual( 
      jq(jsonObject, query)
    );
}

const echoify = (jsonObject) => {
  return JSON.stringify(jsonObject).replace(/"/g, "\\\"");
}

// run actual jq command 
function jq(jsonObject, query) {
  let command = `echo "${echoify(jsonObject)}" | jq ${query}`;

  let result = exec(command).toString();
  
  if (!result.includes(':')) { // not an obj
    result = result.replace(/\"/g, '').trim();
    if (result === Number(result).toString()) {
      return Number(result)
    }
    return result;
  }

  return JSON.parse(result);
}