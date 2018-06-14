class Client {
	constructor(socket, eventAggregator) {
		this.eventAggregator = eventAggregator;
		this.socket = socket;
	}

	bindEvents(message) {
		console.log('binding events...');
		this.eventAggregator.on('data', (message) => {
			if(this.socket.readyState == this.socket.OPEN){
				this.socket.send(message, function(error) {
					if(error)
    					console.log(error);
				});
			}
		});
	}
}

module.exports = Client;