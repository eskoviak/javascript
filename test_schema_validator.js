var fs = require('fs');
var validate = require('jsonschema').validate;
var v = new validate();

console.log(v.validate(fs.readFileSync('clientAPIResp.json'), fs.readFileSync('client.json')));