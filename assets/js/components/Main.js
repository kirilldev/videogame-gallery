'use strict';

const React = require('react');
const ReactDOM = require('react-dom');

const AjaxFetch = require('../utils/AjaxFetch');
const RomsCache = require('../utils/RomsCache');
const AplphabetNav = require('./AplphabetNav');
const CoverFlow = require('./CoverFlow');
const BottomPanel = require('./BottomPanel');
const Loader = require('./Loader');
const WelcomeScreen = require('./WelcomeScreen');
const ModalSettings = require('./ModalSettings');

function getRomsInfo (isRefreshCache) {
    let indexed = RomsCache.getIndexed(isRefreshCache);

    if (!indexed) {
        indexed = RomsCache.getIndexed(true);
    }

    return indexed
};



const Main = React.createClass({

    _showSettings: function () {
        ReactDOM.render(<ModalSettings />, document.getElementById('modal'));
    },

    onConsoleSelected: function () {
        //ReactDOM.render(<ModalSettings />, document.getElementById('modal'));
    },

    configCreatedHandler: function (config) {
        var component = this;

        var romsResponse = getRomsInfo(true);
        var currentConsole = null;

        for (var k in romsResponse) {
            if (!currentConsole || currentConsole > k) {
                currentConsole = k;
            }
        }

        component.setState({
            isAppLoaded: true,
            isConfigAbsent: false,
            userConfig: config,
            romsInfo: romsResponse,
            currentConsole: currentConsole,
            currentGameIndex: 0
        });

        console.log(romsResponse);

    },
    getInitialState: function () {
        return {
            isAppLoaded: false,
            isConfigAbsent: false,
            romsInfo: null,
            userConfig: null,
            currentConsole: null,
            currentGameIndex: 0,
            rotationX: 0
        };
    },
    componentDidMount: function () {
        var component = this;

        AjaxFetch('getUserConfig').then(configResponse => {
            console.log(configResponse);
            if (configResponse.isFirstRun) {
                component.setState({
                    isAppLoaded: true,
                    isConfigAbsent: true
                });
            } else {
                AjaxFetch('getRomsInfo').then(romsResponse => {
                    component.setState({
                        isAppLoaded: true,
                        userConfig: configResponse.config,
                        romsInfo: romsResponse,
                        currentConsole: "NDS",
                        currentGameIndex: 0
                    });
                });
            }
        });
    },

    onGameChosen: function (i) {
        this.setState({
            currentGameIndex: i
        });
    },

    onLetterSelected: function (letter) {
        var roms = this.state.romsInfo[this.state.currentConsole].games.list;

        for (var i = 0; i < roms.length; i++) {
            if (roms[i].startsWith(letter)) {
                this.onGameChosen(i);
                return;
            }
        }
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
            var roms = this.state.romsInfo[this.state.currentConsole];
            var fileName = roms.games.list[this.state.currentGameIndex];
            var gameName = fileName.substring(0, fileName.lastIndexOf('.'));

            bodyComponents = [
                <AplphabetNav key="1" gameName={gameName} alphabet={roms.games.alphabet} parent={this}
                              letterSelected={this.onLetterSelected}/>,
                <div key="2" id="gallery" className="gallery">
                    <CoverFlow console={this.state.currentConsole} currentGameIndex={this.state.currentGameIndex}
                               roms={roms} gameChosen={this.onGameChosen}
                               coverConfig={this.state.userConfig.coverSetup}/>
                </div>,
                <BottomPanel key="3" console={this.state.currentConsole} gameName={gameName}
                             showSettings={this._showSettings} selectConsole={this.onConsoleSelected}/>
            ];
        }

        return (
            <div>{bodyComponents}</div>
        )
    }
});

module.exports = Main;