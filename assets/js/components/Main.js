var React = require('react');
var $ = require('jquery');

var AplphabetNav = require('./AplphabetNav');
var CoverFlow = require('./CoverFlow');
var BottomPanel = require('./BottomPanel');
var Loader = require('./Loader');
var WelcomeScreen = require('./WelcomeScreen');

var Main = React.createClass({

    configCreatedHandler: function (config) {
        var component = this;

        $.get('getRomsInfo', {refreshCache: true}, function (romsResponse) {
            component.setState({
                isAppLoaded: true,
                isConfigAbsent: false,
                userConfig: config,
                romsInfo: romsResponse,
                currentConsole: "GENESIS"
            });

            console.log(romsResponse);
        });
    },
    getInitialState: function () {
        return {
            isAppLoaded: false,
            isConfigAbsent: false,
            romsInfo: null,
            userConfig: null,
            currentConsole: null
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
                        romsInfo: romsResponse,
                        currentConsole: "GENESIS"
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
            bodyComponents = [<AplphabetNav />, <div id="gallery" className="gallery">
                <CoverFlow console={this.state.currentConsole} romsInfo={this.state.romsInfo}/></div>,
                <BottomPanel />];
        }

        return (
            <div>{bodyComponents}</div>
        )
    }
});

module.exports = Main;