var React = require('react');

var Clock = require('./clock');

var AlphabetNav = React.createClass({
    render: function() {

        var alphabet = "#abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
        var letters = [];

        for (var i=0; i < alphabet.length; i++) {
            letters.push(<span key={i} className="alphabet">{alphabet[i]}</span>);
        }

        return(
            <div className="AlphabetNav">
                <div className="AlphabetNav__wrapper">
                    {letters}
                </div>
            </div>
        )
    }
});

module.exports = AlphabetNav;