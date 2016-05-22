var React = require('react');

var Clock = require('./Clock');

var AlphabetNav = React.createClass({

    render: function () {

        var activeLetter = this.props.gameName.substring(0, 1);
        activeLetter = Number.isInteger(Number(activeLetter)) ? '#' : activeLetter.toUpperCase();

        var alphabet = this.props.alphabet;
        var letters = [];

        for (var i = 0; i < alphabet.length; i++) {
            var letter = alphabet[i];

            if (letter === activeLetter) {
                letters.push(<span key={i} onClick={this.props.letterSelected.bind(this.props.parent, letter)}
                                   className="alphabet active">{letter}</span>);
            } else {
                letters.push(<span key={i} onClick={this.props.letterSelected.bind(this.props.parent, letter)}
                                   className="alphabet">{letter}</span>);
            }
        }

        return (
            <div className="AlphabetNav">
                <div className="AlphabetNav__wrapper">
                    {letters}
                </div>
            </div>
        )
    }
});

module.exports = AlphabetNav;