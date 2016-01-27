var React = require('react');
var $ = require('jquery');

var AplphabetNav = require('./AplphabetNav');
var CoverFlow = require('./CoverFlow');
var BottomPanel = require('./BottomPanel');
var Loader = require('./Loader');
var WelcomeScreen = require('./WelcomeScreen');

var Main = React.createClass({
    getInitialState: function () {
        return {
            isAppLoaded: false,
            isFirstRun: false,
            romsInfo: null,
            userConfig: null
        };
    },
    componentDidMount: function () {
        var component = this;

        $.get('getUserConfig', function (configResponse) {
            console.log(configResponse);

/*            var lastGist = result[0];
            if (component.isMounted()) {
                component.setState({
                    username: lastGist.owner.login,
                    lastGistUrl: lastGist.html_url
                });
            }*/

            $.get('getRomsInfo', function (romsResponse) {
   /*             var lastGist = result[0];
                if (this.isMounted()) {
                    this.setState({
                        username: lastGist.owner.login,
                        lastGistUrl: lastGist.html_url
                    });
                }*/

                component.setState({
                    isAppLoaded: true,
                    isFirstRun : configResponse.isFirstRun,
                    userConfig: configResponse.config,
                    romsInfo : romsResponse
                });
            });
        });
    },
    render: function () {
        var bodyComponents = null;

        if (!this.state.isAppLoaded) {
            bodyComponents = <div id="gallery" className="gallery"><Loader /></div>;
        } else if (this.state.isAppLoaded && this.state.isFirstRun) {
            bodyComponents = <div id="gallery" className="gallery"><WelcomeScreen /></div>;
        } else {
            bodyComponents = [<AplphabetNav />, <div id="gallery" className="gallery"><CoverFlow /></div>, <BottomPanel />];
        }

        return (
            <div>{bodyComponents}</div>
        )
    }
});

module.exports = Main;