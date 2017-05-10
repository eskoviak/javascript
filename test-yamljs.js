// Test yamljs

YAML = require('yamljs');

yamlObj = YAML.load('Policy.yaml');
propObj = yamlObj["properties"];

//console.log(propObj["id"]);

/*
console.log (nativeObject.properties);
console.log("======");

for (property in nativeObject.properties) {
	console.log( property, nativeObject[property]);
}
*/

for (key in propObj) {
	//console.log( key );
	//console.log(propObj[key]['type']);
	var type=propObj[key]['type'];
	//console.log(typeof type);
	var typeStr = "", items = "";
	switch (typeof type){
		case "string":
		  if(type === "array") {
		  	items = propObj[key]['items'];
		  	//console.log(items);
		  	typeStr = "array : $" + parseRef(items);
		  } else {
		  	typeStr = "string";
		  }
		  break;
		case "object":
		  typeStr = type[0];
		  break;
		case "undefined":
		  typeStr = "somethingelse";
		  break;	
		default:
		  typeStr = "default";
	}
	console.log(key, typeStr);

}

function parseRef(refObj){
	return refObj["$ref"];
}

