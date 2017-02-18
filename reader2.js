/*
 * Taking reader1 one step closer --
 * Reading a yaml file and writing it out to a json file
 */
 
const FS = require('fs')
var file = 'Policy.yaml';

// native is a JS Object
// Loads and parses file into the native object
native = require('js-yaml').safeLoad(FS.readFileSync(file, 'utf8'));

//writes the object out to a file by the same name as JSON
FS.writeFileSync(require('path').basename(file, '.yaml')+'.json', JSON.stringify(native));

// play around with the JSON object
var properties = Object.getOwnPropertyNames(native.properties);
//console.log(properties[2]);
//for (property in properties) {
//    console.log(property + ' : ' )
//}
properties.forEach( (value, index, arr) => {
    console.log(arr[index] + ' : ' + native.properties[value]['type']);
    } 
);
  