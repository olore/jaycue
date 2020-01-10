const jqx = require('../jqx');
const fs = require('fs');
const exec = require('child_process').execSync;

describe('Basic Filters', () => {

  test('Identity', () => {
    let query = '.';
    let jsonFile = __dirname + '/mocks/simple.json';
    compareResults(jsonFile, query);
  });

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
  })

  describe('Optional Object Identifier-Index', ()=> {
    test('Optional Object Identifier-Index', () => {
      let query = '.foo?';
      let json = {"foo": 42, "bar": "less interesting data"};

      expect(jqx(json, query)).toEqual(jq(json, query));
    });

    test('Optional Object Identifier-Index 2', () => {
      let query = '.foo?';
      let json = {"notfoo": true, "alsonotfoo": false};

      // when jq returns null, we return undefined as it's more idiomatic in JS
      expect(jqx(json, query)).toEqual(undefined);
      expect(jq(json, query)).toEqual(null);
    });

    test('Optional Object Identifier-Index 3', () => {
      let query = '.["foo"]?';
      let json = {"foo": 42, "bar": "less interesting data"};

      expect(jqx(json, query)).toEqual(jq(json, query));
    });

    test.skip('Optional Object Identifier-Index 3', () => {
      let query = '.["foo"?]';
      let json = [1,2]; // this isn't JSON, should we handle this?

      expect(jqx(json, query)).toEqual(jq(json, query));
    });
  });

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

  describe('Array/String Slice', () => {
    test('Array slice with start/end', () => {
      let query = '.[2:4]';
      let json = ["a","b","c","d","e"];
      expect(jqx(json, query)).toEqual(jq(json, query));
    })

    test('Array slice with end only', () => {
      let query = '.[:3]';
      let json = ["a","b","c","d","e"];
      expect(jqx(json, query)).toEqual(jq(json, query));
    })

    test('Array slice with negative end only', () => {
      let query = '.[:-3]';
      let json = ["a","b","c","d","e"];
      expect(jqx(json, query)).toEqual(jq(json, query));
    })

    test('Array slice with start only', () => {
      let query = '.[-2:]';
      let json = ["a","b","c","d","e"];
      expect(jqx(json, query)).toEqual(jq(json, query));
    })

    test('Array slice with positive start only', () => {
      let query = '.[2:]';
      let json = ["a","b","c","d","e"];
      expect(jqx(json, query)).toEqual(jq(json, query));
    })
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

function compareResults(jsonFile, query) {
  let jsonFileContents = fs.readFileSync(jsonFile).toString();
  let jsonObject = JSON.parse(jsonFileContents);

  expect(
    jqx(jsonObject, query))
    .toEqual( 
      jq(jsonObject, query)
    );
}

const echoify = (jsonObject) => {
  return JSON.stringify(jsonObject).replace(/"/g, "\\\"");
}

// run actual jq command 
function jq(jsonObject, query) {
  let command = `echo "${echoify(jsonObject)}" | jq '${query}'`;
  let result = exec(command).toString();
  return JSON.parse(result);
}