var React = require('react');
const ConfigManager = require('../utils/ConfigManager');

var WelcomeScreen = React.createClass({
    getInitialState () {
        return {disks: []}
    },
    componentWillMount: function() {
    },
    handlePathChange: function (e) {
        this.setState({path: e.target.value});
    },
    createConfig: function () {
        this.props.configCreatedHandler(ConfigManager.createAndGet(this.state.path));
    },
    /* <br/>*/

    render: function () {
        return (
            <div style={{height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                <div>
                    <h1>Welcome to Video Game Gallery!</h1>
                    Provide path to your folder with roms:<br/>
                    <input  value={this.state.path} onChange={this.handlePathChange} style={{width: "100%", padding: "6px 4px"}}/>
                    <div style={{textAlign:"right", marginTop: "20px"}}>
                        <label className="Btn" htmlFor="browse-folder">Browse..</label>
                        <input id="browse-folder" type='file' style={{display : 'none'}} onChange={this.handlePathChange} is nwdirectory />
                        <button className="Btn" onClick={this.createConfig}>Save</button>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = WelcomeScreen;