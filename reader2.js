/*
 * Taking reader1 one step closer --
 * Reading a yaml file and writing it out to a json file
 */
 
const FS = require('fs');
var file = 'Policy.yaml';

native = require('js-yaml').safeLoad(FS.readFileSync(file, 'utf8'));
FS.writeFileSync(require('path').basename(file, '.yaml')+'.json', JSON.stringify(native));
//console.log(Object.getOwnPropertyNames(native.properties));
//console.log(native.properties['id']['type']);
var properties = Object.getOwnPropertyNames(native.properties);
//console.log(properties[2]);
//for (property in properties) {
//    console.log(property + ' : ' )
//}
properties.forEach( (value, index) => {
    console.log(native.properties[value]);
} );
  