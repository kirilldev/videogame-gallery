/**
 * todo: check it later: http://busypeoples.github.io/post/react-component-lifecycle/
 */

var React = require('react');
var THREE = require('three');
var ThreeCoverLoader = require('../utils/ThreeCoverLoader');
var Constant = require('../utils/Constant');

var visibleCovers = [];
var currentGameIndex = 1;
var defaultIndent = 2;
var distanceToCamera = -50;
var scrollSpeed = 0.2;

var state = {
    shownCovers: [],
    targetCover: 0,
    isTransition: false
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
        mesh.rotation.x = this.props.coverConfig.rotation.x;
        this.scene.add(mesh);
        return mesh;
    },
    _onScreenResize: function (callback) {
        var padding = this.props.coverConfig.padding;
        var camera = this.camera;
        var gallery = this.gallery;
        camera.aspect = gallery.offsetWidth / gallery.offsetHeight;
        camera.updateProjectionMatrix();
        this.renderer.setSize(gallery.offsetWidth, gallery.offsetHeight);
        var distance = distanceToCamera * -1;
        var vFOV = camera.fov * Math.PI / 180;        // convert vertical fov to radians
        var height = 2 * Math.tan(vFOV / 2) * distance; // visible height
        var width = height * camera.aspect;           // visible width

        var v = Math.round(width / (Constant.platform[this.props.console].boxSize.width + padding));

        if (v % 2 === 0) {
            v++;
        } else {
            v = v + 2;
        }

        this.setState({
            coversOnScreen: v,
            width: width
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
            coversOnScreen: 0
        }
    },
    componentWillReceiveProps: function (nextProps) {
        var roms = nextProps.roms;

        var halfOfCovers = (this.state.coversOnScreen - 1) / 2;

        if (state.shownCovers.length) {
            var direction = this.props.currentGameIndex - nextProps.currentGameIndex;
        } else {

            var angle = 0.5;

            for (var i = -halfOfCovers; i <= -1; i++) {
                var xPos = (this.props.coverConfig.padding + Constant.platform[this.props.console].boxSize.width) * i;
                var boxLeft = this._addGameBoxToScene(this.getRelativeToChosenCoverIndex(i), xPos, roms);
                boxLeft.romIndex = this.getRelativeToChosenCoverIndex(i);
                state.shownCovers.push(boxLeft);
                boxLeft.rotation.y = angle;
                boxLeft.rotation.z = 0.1;
            }

            var focusedBox = this._addGameBoxToScene(this.props.currentGameIndex, 0, roms);
            focusedBox.romIndex = this.props.currentGameIndex;
            focusedBox.position.z = -46;
            state.shownCovers.push(focusedBox);

            for (var j = 1; j <= halfOfCovers; j++) {
                var xPos = (this.props.coverConfig.padding + Constant.platform[this.props.console].boxSize.width) * j;
                var boxRight = this._addGameBoxToScene(this.getRelativeToChosenCoverIndex(j), xPos, roms);
                boxRight.romIndex = this.getRelativeToChosenCoverIndex(j);
                boxRight.rotation.y = -angle;
                state.shownCovers.push(boxRight);
            }
        }
    },
    shouldComponentUpdate: function (nextProps, nextState) {
        return false;
    },
    animateScene: function () {
        if (state.targetCover !== 0) {

            var last = state.shownCovers.length - 1;
            var coverHalf = Constant.platform[this.props.console].boxSize.width / 2;

            if (state.targetCover < 0) {

                var screenEnd = this.state.width * 0.5 + coverHalf;

                for (var i = 0; i < state.shownCovers.length; i++) {
                    state.shownCovers[i].position.x = state.shownCovers[i].position.x + scrollSpeed;
                }

                if (state.shownCovers[last].position.x > screenEnd) {
                    var x = state.shownCovers[0].position.x;
                    this.scene.remove(state.shownCovers.pop());
                    var k = last / 2;
                    var xPos = x - this.props.coverConfig.padding - Constant.platform[this.props.console].boxSize.width;
                    var box = this._addGameBoxToScene(this.getRelativeToChosenCoverIndex(-k - 1), xPos, this.props.roms);
                    box.romIndex = this.getRelativeToChosenCoverIndex(-k - 1);
                    state.shownCovers.unshift(box);
                }

            } else if (state.targetCover > 0) {

                var screenStart = -this.state.width * 0.5 - coverHalf;

                for (var i = 0; i < state.shownCovers.length; i++) {
                    state.shownCovers[i].position.x = state.shownCovers[i].position.x - scrollSpeed;
                }

                if (state.shownCovers[0].position.x < screenStart) {
                    var xx = state.shownCovers[last].position.x;
                    this.scene.remove(state.shownCovers.shift());
                    var kk = last / 2;
                    var xPos = xx + this.props.coverConfig.padding + Constant.platform[this.props.console].boxSize.width;
                    var boxx = this._addGameBoxToScene(this.getRelativeToChosenCoverIndex(kk + 1), xPos, this.props.roms);
                    boxx.romIndex = this.getRelativeToChosenCoverIndex(kk + 1);
                    state.shownCovers.push(boxx);
                }

            }


            for (var z = 0; z < state.shownCovers.length; z++) {
                var fixedNum = Number(state.shownCovers[z].position.x.toFixed(1));
                if (fixedNum === 0) {

                    if (this.getRelativeToChosenCoverIndex(state.targetCover) === state.shownCovers[z].romIndex) {
                        state.targetCover = 0;
                    }

                    this.props.gameChosen(state.shownCovers[z].romIndex);
                    break;
                }
            }
        } else {

        }

        this.render3dScene();
        requestAnimationFrame(this.animateScene);
    },
    componentWillMount: function () {
    },
    getRelativeToChosenCoverIndex: function (relativeIndex) {
        var virtualIndex = this.props.currentGameIndex + relativeIndex;
        var romsLength = this.props.roms.games.list.length;


        if (virtualIndex < 0) {
            var front = romsLength + virtualIndex;

            if (front < 0) {
                return 0;
            }

            return front;
        } else if (virtualIndex >= romsLength) {
            var rear = virtualIndex - romsLength;

            if (virtualIndex >= romsLength) {
                return romsLength - 1;
            }

            return rear;
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

        //var light = new THREE.PointLight(0xffffff);
        //light.position.set(0, 10, 50).normalize();
        //light.distance = 100;
        //light.shadowCameraVisible = true;
        //this.scene.add(light);


        window.addEventListener('resize', this._onScreenResize, false);

        window.addEventListener("keydown", function (event) {

            if (state.targetCover === 0) {
                if (event.keyCode === 37) {
                    //left
                    state.targetCover--;
                } else if (event.keyCode === 39) {
                    //right
                    state.targetCover++;
                }
            }
        }.bind(this));

        this._onScreenResize(function () {
            this.render3dScene();
            this.animateScene();
        }.bind(this));
    },
    render: function () {
        return (<canvas id={this.props.canvasId}/>)
    }
});

module.exports = CoverFlow;