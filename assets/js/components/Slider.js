var React = require('react');
var NWSlider = require('nw-react-slider');

var Slider = React.createClass({

    handleChange: function (val) {
        console.log(val);
    },

    render: function () {
        return (
            <NWSlider
                value={0}
                min={0}
                max={10}
                ticks
                markers={[{value: 3, label: 'Three'}, {value: 8, label: 'Eight'}]}
                onChange={this.handleChange}/>
        )
    }
});

module.exports = Slider;