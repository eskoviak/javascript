/*
A demo file which reads a yaml file from a remote github repository, and
converts it to JSON

author:  eskoviak@gmail.com
version: 0.9

 */
var https = require('https');
var yaml = require('js-yaml');
var basePath = '/eskoviak/ifbdataapi/feature/EWS-870/swagger/models';
var file = '/Policy.yaml';

// set up options object to be passed in
const options = {
    hostname: 'raw.githubusercontent.com',
    path: '',
    method: 'GET',
    auth: 'eskoviak:route66'
}

options.path = basePath + file;

function getResource(responseCB) {
    return https.get(options,
    function (response) {
        var body = '';
        response.on('data', function (d) {
            //console.log(d);
            body += d;
        });
        response.on('end', function () {
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
    //console.log(data.properties);
    var dictionaryEntry = new Object();
    var objProperty = new Object();
    for (objProperty in data.properties) {
        //console.log(property);
        dictionaryEntry[ "name"] = objProperty;
        dictionaryEntry[ "description"] = data.properties[objProperty].description;
        dictionaryEntry[ "type"] = data.properties[objProperty].type;
        console.log(dictionaryEntry);
    }
}

getResource(responseCB);