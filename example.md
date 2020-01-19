Insiration for this library came from a recent example at work where a `lodash.get` was used with a `reduce` to get a value. Here's the scenario:

We need to pull the `SSN` `number`, if it exists.

The JSON looked like this:
```json
{
  "applicants": [
    {
      "identities": [
        {
          "type": null,
          "number": null
        },
        {
          "type": "SSN",
          "number": "987651234"
        }
      ]
    }
  ]
}
```

This is the code that was written:

```javascript
const lastFour = get(data, 'submit.applicants[0].identities', [])
  .reduce((accume, identity) => {
    if (identity.type === 'SSN' && identity.number) {
      accum = identity.number;
    }
    return accum;
  }, '');
```

This is simplified in `jq` with:

```shell
$ cat test.json | jq '.applicants[0].identities[] | select(.type=="SSN") .number'
"987651234"
```

My hope is to provide a library function that will let us do this:

```javascript
const lastFour = jqx(data, '.applicants[0].identities[] | select(.type=="SSN") .number');
```