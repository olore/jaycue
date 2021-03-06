<h1 align="center">
  <br>
	<img width="320" src="media/logo.png" alt="jaycue">
  <br>
  <br>
</h1>

[![npm version](https://badgen.net/npm/v/jaycue)](https://www.npmjs.com/package/jaycue)
[![npm dependents](https://badgen.net/npm/dependents/jaycue)](https://www.npmjs.com/package/jaycue?activeTab=dependents)
[![Downloads](https://badgen.net/npm/dt/jaycue)](https://www.npmjs.com/package/jaycue)
[![run on repl.it](http://repl.it/badge/github/olore/jaycue)](https://repl.it/github/olore/jaycue)

jaycue is my little side project that mimics the best parts [jq](https://stedolan.github.io/jq/) in pure JavaScript. I wrote a blog post about it on [dev.to](https://dev.to/olore/introducing-jaycue-jq-in-your-js-1c1o)

I am TDD'ing this to get some practice, using the [jq documentation](https://stedolan.github.io/jq/manual/#Basicfilters), and hopefully make something useful. Please see below for some similar, more mature, great projects built around `jq`.


## Install

```console
$ npm install jaycue
```

## Usage

```js
const jq = require('jaycue');

console.log(jq({foo: 123}, '.foo'));
123
```

## Supported Filters

### Basic Filters
```javascript
{
  "value": 42,
  "text": "less interesting data",
  "name": {
    "first": "Brian"
    "last": "Olore"
  }
}
```

filter          | output
--------------- | ------
`.`             | `{ "value": 42, "text": "less interesting data","name": { "first": "Brian" "last": "Olore" } }` (object)
`.value`        | `42` (number)
`.text`         | `less interesting data` (string)
`.["text"]`     | `less interesting data` (string)
`.name`         | `"name": { "first": "Brian" "last": "Olore" }` (object)
`.name.first`   | `Brian` (string)
`.missing`      | `undefined`
`.missing?`     | `null`
`.["missing"]?` | `null`

### Array Filters
```javascript
["a","b","c","d","e"];
```

filter  | output
------  | ------
`.[]`   | `"a","b","c","d","e"` (not json)
`.[0]`  | `a`
`.[-2]` | `d`

### Array Slicing Filters
filter   | output
-------- | ------
`.[2:4]` | `["c", "d"]`
`.[:3]`  | `["a", "b", "c"]`
`.[:-3]` | `["a", "b"]`
`.[-2:]` | `["d", "e"]`
`.[2:]`  | `["c", "d", "e"]`

### Select Function
```javascript
[
  {"id": "first", "val": 1},
  {"id": "second", "val": 2}
]
```

filter                                   | output
-----------------------------------      | -------------------
`.[] \| select(.id == "second")`         | `{"id": "second", "val": 2}`
`.[] \| select(.id == "second") \| .val` | `2` (number)
`.[] \| select(.id == "second") .val`    | `2` (number)
`.[] \| select(.id != "second") .val`    | `1` (number)

## Testing
~~Must have `jq` installed to run tests~~
`jq` is now supplied by [node-jq](https://npmjs.org/package/node-jq)

As previously mentioned, all code has been test-driven. The test-helper provides a way to call the actual `jq`, making it easy to compare results.

Running tests
```shell script
npm test
```

## Notes
Read the [jq Language Description](https://github.com/stedolan/jq/wiki/jq-Language-Description)

Check out this project which is a JavaScript wrapper around jq: https://github.com/sanack/node-jq. Here are some more cool jq projects: https://github.com/fiatjaf/awesome-jq

## Thanks
* Logo by Joseph Olore
