const { compareResults } = require('./test-helper')

describe('Basic Filters', () => {

  test('Identity', () => {
    let filter = '.';
    let jsonFile = __dirname + '/mocks/simple.json';
    compareResults(jsonFile, filter);
  });

});

describe('First tests', () => {
  test('can get top level string', () => {
    let filter = '.versionString';
    let jsonFile = __dirname + '/mocks/simple.json';
    compareResults(jsonFile, filter);
  });

  test('can get top level number', () => {
    let filter = '.version';
    let jsonFile = __dirname + '/mocks/simple.json';
    compareResults(jsonFile, filter);
  });

  test('can get 2nd level string', () => {
    let filter = '.name.full';
    let jsonFile = __dirname + '/mocks/simple.json';
    compareResults(jsonFile, filter);
  });

  test('can get an object', () => {
    let filter = '.name';
    let jsonFile = __dirname + '/mocks/simple.json';
    compareResults(jsonFile, filter);
  });

});
