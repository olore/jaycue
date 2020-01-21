const jqx = require('../source');
const { jq } = require('./test-helper')

describe('select', ()=> {

  test('.[]', () => {
    let filter = '.[]';
    let json = [{"id": "first", "val": 1}, {"id": "second", "val": 2}];
    let expected = jq(json, filter);
    let actual = jqx(json, filter);

    // this isn't great, because .[] doesn't return valid JSON
    // and jq pretty prints it
    expect(expected.replace(/\s+/g, ''))
      .toEqual(actual.replace(/\s+/g, ''));
  });

  test('select', () => {
    let filter = '.[] | select(.id == "second")';
    let json = [{"id": "first", "val": 1}, {"id": "second", "val": 2}];
    expect(jqx(json, filter)).toEqual(jq(json, filter));
  });

  test('select followed by another piped filter', () => {
    let filter = '.[] | select(.id == "second") | .val';
    let json = [{"id": "first", "val": 1}, {"id": "second", "val": 2}];
    expect(jqx(json, filter)).toEqual(jq(json, filter));
  });

  test('select followed by another filter without pipe', () => {
    let filter = '.[] | select(.id == "second") .val';
    let json = [{"id": "first", "val": 1}, {"id": "second", "val": 2}];
    expect(jqx(json, filter)).toEqual(jq(json, filter));
  });

  test('select not equal', () => {
    let filter = '.[] | select(.id != "second") .val';
    let json = [{"id": "first", "val": 1}, {"id": "second", "val": 2}];
    expect(jqx(json, filter)).toEqual(jq(json, filter));
  });
});