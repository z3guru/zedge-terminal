const net = require('net')

let client = net.connect({port:1112, host:'127.0.0.1'}, function(client) {
	// connected...
	
});

client.on('data', function(data) {

});

client.on('end', function(data) {

});


