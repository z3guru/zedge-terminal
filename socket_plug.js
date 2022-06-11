const net = require('net')

let client = new net.Socket();
let __options;

client.on('connect', function() {
	// connected...
	console.log('connected');
});

client.on('data', function(data) {
	console.log('ondata:' + data);
});

client.on('close', function() {
	console.log('onclose');
	setTimeout(reconnect, 3000);
});

client.on('end', function() {
	console.log('onend');
	client.destroy();
});

client.on('error', function(error) {
	console.log('onerror:' + error);
});

function reconnect()
{
	client.connect(__options);
}

module.exports = {
	start: function(options, pipeIn, pipeOut) { 
		// options has 'host', 'port'
		if (pipeIn) pipeIn.pipe(client);
		//if (pipeOut) client.pipe(pipeOut);

		__options = options;
		client.connect(__options);

		return client;
	}
}

