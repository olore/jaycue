const jqx = require('../source');
const { jq } = require('./test-helper')

describe('Array Index', () => {
  test('Array Index', () => {
    let query = '.[0]';
    let json = [{"name":"JSON", "good":true}, {"name":"XML", "good":false}];

    expect(jqx(json, query)).toEqual(jq(json, query));
  });

  test('Array Index 2', () => {
    let query = '.[2]';
    let json = [{"name":"JSON", "good":true}, {"name":"XML", "good":false}];

    expect(jqx(json, query)).toEqual(undefined);
    expect(jq(json, query)).toEqual(null);
  });

  test.skip('Array Index 3', () => {
    let query = '.[-2]';
    let json = [1,2,3]; // not JSON
    expect(jqx(json, query)).toEqual(jq(json, query));
  });

  test('Negative Index', () => {
    let query = '.[-1]';
    let json = [{"name":"JSON", "good":true}, {"name":"XML", "good":false}];
    expect(jqx(json, query)).toEqual(jq(json, query));
  });

});