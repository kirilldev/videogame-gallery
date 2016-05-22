var React = require('react');
var Slider = require('./Slider');

module.exports = React.createClass({
    getInitialState: function () {
        return {
            value: 10
        };
    },

    handleChange: function (value) {
        this.setState({
            value: value
        });
    },

    render: function () {
        return (
            <div>
                <h1>Camera setup</h1>
                <h3>Cover padding:</h3>
                <Slider/>
                <h3>Cover rotation x:</h3>
                <Slider/>
                <h3>Cover rotation y:</h3>
                <Slider/>
                <h3>Cover rotation z:</h3>
                <Slider/>
                <h3>Selected Cover zoom:</h3>
                <Slider/>
            </div>
        );
    }
});