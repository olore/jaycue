const jqx = require('../jqx');
const fs = require('fs');
const exec = require('child_process').execSync;

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
  let jsonObject = JSON.parse(fs.readFileSync(jsonFile));
  expect(
    jqx(jsonObject, query))
    .toEqual( 
      jq(jsonFile, query)
    );
}

// run actual jq command 
function jq(jsonFile, query) {
  let command = `cat ${jsonFile} | jq ${query}`;
  console.log(command)

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