const WebSocket = require("ws");
const { Duplex } = require('stream');

//let __wsc;

class WebSocketStream extends Duplex
{
	constructor(url, protocols, options)
	{
		super();
		this.url = url;
		this.protocols = protocols;
		this.options = options;
	}

	_read(size)
	{
	}

	_write(chunk, encoding, callback)
	{
		console.log('writing:' + chunk);
		try { this.wsc.send(chunk); } catch(e) { }
		console.log('written:' + callback);
		callback();
	}

	run()
	{
		this.wsc = new WebSocket(this.url);
		this.wsc.on('open', this.onopen.bind(this));
		this.wsc.on('error', this.onerror.bind(this));
		this.wsc.on('close', this.onclose.bind(this));
		this.wsc.on('message', this.onmessage.bind(this));
	}
	
	onopen() 
	{
		console.log('ws:onopen');
	} 
	
	onerror(error)
	{
		console.log("ws:onerror: " + error);
	}

	onclose() 
	{
		console.log('ws:onclose');
		setTimeout(this.run.bind(this), 3000);
	}

	onmessage(message)
	{
		console.log("Received: '" + message + "'");
		this.push(message);
	}
}


module.exports = {
	start: function(options, pipeIn, pipeOut) { 
		// options has 'url'
		let stream = new WebSocketStream(options.url, options.protocols, options);

		if (pipeIn) pipeIn.pipe(stream);
		if (pipeOut) stream.pipe(pipeOut);
		stream.run();

		return stream;
	}
}
