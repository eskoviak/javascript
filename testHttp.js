var http = require('http');

// set up some parameters
var scheme = 'http:';
var authority = 'bitbucket.infarmbureau.com';
var port = 7990;
var path = '/projects/ES/repos/enterpriseapidatamodel/raw/swagger/bundles';
var resource = '/system-transformer-1.0.0.json';
var query = 'at=refs/heads/features/EWS-870';

function getBBResource(responseCB) {
	return http.get( 'http://bitbucket.infarmbureau.com:7990/projects/ES/repos/enterpriseapidatamodel/raw/swagger/bundles/system-telematics-1.0.0.json?at=refs%2Fheads%2Ffeature%2FEWS-870',
	  function(response) {
		var body = '';
		response.on('data', function(d) {
			//console.log(d);
			body += d;
		});
		response.on('end', function() {
			if (body != '') {
				var parsed = JSON.parse(body);
				responseCB(parsed);
			}
		});
	});
}

function responseCB(data) {
	console.log(data);
}

getBBResource(responseCB);