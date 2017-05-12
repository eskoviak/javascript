require('fs').readFile('vehicle.xml', (err, data) = > {
    require('xml2js').parseString(data, (err, result) = > {
        if (err) throw err;
        console.dir(require('util').inspect(result, false, null));
    })
});