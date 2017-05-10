/*
    A demo file which reads a yaml file from a remote github repository, and 
    converts it to JSON

    author:  eskoviak@gmail.com
    version: 0.9

*/
var https = require('https');
var yaml = require('js-yaml');

// set up some parameters
const options = {
	hostname : 'raw.githubusercontent.com',
	path : '/eskoviak/ifbdataapi/feature/EWS-870/swagger/models/Policy.yaml',
	method : 'GET',
	auth : 'eskoviak:route66'
}

function getResource(responseCB) {
	return https.get( options,
	  function(response) {
		var body = '';
		response.on('data', function(d) {
			//console.log(d);
			body += d;
		});
		response.on('end', function() {
			if (body != '') {
				responseCB(yaml.safeLoad(body));
			}
		});
	});
}

function responseCB(data) {
	/*
		data is a native js object
	*/
	//console.log(data["properties"]);
	var dictionaryEntry = {};
	for (property in data["properties"]) {
		//console.log(property);
		dictionaryEntry["name"] = property;
		dictionaryEntry["description"] = data["properties"]["property"]["description"];
		console.log(dictionaryEntry);
	}
}

getResource(responseCB);