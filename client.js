const io = require('socket.io-client');
const socket = io('http://localhost:3000');
const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout
});

socket.on('message', (msg) => {
	console.log('>> $msg');
});

console.log("Client started!");
readline.on('line', (line) => {
socket.emit('message', line);
readline.prompt();
});
readline.prompt();