var React = require('react');
var PathFinder = require('./PathFinder');
const AjaxFetch = require('../utils/AjaxFetch');

var WelcomeScreen = React.createClass({
    getInitialState () {
        return {disks: []}
    },
    componentWillMount: function() {
        AjaxFetch('getFolders')
            .then(json => this.setState(json))
            .catch(() => alert("error"));
    },
    handlePathChange: function (e) {
        this.setState({path: e.target.value});
    },
    createConfig: function () {
        AjaxFetch('saveRomsFolder', {path: this.state.path}).then(this.props.configCreatedHandler)
            .catch(function () {
                alert("error");
            });
    },
    expandFolder : function(folder) {
        if (folder.isExpanded) {
            folder.isExpanded = false;
            const newDisks = this.state.disks.slice();
            this.setState({disks : newDisks});
        } else {
            folder.isExpanded = true;
            folder.isPending = true;

            let path = '';
            let tmp = folder;

            while (tmp !== null) {
                path = tmp.name + '/' +  path;
                tmp = tmp.parent;
            }

            AjaxFetch('getFolders', {path: path})
                .then(json => {
                    folder.isPending = false;

                    json.files.forEach(file => {
                        if (file.isFolder) {
                            file.parent = folder;
                        }
                    });

                    folder.children = json.files;

                    const newDisks = this.state.disks.slice();
                    this.setState({disks : newDisks});
                });
        }
    },

    /* <br/>*/

    render: function () {
        return (
            <div style={{height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                <div>
                    <h1>Welcome to Video Game Gallery!</h1>
                    Select path to your folder with roms:<br/>
                    <input onChange={this.handlePathChange} style={{width: "100%", padding: "6px 4px"}}/>
                    <div style={{overflow: 'auto', maxHeight: '200px'}}>
                        <PathFinder disks={this.state.disks} expandFolder={this.expandFolder}/>
                    </div>
                    <div style={{textAlign:"right", marginTop: "20px"}}>
                        <button className="Btn" onClick={this.createConfig}>Save</button>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = WelcomeScreen;