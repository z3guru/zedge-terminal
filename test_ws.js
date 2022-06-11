const WebSocketServer = require("ws").Server;
let wss = new WebSocketServer({ port: 3000 });

wss.on("connection", function(ws) {

	console.log("wss:connected")

	setInterval(()=>{ ws.send('?F\r\n'); }, 3000);

	ws.on("message", function(message) {
		console.log("WebServer:message: %s", message);
	});
});

