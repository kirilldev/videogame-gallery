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

var mesh;


/*
 mesh.rotation.y += 1.56;
 */


var CoverFlow = React.createClass({
    render3dScene: function () {
        this.renderer.render(this.scene, this.camera);
    },
    _onScreenResize: function () {
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
        console.log(width / Constant.platform[currentConsole].boxSize.width);

        this.render3dScene();
    },
    getDefaultProps: function () {
        return {
            canvasId: 'canvas'
        }
    },
    getInitialState: function () {
        return {
            chosenGameIndex: 0
        }
    },
    componentWillReceiveProps: function (nextProps) {
        console.log(nextProps.romsInfo[nextProps]);
    },
    shouldComponentUpdate: function (nextProps, nextState) {
        return false;
    },
    animateScene: function () {
        mesh.rotation.x += .02;

        this.render3dScene();
        requestAnimationFrame(this.animateScene);
    },
    componentWillMount: function () {
    },
    componentDidMount: function () {
        this.scene = new THREE.Scene();
        this.canvas = document.getElementById(this.props.canvasId);
        this.gallery = document.getElementById('gallery');
        this.camera = new THREE.PerspectiveCamera(10, this.gallery.offsetWidth / this.gallery.offsetHeight, 1, 1000);
        this.renderer = new THREE.WebGLRenderer({canvas: this.canvas, alpha: true});
        this.renderer.setSize(this.gallery.offsetWidth, this.gallery.offsetHeight);

        this._onScreenResize();
        this.componentWillReceiveProps(this.props);

        /*        var light = new THREE.DirectionalLight(0xffffff);
         light.position.set(0, 1, 1).normalize();
         scene.add(light);
         var fullwidth = 28;
         var font = 13;
         var side = 2
         Darkwing Duck.jpg
         */

        mesh = ThreeCoverLoader.load(0, currentConsole);
        mesh.position.z = -50;
        this.scene.add(mesh);

        var mesh1 = ThreeCoverLoader.load(1, currentConsole);
        mesh1.position.z = -50;
        mesh1.position.x = 7;
        this.scene.add(mesh1);

        var mesh2 = ThreeCoverLoader.load(2, currentConsole);
        mesh2.position.z = -50;
        mesh2.position.x = 14;
        this.scene.add(mesh2);

        var mesh2 = ThreeCoverLoader.load(3, currentConsole);
        mesh2.position.z = -50;
        mesh2.position.x = -7;
        this.scene.add(mesh2);

        var mesh2 = ThreeCoverLoader.load(4, currentConsole);
        mesh2.position.z = -50;
        mesh2.position.x = -14;
        this.scene.add(mesh2);
        /*
         scene.remove( selectedObject );
         */


        window.addEventListener('resize', this._onScreenResize, false);

        this.render3dScene();
        this.animateScene();
    },
    render: function () {
        return (<canvas id={this.props.canvasId}/>)
    }
});

module.exports = CoverFlow;