var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();

xhr.addEventListener("readystatechange", processRequest, false);

xhr.open('GET', 'http://bitbucket.infarmbureau.com:7990/projects/ES/repos/enterpriseapidatamodel/raw/swagger/bundles/system-transformer-1.0.0.json?at=refs%2Fheads%2Ffeature%2FEWS-870', true );

xhr.send();

function processRequest(e) {

	if (xhr.readyState == 4 && xhr.status == 200) {
		var response = JSON.parse(xhr.responseText);
		console.log (response);
	} else {
	  console.log(xhr.readyState);
	}
}
