/*
 * Create a data-dictionary object by
 * Reading a yaml file and writing it out to a json file
 */

const FS = require('fs')
var file = 'Policy.yaml';
var dict = {
};

// native is a JS Object
// Loads and parses file into the native object
native = require('js-yaml').safeLoad(FS.readFileSync(file, 'utf8'));

var properties = Object.getOwnPropertyNames(native.properties);

properties.forEach((value, index, arr) = > {
    dict.provenance = "";
    dict.entry = arr[index];
    dict.definition = native.properties[value][ 'description'];
    dict.jsonDataType = native.properties[value][ 'type'];
    dict.usedIn = require('path').basename(file, '.yaml')
    console.log(dict);
});