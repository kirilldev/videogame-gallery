var React = require('react');
var $ = require('jquery');

var AplphabetNav = require('./AplphabetNav');
var CoverFlow = require('./CoverFlow');
var BottomPanel = require('./BottomPanel');
var Loader = require('./Loader');
var WelcomeScreen = require('./WelcomeScreen');

var Main = React.createClass({

    configCreatedHandler: function (config) {
        this.setState({
            userConfig: config,
            isConfigAbsent: false
        });
    },
    getInitialState: function () {
        return {
            isAppLoaded: false,
            isConfigAbsent: false,
            romsInfo: null,
            userConfig: null
        };
    },
    componentDidMount: function () {
        var component = this;

        $.get('getUserConfig', function (configResponse) {
            console.log(configResponse);
            if (configResponse.isFirstRun) {
                component.setState({
                    isAppLoaded: true,
                    isConfigAbsent: true
                });
            } else {
                $.get('getRomsInfo', function (romsResponse) {
                    component.setState({
                        isAppLoaded: true,
                        userConfig: configResponse.config,
                        romsInfo: romsResponse
                    });
                });
            }
        });
    },
    render: function () {
        var bodyComponents = null;

        if (!this.state.isAppLoaded) {
            bodyComponents = <div id="gallery" className="gallery"><Loader /></div>;
        } else if (this.state.isAppLoaded && this.state.isConfigAbsent) {
            bodyComponents = <div id="gallery" className="gallery">
                <WelcomeScreen configCreatedHandler={this.configCreatedHandler}/>
            </div>;
        } else {
            bodyComponents = [<AplphabetNav />, <div id="gallery" className="gallery"><CoverFlow /></div>,
                <BottomPanel />];
        }

        return (
            <div>{bodyComponents}</div>
        )
    }
});

module.exports = Main;