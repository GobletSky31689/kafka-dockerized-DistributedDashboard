import Highcharts from 'highcharts';
import 'highcharts/css/highcharts.css';

export default class ChartWidget {
	
	constructor(uuid, app) {
		this.uuid = uuid;
		this.app = app;
		this.cpuSeries = {
			data: [],
			name: 'CPU'
		}
		
		this.memSeries = {
			data: [],
			name: 'Memory'
		}


	}

	init() {
		// debugger;
		this.$uuid = $("#" + this.uuid)
		
		this.selfDestructTimer = setTimeout(() => {this.$uuid.remove(); delete this.app.charts[this.uuid]}, 10000);

		this.chart = Highcharts.chart(this.uuid, {
			title: {
				text: this.uuid
			},
			yAxis: {
				title: {
					text: 'Percentage'
				}
			},
			xAxis: {
				title: {
					text: 'Time'
				}
			},
			series: [this.cpuSeries, this.memSeries]
		});
	}

	updateData(data) {
		if(this.cpuSeries.data.length > 20)
			this.cpuSeries.data = this.cpuSeries.data.splice(1);
		if(this.memSeries.data.length > 20)
			this.memSeries.data = this.memSeries.data.splice(1);

		this.cpuSeries.data.push(data['cpu']);
		this.memSeries.data.push(data['mem']);
		this.chart.series[0].setData(this.cpuSeries.data);
		this.chart.series[1].setData(this.memSeries.data);

		//Set new timeout
		clearTimeout(this.selfDestructTimer);
		this.selfDestructTimer = setTimeout(() => {this.$uuid.remove(); delete this.app.charts[this.uuid]}, 10000);
	}

}
	
