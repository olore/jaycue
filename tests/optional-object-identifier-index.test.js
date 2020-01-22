const jaycue = require('../source');
const { jq } = require('./test-helper')

describe('Optional Object Identifier-Index', ()=> {

  test('Optional and found', () => {
    let filter = '.foo?';
    let json = {"foo": 42, "bar": "less interesting data"}
    expect(jaycue(json, filter)).toEqual(jq(json, filter));
  });

  test('Optional not found', () => {
    let filter = '.foo?';
    let json = {"notfoo": true, "alsonotfoo": false};
    expect(jaycue(json, filter)).toEqual(jq(json, filter));
  });

  test('Optional with brackets', () => {
    let filter = '.["foo"]?';
    let json = {"foo": 42};
    expect(jaycue(json, filter)).toEqual(jq(json, filter));
  });

  test.skip('Optional within brackets', () => {
    let filter = '[.foo?]';
    let json = [1,2];
    expect(jaycue(json, filter)).toEqual(jq(json, filter));
  });
});