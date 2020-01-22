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