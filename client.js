const io = require('socket.io-client');
const socket = io(`http://${process.argv[2] || 'localhost'}:3000`);
const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout
});
let LOGGED_USER = '';

function clearPrompt() {
	process.stdout.cursorTo(0);
	process.stdout.clearLine();
}

socket.on('login', (username) => {
	clearPrompt()
	if (username) {
		readline.setPrompt(`${username}: `);
	} 
	else {
		console.log(">> LOGIN FAILED");
	}
	readline.prompt();
});

socket.on('message', (msg) => {
	clearPrompt();
	console.log('${msg}')
	readline.prompt();
});

readline.on('line', (line) => {

	const lineArgs = line.split(/\s+/);
	const firstWord = lineArgs[0];

	if (firstWord === '/exit') {	
		readline.close();
		process.exit(0);
	} 
	else if (firstWord === '/register') {
		socket.emit('register', {
			username: lineArgs[1], 
			password: lineArgs[2]
		}); 
	} 
	else if (firstWord === '/login') {
		if (lineArgs.length >= 3) {
			socket.emit('login', {
				username: lineArgs[1],
				password: lineArgs[2]
			});
		}
	}
	else if(firstWord === '/logout') {
		socket.emit('logout', LOGGED_USER);
		LOGGED_USER = '';
		readline.setPrompt('> ');
	}
	else if (line.trim()){
		socket.emit('message', line);
	}
	readline.prompt();
});

console.log("Client started!");
readline.prompt();