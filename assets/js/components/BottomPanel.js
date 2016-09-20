var React = require('react');

var Clock = require('./Clock');

var BottomPanel = React.createClass({
    render: function() {
        return(
            <div className="BottomPannel">
                <div className="BottomPannel__logo-wrapper">
                    <img className="BottomPannel__logo" onClick={this.props.selectConsole} src={"dist/img/logo/" + this.props.console + ".png"}/>
                    <img className="SettingsIcon" src="assets/img/players.png"/>
                </div>
                <div className="BottomPannel__title-wrapper">
                    <span className="BottomPannel__title">{this.props.gameName}</span>
                </div>
                <div className="BottomPannel__right-corner">
                    <img className="SettingsIcon" src="assets/img/settings1.png" onClick={this.props.showSettings}/>
                    <Clock />
                </div>
            </div>
        )
    }
});

module.exports = BottomPanel;