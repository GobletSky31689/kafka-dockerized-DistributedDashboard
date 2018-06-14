import ChartWidget from "chart_widget.jsx";
import jQuery from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import './app.css';
//var config = require('../config');

window.$ = jQuery

class App {
	constructor() {
		this.charts = {};
		this.$appContainer = $("#app-container")
	}

	start() {
		// create a ws connection to the server
		this.$eventAggregator = $("#event-aggregator");

		this.socket = new WebSocket('ws://' + window.location.host + '/connect');

		this.socket.onmessage = this.onUpdate.bind(this);
	}

	onUpdate(message) {
		let data = JSON.parse(message.data),
			payload = JSON.parse(data.payload);

		switch(data.eventType) {
			case 'data':
				for(var key in payload) {
					if(this.charts[key]) {
						this.charts[key].updateData(payload[key]);
					} else {
						let uuid = key;
						this.$appContainer.append('<div class="linechart-container" id="' + uuid + '" style="flex-basis: 40%"></div>');
						
						let lineChartWidget = new ChartWidget(uuid, this);

						this.charts[uuid] = lineChartWidget;
						this.charts[uuid].init();
					}
				}
				break;
			case 'logout':
				break;
		}
	}
}

new App().start();
