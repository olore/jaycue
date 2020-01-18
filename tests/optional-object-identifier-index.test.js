const jqx = require('../source');
const { jq } = require('./test-helper')

describe('Object Identifier-Index', ()=> {

  test('Object Identifier-Index 1', () => {
    let query = '.foo';
    let json = {"foo": 42, "bar": "less interesting data"}
    expect(jqx(json, query)).toEqual(jq(json, query));
  });

  test('Object Identifier-Index 2', () => {
    let query = '.foo';
    let json = {"notfoo": true, "alsonotfoo": false};

    // when jq returns null, we return undefined as it's more idiomatic in JS
    expect(jqx(json, query)).toEqual(undefined);
    expect(jq(json, query)).toEqual(null);
  });

  test('Object Identifier-Index 3', () => {
    let query = '.["foo"]';
    let json = {"foo": 42};

    expect(jqx(json, query)).toEqual(jq(json, query));
  });

});