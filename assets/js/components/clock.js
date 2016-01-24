var React = require('react');

var Clock = React.createClass({
	setTime: function(){
		var now = new Date();
		var secs =  now.getSeconds();
		var mins =  now.getMinutes();

		this.setState({
			hours: now.getHours(),
			minutes: mins > 9 ? mins : "0" + mins,
			seconds: secs > 9 ? secs : "0" + secs,
			year: now.getFullYear()
		});
	},
	componentWillMount: function(){
		this.setTime();
	},
	componentDidMount: function(){
		window.setInterval(function () {
			this.setTime();
		}.bind(this), 1000);
	},
	render: function() {

		return(
			<div className="Clock__time">
				<span className="Clock_time_time">{this.state.hours}:{this.state.minutes}</span>
				<span className="Clock_time_secs">:{this.state.seconds}</span>
				<div className="Clock__date">
					MONDAY, 2 MARCH {this.state.year}
				</div>
			</div>
		)
	}
});

module.exports = Clock;