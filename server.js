const io = require('socket.io');
const server = io();

server.on('connection', (client) => {
	console.log(`Client with id: $(client.id), connected!`);
	client.on('message', (msg) => {
		console.log(msg);
		client.broadcast.emit('message', msg);
	})
});

console.log("Server started!");
server.listen(3000);