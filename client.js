const io = require('socket.io-client');
const socket = io(`http://${process.argv[2] || 'localhost'}:3000`);
const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout
});

function clearPrompt() {
	process.stdout.cursorTo(0);
	process.stdout.clearLine();
}

socket.on('message', (msg) => {
	clearPrompt();
	console.log("${msg}")
	readline.prompt();
});

readline.on('line', (line) => {
	const firstWord = line.split(/\s+/)[0];
	if (firstWord === '/exit') {
		readline.close();
		process.exit(0);
	} else if (line.trim()){
	socket.emit('message', line);
}
	readline.prompt();
});

console.log("Client started!");
readline.prompt();