/*
Reads a list of yaml files to read from a repository, and build
a data dictionary of the property elements

author:  eskoviak@gmail.com
version: 0.9

 */
class objectWriteStream extends require('stream').Writable {

  constructor(options) {
    if (typeof options === 'undefined' ) var options={};
    options.objectMode = 'true';
    super(options);
  }

  _write(chunk, enc, cb) {
    //console.log(JSON.stringify(chunk));
    cb();
  }
}



var fs = require('fs');
var readline = require('readline');
var https = require('https');
var yaml = require('js-yaml');
var basePath = '/eskoviak/ifbdataapi/develop/swagger/models/';
var items = [];

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
outObjStream = new objectWriteStream(); 
inStream = fs.createReadStream('filelist.txt', inOptions);
const rl = readline.createInterface({
    input: inStream
});

rl.on('line', (line) => {
    getOptions.path = basePath + line;
    //console.log(getOptions.path);
    getResource(line, responseCB);
})

inStream.on('end', () => {
  setTimeout( writeFile, 10000);
})

function writeFile() {
  outStream.write(JSON.stringify({"dictionaryEntries":items}));
}
//function addItem(item) {
//  items.push(item);
//}

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
    //var value = {};
    for (var objProperty in data.properties) {
        value = {};
	value[ 'type'] = data.properties[objProperty].type;
        value[ 'model'] = modelName;
        value[ 'description'] = data.properties[objProperty].description;
        // this is a hack but it works for now
        var temp = {};
        temp[ objProperty ] = value;
        //if( !outObjStream.write( temp )) console.log(" ++++ object outstream full");
        items.push(temp);       
    }
}    

