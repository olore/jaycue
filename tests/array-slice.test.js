const jqx = require('../jqx');
const { jq } = require('./test-helper')

describe('Array/String Slice', () => {
  test('Array slice with start/end', () => {
    let query = '.[2:4]';
    let json = ["a","b","c","d","e"];
    expect(jqx(json, query)).toEqual(jq(json, query));
  });

  test('Array slice with end only', () => {
    let query = '.[:3]';
    let json = ["a","b","c","d","e"];
    expect(jqx(json, query)).toEqual(jq(json, query));
  });

  test('Array slice with negative end only', () => {
    let query = '.[:-3]';
    let json = ["a","b","c","d","e"];
    expect(jqx(json, query)).toEqual(jq(json, query));
  });

  test('Array slice with start only', () => {
    let query = '.[-2:]';
    let json = ["a","b","c","d","e"];
    expect(jqx(json, query)).toEqual(jq(json, query));
  });

  test('Array slice with positive start only', () => {
    let query = '.[2:]';
    let json = ["a","b","c","d","e"];
    expect(jqx(json, query)).toEqual(jq(json, query));
  });

});