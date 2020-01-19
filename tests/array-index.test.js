const jqx = require('../source');
const { jq } = require('./test-helper')

describe('Array Index', () => {
  test('Array Index', () => {
    let filter = '.[0]';
    let json = [{"name":"JSON", "good":true}, {"name":"XML", "good":false}];

    expect(jqx(json, filter)).toEqual(jq(json, filter));
  });

  test('Array Index 2', () => {
    let filter = '.[2]';
    let json = [{"name":"JSON", "good":true}, {"name":"XML", "good":false}];

    expect(jqx(json, filter)).toEqual(undefined);
    expect(jq(json, filter)).toEqual(null);
  });

  test.skip('Array Index 3', () => {
    let filter = '.[-2]';
    let json = [1,2,3]; // not JSON
    expect(jqx(json, filter)).toEqual(jq(json, filter));
  });

  test('Negative Index', () => {
    let filter = '.[-1]';
    let json = [{"name":"JSON", "good":true}, {"name":"XML", "good":false}];
    expect(jqx(json, filter)).toEqual(jq(json, filter));
  });

});