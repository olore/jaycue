const { compareResults } = require('./test-helper')

describe('Basic Filters', () => {

  test('Identity', () => {
    let query = '.';
    let jsonFile = __dirname + '/mocks/simple.json';
    compareResults(jsonFile, query);
  });

});

describe('First tests', () => {
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
});
