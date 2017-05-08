// File reader 
require('fs').readFile('XML/books.xml', 'utf8',
  (err, data) => {
      if (err) throw err;
      console.log(data);
  });
  
  console.log("Brought to you by Textastic");