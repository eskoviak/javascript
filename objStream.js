//const Writable = require('stream').Writable;

class objectWriteStream extends require('stream').Writable {
  constructor(options) {
    if (typeof options === 'undefined' ) var options={};
    options.objectMode = 'true';
    super(options);
  }

  _write(chunk, enc, cb) {
    console.log(JSON.stringify(chunk));
    cb();
  }
}

var myObj = {
  firstName: 'Ed', lastName: 'Skoviak'
  };

var outStream = new objectWriteStream();

outStream.write(myObj);
