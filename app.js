const socketPlug = require('./socket_plug');
const websocketPlug = require('./websocket_plug');


let ss = socketPlug.start({'host':'localhost', 'port':5000}, process.stdin, process.stdout);
//websocketPlug.start({'url':'ws://localhost:3000'}, process.stdin, process.stdout);


process.stdin.resume();
