const jqx = require('../source');
const { jq } = require('./test-helper')

describe('select', ()=> {

  test('.[]', () => {
    let query = '.[]';
    let json = [{"id": "first", "val": 1}, {"id": "second", "val": 2}];
    let expected = jq(json, query);
    let actual = jqx(json, query);

    // this isn't great, because .[] doesn't return valid JSON
    // and jq pretty prints it
    expect(expected.replace(/\s+/g, ''))
      .toEqual(actual.replace(/\s+/g, ''));

  });
  test('select', () => {
    let query = '.[] | select(.id == "second")';
    let json = [{"id": "first", "val": 1}, {"id": "second", "val": 2}];
    expect(jqx(json, query)).toEqual(jq(json, query));
  });

});