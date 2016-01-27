var React = require('react');

var WelcomeScreen = React.createClass({
    validateAndSavePath: function(){
    },
    render: function () {
        return (
            <div style={{height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                <div>
                    <h1>Welcome to Video Game Gallery!</h1>
                    Type path to your folder with roms:<br/>
                    <input style={{width: "100%", padding: "6px 4px"}}/><br/>
                    <div style={{textAlign:"right", marginTop: "20px"}}>
                        <button className="Btn" onClick={this.validateAndSavePath}>Save</button>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = WelcomeScreen;