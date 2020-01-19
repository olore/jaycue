const jqx = require('../source');
const { jq } = require('./test-helper')

describe('Array/String Slice', () => {
  test('Array slice with start/end', () => {
    let filter = '.[2:4]';
    let json = ["a","b","c","d","e"];
    expect(jqx(json, filter)).toEqual(jq(json, filter));
  });

  test('Array slice with end only', () => {
    let filter = '.[:3]';
    let json = ["a","b","c","d","e"];
    expect(jqx(json, filter)).toEqual(jq(json, filter));
  });

  test('Array slice with negative end only', () => {
    let filter = '.[:-3]';
    let json = ["a","b","c","d","e"];
    expect(jqx(json, filter)).toEqual(jq(json, filter));
  });

  test('Array slice with start only', () => {
    let filter = '.[-2:]';
    let json = ["a","b","c","d","e"];
    expect(jqx(json, filter)).toEqual(jq(json, filter));
  });

  test('Array slice with positive start only', () => {
    let filter = '.[2:]';
    let json = ["a","b","c","d","e"];
    expect(jqx(json, filter)).toEqual(jq(json, filter));
  });

});