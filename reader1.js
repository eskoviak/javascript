var fs = require('fs');
var parser = require('swagger-parser');
var yaml = require('yaml-js');
/*
parser.validate('Policy.yaml', 
  (err, api) => {
      if (err) {
          throw err;
      } else {
          console.log(JSON.stringify(api));
      }
  }
);
*/

/*fs.readFile('Policy.yaml', 'utf8',
    (err, data) => {
        if(err) {
            throw err;
        } else {
            console.log(JSON.stringify('{'+data+'}'));
        }
    });
*/

var native = yaml.parse(fs.readFileSync('Policy.yaml', 'utf8'));
console.log(JSON.stringify(native));
