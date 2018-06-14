let express = require('express'),
	app = express(),
	expressWs = require('express-ws')(app),
	EventAggregator = require('events').EventEmitter,
	eventAggregator = new EventAggregator(),
	Client = require('./client'),
	kafka = require('kafka-node'),
	config = require('./config'),
	uuid = require('uuid/v4');


//Need to pass zookeeper's connection string
//kafkaClient will ask zookeeper for broker's address
const kafkaClient = new kafka.Client(config.kafkaConfig.consumerOptions.connectionString);
const kafkaConsumer = new kafka.HighLevelConsumer(kafkaClient, config.kafkaConfig.consumerOptions.topics);


kafkaClient.zk.client.getChildren("/brokers/topics", (err, children, stats) => {
	console.log('Following topics are available:');
	children.forEach(child => console.log(child));
});


kafkaConsumer.on('message', (message) => {
	//Wire message event to the eventemitter so all clients can access
	eventAggregator.emit('data', JSON.stringify({eventType: 'data', payload: message.value}));
});

app.use(express.static('public'));

// For the nodes we would be monitoring
app.get('/login', (req, res) => {
	let producerOptions = Object.assign({}, config.kafkaConfig.nodeOptions);
	producerOptions['uuid'] = uuid();

	res.json(producerOptions);
});

// For the nodes we would be monitoring
// app.get('/logout', (req, res) => {
// 	res.send('Hello World');
// });


// app.get('/test', (req, res) => {
// 	res.send("You found me :-)");
// })

//for the web clients
app.ws('/connect', (socket, req) => {
	let client = new Client(socket, eventAggregator);
	// client.push()
	client.bindEvents();
});


// Constants
const PORT = 8080;
const HOST = '0.0.0.0';


app.listen(PORT, HOST, (err) => {
	if(err)
		throw new Error("unable to start server");
	console.log(`Server listening on ${HOST}:${PORT}...`);		
});


