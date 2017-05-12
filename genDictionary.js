/*
Reads a list of yaml files to read from a repository, and build
a data dictionary of the property elements

author:  eskoviak@gmail.com
version: 0.9

 */
var fs = require('fs');
var readline = require('readline');
var https = require('https');
var yaml = require('js-yaml');
var basePath = '/eskoviak/ifbdataapi/develop/swagger/models/';
var dictionary = new Object();

// OPTIONS Declarations
const getOptions = {
    hostname: 'raw.githubusercontent.com',
    path: '', // will be built on the fly
    method: 'GET',
    auth: 'eskoviak:route66'
};

const outOptions = {
    flags: 'w'
};

const inOptions = {
    flags: 'r'
};

// create i/o streams
outStream = fs.createWriteStream('dataDict.json', outOptions);
inStream = fs.createReadStream('filelist.txt', inOptions);
const rl = readline.createInterface({
    input: inStream
});

// Event handlers
// outStream.on('open', () => {
// 	console.log('in outStream open');
// 	outStream.write('{ "api-model-properties" :  {\n');
// })

rl.on('line', (line) => {
    getOptions.path = basePath + line;
    //console.log(getOptions.path);
    getResource(line, responseCB);
})

inStream.on('end', () => {
    console.log('waiting for Godot...');
    // okay, so this is a hack, but it works for now
    // need to wait until the spawned threads finish updating the dictionary
    setTimeout(cleanup, 10000);
})

function cleanup() {
    outStream.write(JSON.stringify(dictionary));
    outStream.close();
}

// outStream.on('finish', () => {
// 	outStream.write('\n}');
// })
/*
This function calls the repository and gets the raw file specified.
It then processes it and extracts information about the properties, sending that
data to the repsonseCB function
 */
function getResource(modelName, responseCB) {
    return https.get(getOptions, (response) => {
        var body = '';
        response.on('data', (d) => {
            body += d;
        });
        response.on('end', () => {
            if (body != '') responseCB(modelName, yaml.safeLoad(body));
        });
    });
}

function responseCB(modelName, data) {
    /*
    data is a native js object
     */
    //console.log(data.properties);
    // const eol = /\n$/;
    var value = new Object();
    for (objProperty in data.properties) {
        
        // if (typeof data.properties[objProperty].type != 'undefined') {
        // 	objType = data.properties[objProperty].type;
        // } else {
        // 	objType = 'null';
        // }
        
        // if (typeof data.properties[objProperty].description != 'undefined') {
        // 	objDesc = data.properties[objProperty].description;
        // } else {
        // 	objDesc = 'null';
        // }
        // if ( eol.test(objDesc) ) objDesc = objDesc.substring(0, objDesc.lastIndexOf('\n'));
        
        value[ 'type'] = data.properties[objProperty].type;
        value[ 'model'] = modelName;
        value[ 'description'] = data.properties[objProperty].description;
        //value = '{ "type" : "' + objType + '", "model" : "' + modelName + '", "description" : "' + objDesc + '"}';
        //console.log(value);
        
        updateDictionary(objProperty, value);
        //dictionary[objProperty] = value;
        //console.log(dictionary);
        // outStream.write('\t"'+objProperty+'" : {\n\t\t"type" : "' +
        // 	objType + '",\n\t\t' +
        // 	'"model" : "' + modelName + '",\n\t\t"description" : "' +
        // 	objDesc + '"},\n');
        //outStream.write(modelName+'|'+objProperty+'|'+objType+'|'+objDesc);
    }
    
    function updateDictionary(key, value) {
        dictionary[key] = value;
    }
}