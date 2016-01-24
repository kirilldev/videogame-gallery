var React = require('react');
var $ = require('jquery');

var AplphabetNav = require('./AplphabetNav');
var CoverFlow = require('./CoverFlow');
var BottomPanel = require('./BottomPanel');
var Loader = require('./Loader');

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
        var bodyComponent = null;

        if (!this.state.isAppLoaded) {
            bodyComponent = <Loader />;
        } else if (this.state.isAppLoaded && this.state.isFirstRun) {
            bodyComponent = '<div>select elements</div>';
        } else {
            bodyComponent = <CoverFlow />;
        }

        return (
            <div>
                <AplphabetNav />
                <div id="gallery" className="gallery">{bodyComponent}</div>
                <BottomPanel />
            </div>
        )
    }
});

module.exports = Main;