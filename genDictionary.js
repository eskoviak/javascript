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
var basePath = '/eskoviak/ifbdataapi/feature/EWS-870/swagger/models/';
var file = '/Policy.yaml';

// set up options object to be passed in
const options = {
	hostname : 'raw.githubusercontent.com',
	path : '',
	method : 'GET',
	auth : 'eskoviak:route66'
}


// fs.readFile('filelist.txt', 'utf8', (err, data) => {
// 	if (err) throw err;
// 	for (line in data) {
// 		console.log(line);
// 	}
// });

// create output write stream
outStream = fs.createWriteStream('dataDict.csv');

const rl = readline.createInterface( {
	input: fs.createReadStream('filelist.txt')
});

rl.on('line', (line) => {
	options.path = basePath + line;
	console.log(options.path);
	getResource(line, responseCB);
})


function getResource(modelName, responseCB) {
	return https.get( options,
	  function(response) {
		var body = '';
		response.on('data', function(d) {
			//console.log(d);
			body += d;
		});
		response.on('end', function() {
			if (body != '') {
				responseCB(modelName, yaml.safeLoad(body));
			}
		});
	});
}

function responseCB(modelName, data) {
	/*
		data is a native js object
	*/
	//console.log(data.properties);
	var dictionaryEntry = new Object();
	var objProperty = new Object();
	for (objProperty in data.properties) {
		// //console.log(property);
		// dictionaryEntry["name"] = objProperty;
		// dictionaryEntry["description"] = data.properties[objProperty].description;
		// dictionaryEntry["type"]= data.properties[objProperty].type;
		// console.log(dictionaryEntry);
		if (typeof data.properties[objProperty].type != 'undefined') {
			objType = data.properties[objProperty].type;
		} else {
			objType = 'null';
		}

		if (typeof data.properties[objProperty].description != 'undefined') {
			objDesc = data.properties[objProperty].description;
		} else {
			objDesc = 'null\n';
		}

		outStream.write(modelName+'|'+objProperty+'|'+objType+'|'+objDesc);
	}
}

