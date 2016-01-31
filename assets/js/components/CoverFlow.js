/**
 * todo: check it later: http://busypeoples.github.io/post/react-component-lifecycle/
 */

var React = require('react');
var THREE = require('three');
var ThreeCoverLoader = require('../utils/ThreeCoverLoader');
var Constant = require('../../../server/Constant');

var visibleCovers = [];
var currentConsole = "N64";
var currentGameIndex = 1;
var defaultIndent = 2;
var distanceToCamera = -50;

var state = {
    shownCovers: []
};

/*
 mesh.rotation.y += 1.56;
 */

var CoverFlow = React.createClass({
    render3dScene: function () {
        this.renderer.render(this.scene, this.camera);
    },
    _addGameBoxToScene: function (gameIndex, xPos, roms) {
        var aGame = roms.games.list[gameIndex];
        var gameName = aGame.substring(0, aGame.lastIndexOf('.'));
        var coverExtension = roms.covers.list[gameName];
        var mesh;

        if (coverExtension) {
            mesh = ThreeCoverLoader.load(roms.covers.path, gameName + coverExtension, this.props.console);
        } else {
            mesh = ThreeCoverLoader.loadDefault(this.props.console);
        }

        mesh.position.z = distanceToCamera;
        mesh.position.x = xPos;
        this.scene.add(mesh);
        return mesh;
    },
    _onScreenResize: function (callback) {
        var camera = this.camera;
        var gallery = this.gallery;
        camera.aspect = gallery.offsetWidth / gallery.offsetHeight;
        camera.updateProjectionMatrix();
        this.renderer.setSize(gallery.offsetWidth, gallery.offsetHeight);

        console.log(Constant.platform[currentConsole].boxSize.width);

        var distanceToCamera = 50;
        var vFOV = camera.fov * Math.PI / 180;        // convert vertical fov to radians
        var height = 2 * Math.tan(vFOV / 2) * distanceToCamera; // visible height
        var width = height * camera.aspect;           // visible width

        this.setState({
            coversOnScreen: Math.round(width / Constant.platform[currentConsole].boxSize.width)
        }, callback);
    },
    getDefaultProps: function () {
        return {
            canvasId: 'canvas',
            roms: []
        }
    },
    getInitialState: function () {
        return {
            chosenGameIndex: 0,
            coversOnScreen: 0
        }
    },
    componentWillReceiveProps: function (nextProps) {
        var roms = nextProps.roms;
        var halfOfCovers = (this.state.coversOnScreen - 1) / 2;
        var coversOnScreen = [];
        coversOnScreen.push(this._addGameBoxToScene(this.state.chosenGameIndex, 0, roms));

        for (var i = 1; i <= halfOfCovers; i++) {
            coversOnScreen.push(this._addGameBoxToScene(this.getRelativeToChosenCoverIndex(-i), -i * 7, roms));
            coversOnScreen.push(this._addGameBoxToScene(this.getRelativeToChosenCoverIndex(i), i * 7, roms));
        }

        state.shownCovers = coversOnScreen;
        /*
         scene.remove( selectedObject );
         */
    },
    shouldComponentUpdate: function (nextProps, nextState) {
        return false;
    },
    animateScene: function () {
        for (var i = 0; i < state.shownCovers.length; i++) {
            //state.shownCovers[i].position.x = state.shownCovers[i].position.x + .1;
        }

        this.render3dScene();
        requestAnimationFrame(this.animateScene);
    },
    componentWillMount: function () {
    },
    getRelativeToChosenCoverIndex: function (relativeIndex) {
        var virtualIndex = this.state.chosenGameIndex + relativeIndex;
        var romsLength = this.props.roms.games.list.length;

        if (virtualIndex < 0) {
            return romsLength + virtualIndex;
        } else if (virtualIndex > romsLength) {
            return virtualIndex - romsLength
        }

        return virtualIndex;
    },
    componentDidMount: function () {
        this.scene = new THREE.Scene();
        this.canvas = document.getElementById(this.props.canvasId);
        this.gallery = document.getElementById('gallery');
        this.camera = new THREE.PerspectiveCamera(10, this.gallery.offsetWidth / this.gallery.offsetHeight, 1, 1000);
        this.renderer = new THREE.WebGLRenderer({canvas: this.canvas, alpha: true});
        this.renderer.setSize(this.gallery.offsetWidth, this.gallery.offsetHeight);

        this._onScreenResize(function () {
            this.componentWillReceiveProps(this.props);
            this.render3dScene();
        }.bind(this));

        /*        var light = new THREE.DirectionalLight(0xffffff);
         light.position.set(0, 1, 1).normalize();
         scene.add(light);
         var fullwidth = 28;
         var font = 13;
         var side = 2
         Darkwing Duck.jpg
         */

        window.addEventListener('resize', this._onScreenResize, false);

        window.addEventListener("keydown", function (event) {
            if (event.keyCode === 37) {
                //left

                this.setState({
                    chosenGameIndex: this.getRelativeToChosenCoverIndex(-i)
                });
            } else if (event.keyCode === 39) {
                //right
                this.setState({
                    chosenGameIndex: this.getRelativeToChosenCoverIndex(i)
                });
            }
        }.bind(this));


        this.render3dScene();
        this.animateScene();
    },
    render: function () {
        return (<canvas id={this.props.canvasId}/>)
    }
});

module.exports = CoverFlow;