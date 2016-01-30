var React = require('react');
var $ = require('jquery');

var WelcomeScreen = React.createClass({
    getInitialState () {
        return {path: ""}
    },
    handlePathChange: function (e) {
        this.setState({path: e.target.value});
    },
    createConfig: function () {
        $.get('saveRomsFolder', {path: this.state.path}, this.props.configCreatedHandler)
            .fail(function () {
                alert("error");
            });
    },
    render: function () {
        return (
            <div style={{height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                <div>
                    <h1>Welcome to Video Game Gallery!</h1>
                    Type path to your folder with roms:<br/>
                    <input onChange={this.handlePathChange} style={{width: "100%", padding: "6px 4px"}}/><br/>

                    <div style={{textAlign:"right", marginTop: "20px"}}>
                        <button className="Btn" onClick={this.createConfig}>Save</button>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = WelcomeScreen;