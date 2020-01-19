const jqx = require('../source');
const { jq } = require('./test-helper')

describe('Object Identifier-Index', ()=> {

  test('Object Identifier-Index 1', () => {
    let filter = '.foo';
    let json = {"foo": 42, "bar": "less interesting data"}
    expect(jqx(json, filter)).toEqual(jq(json, filter));
  });

  test('Object Identifier-Index 2', () => {
    let filter = '.foo';
    let json = {"notfoo": true, "alsonotfoo": false};

    // when jq returns null, we return undefined as it's more idiomatic in JS
    expect(jqx(json, filter)).toEqual(undefined);
    expect(jq(json, filter)).toEqual(null);
  });

  test('Object Identifier-Index 3', () => {
    let filter = '.["foo"]';
    let json = {"foo": 42};

    expect(jqx(json, filter)).toEqual(jq(json, filter));
  });

});