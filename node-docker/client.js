class Client {
	constructor(socket, eventAggregator) {
		this.eventAggregator = eventAggregator;
		this.socket = socket;
	}

	bindEvents(message) {
		console.log('binding events...');
		this.eventAggregator.on('data', (message) => {
			this.socket.send(message)
		});
	}
}

module.exports = Client;