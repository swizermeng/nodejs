const querystring = require('querystring')

const str = 'foo=bar&abc=xyz&abc=123'

console.log(querystring.parse(str)) //{ foo: 'bar', abc: [ 'xyz', '123' ] }

console.log(querystring.stringify({ foo: 'bar', baz: ['qux', 'quux'], corge: '' })) //foo=bar&baz=qux&baz=quux&corge=