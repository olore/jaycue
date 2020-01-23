<h1 align="center">
  <br>
  jaycue
  <br>
  <br>
</h1>

jaycue is my little side project that mimics the best parts jq https://stedolan.github.io/jq/

I am TDD'ing this to get some practice, using the `jq` documentation, and hopefully make something useful. Please see below for some similar, more mature, great projects.


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

## Development
Must have `jq` installed to run tests


## Notes
I really need some kind of parser for the query, the current regex works, but it's not going to scale.

https://github.com/stedolan/jq/wiki/jq-Language-Description

Check out this project which is a JavaScript wrapper around jq: https://github.com/sanack/node-jq. Here are some more cool jq projects: https://github.com/fiatjaf/awesome-jq


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

