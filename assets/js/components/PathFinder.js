var React = require('react');

var EXPANDED = '▼';
var COLLAPSED = '▶';

var FOLDER_IMG = 'assets/img/Folder-icon.png';
var DISK_IMG = 'assets/img/device-drive-icon.png';

var PathFinder = React.createClass({
    componentWillMount: function(){
    },
    componentDidMount: function(){
    },
    _buildTree : function(paths, depth) {
        let tree = [];

        paths.forEach(disk => {
            var expander = <span style={{visibility : disk.isFolder ? 'visible' : 'hidden'}}
                                 onClick={this.props.expandFolder.bind(this.props.parent, disk)}
                                 className="Expander">{disk.isExpanded ? EXPANDED :COLLAPSED}</span>;

            var node = (<div style={{paddingLeft : depth*20 + 'px'}}>
                {expander}
                <img width="40px" height="40px" src={disk.parent === null ? DISK_IMG : FOLDER_IMG}/>
                {disk.name}
            </div>);

            tree.push(node);

            if (disk.isFolder && disk.isExpanded) {
                [].push.apply(tree, this._buildTree(disk.children, depth + 1));
            }
        });

        return tree;
    },
    render: function() {
        var disks = this.props.disks;

        return(
           <div>{this._buildTree(disks, 0)}</div>
        )
    }
});

module.exports = PathFinder;