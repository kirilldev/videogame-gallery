var React = require('react');

var Clock = require('./Clock');

var BottomPanel = React.createClass({
    render: function() {
        return(
            <div className="BottomPannel">
                <div className="BottomPannel__logo-wrapper">
                    <img className="BottomPannel__logo" src="logo/SNES.png"/>
                </div>
                <div className="BottomPannel__title-wrapper">
                    <span className="BottomPannel__title">Mario Party</span>
                </div>
                <div className="BottomPannel__right-corner">
                    <img className="SettingsIcon" src="assets/img/settings1.png"/>
                    <Clock />
                </div>
            </div>
        )
    }
});

module.exports = BottomPanel;