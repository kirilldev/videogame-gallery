/**
 * todo: check it later: http://busypeoples.github.io/post/react-component-lifecycle/
 */

var React = require('react');
var THREE = require('three');
var ThreeCoverLoader = require('../utils/ThreeCoverLoader');

var visibleCovers = [];
var currentConsole = "N64";
var currentGameIndex = 1;

var canvas;
var gallery;
var camera;
var scene;
var renderer;
var mesh;


/*
 mesh.rotation.y += 1.56;
 */


function render() {
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = gallery.offsetWidth / gallery.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(gallery.offsetWidth, gallery.offsetHeight);

    console.log();

    var distanceToCamera = 50;
    var vFOV = camera.fov * Math.PI / 180;        // convert vertical fov to radians
    var height = 2 * Math.tan( vFOV / 2 ) * distanceToCamera; // visible height
    var width = height * camera.aspect;           // visible width
    console.log("camera max width: " + width);

    render();
}

var CoverFlow = React.createClass({
    animateScene: function () {
        mesh.rotation.x += .02;

        render();
        requestAnimationFrame(this.animateScene);
    },
    componentWillMount: function () {
    },
    componentDidMount: function () {

        canvas = document.getElementById('canvasss');
        gallery = document.getElementById('gallery');

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(10, gallery.offsetWidth / gallery.offsetHeight, 1, 1000);

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
        scene.add(mesh);

        var mesh1 = ThreeCoverLoader.load(1, currentConsole);
        mesh1.position.z = -50;
        mesh1.position.x = 7;
        scene.add(mesh1);

        var mesh2 = ThreeCoverLoader.load(2, currentConsole);
        mesh2.position.z = -50;
        mesh2.position.x = 14;
        scene.add(mesh2);

        var mesh2 = ThreeCoverLoader.load(3, currentConsole);
        mesh2.position.z = -50;
        mesh2.position.x = -7;
        scene.add(mesh2);

        var mesh2 = ThreeCoverLoader.load(4, currentConsole);
        mesh2.position.z = -50;
        mesh2.position.x = -14;
        scene.add(mesh2);
        /*
         scene.remove( selectedObject );
         */

        renderer = new THREE.WebGLRenderer({canvas: canvas, alpha: true});
        renderer.setSize(gallery.offsetWidth, gallery.offsetHeight);
        window.addEventListener('resize', onWindowResize, false);

        render();

        this.animateScene();
    },
    render: function () {
        return (<canvas id="canvasss"/>)
    }
});

module.exports = CoverFlow;