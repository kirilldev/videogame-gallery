var React = require('react');
var THREE = require('three');
var Constant = require('../../../server/Constant');

var visibleCovers = [];
var currentConsole = "N64";
var currentGameIndex = 1;

var canvas;
var gallery;
var camera;
var scene;
var renderer;
var mesh;

function loadCover(path, platform) {

    var boxSize = Constant.platform[platform].boxSize;
    var textureRegion = Constant.platform[platform].textureRegion;

    var sideTexture = new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture('assets/img/side.png')});
    var sideLong = [
        new THREE.Vector2(0, 1),
        new THREE.Vector2(0, 0),
        new THREE.Vector2(1, 0),
        new THREE.Vector2(1, 1)
    ];

    var sideShort = [
        new THREE.Vector2(1, 0),
        new THREE.Vector2(0, 0),
        new THREE.Vector2(0, 1),
        new THREE.Vector2(1, 1)
    ];

    var coverTexture = THREE.ImageUtils.loadTexture(path);
    coverTexture.minFilter = THREE.NearestMipMapNearestFilter;
    coverTexture.magFilter = THREE.LinearMipMapLinearFilter;
    var atlasMaterial = new THREE.MeshBasicMaterial({map: coverTexture});
    var atlasBack = [
        new THREE.Vector2(0, 1),
        new THREE.Vector2(0, 0),
        new THREE.Vector2(textureRegion.fold1, 0),
        new THREE.Vector2(textureRegion.fold1, 1)
    ];
    var atlasSide = [
        new THREE.Vector2(textureRegion.fold1, 1),
        new THREE.Vector2(textureRegion.fold1, 0),
        new THREE.Vector2(textureRegion.fold2, 0),
        new THREE.Vector2(textureRegion.fold2, 1)
    ];
    var atlasFront = [
        new THREE.Vector2(textureRegion.fold2, 1),
        new THREE.Vector2(textureRegion.fold2, 0),
        new THREE.Vector2(1, 0),
        new THREE.Vector2(1, 1)
    ];

    var gameBox = new THREE.CubeGeometry(
        boxSize.width,
        boxSize.length,
        boxSize.height
    );

    gameBox.faceVertexUvs[0] = [];
    gameBox.faceVertexUvs[0][0] = [sideLong[0], sideLong[1], sideLong[3]];
    gameBox.faceVertexUvs[0][1] = [sideLong[1], sideLong[2], sideLong[3]];
    gameBox.faceVertexUvs[0][2] = [atlasSide[0], atlasSide[1], atlasSide[3]];
    gameBox.faceVertexUvs[0][3] = [atlasSide[1], atlasSide[2], atlasSide[3]];
    gameBox.faceVertexUvs[0][4] = [sideShort[0], sideShort[1], sideShort[3]];
    gameBox.faceVertexUvs[0][5] = [sideShort[1], sideShort[2], sideShort[3]];
    gameBox.faceVertexUvs[0][6] = [sideShort[0], sideShort[1], sideShort[3]];
    gameBox.faceVertexUvs[0][7] = [sideShort[1], sideShort[2], sideShort[3]];
    gameBox.faceVertexUvs[0][8] = [atlasFront[0], atlasFront[1], atlasFront[3]];
    gameBox.faceVertexUvs[0][9] = [atlasFront[1], atlasFront[2], atlasFront[3]];
    gameBox.faceVertexUvs[0][10] = [atlasBack[0], atlasBack[1], atlasBack[3]];
    gameBox.faceVertexUvs[0][11] = [atlasBack[1], atlasBack[2], atlasBack[3]];

    return new THREE.Mesh(gameBox, new THREE.MeshFaceMaterial(
        [sideTexture, atlasMaterial, sideTexture, sideTexture, atlasMaterial, atlasMaterial]
    ));
}

function init() {
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

    mesh = loadCover(0, currentConsole);
    mesh.position.z = -50;
    scene.add(mesh);

    var mesh1 = loadCover(1, currentConsole);
    mesh1.position.z = -50;
    mesh1.position.x = 7;
    scene.add(mesh1);

    var mesh2 = loadCover(2, currentConsole);
    mesh2.position.z = -50;
    mesh2.position.x = 14;
    scene.add(mesh2);

    var mesh2 = loadCover(3, currentConsole);
    mesh2.position.z = -50;
    mesh2.position.x = -7;
    scene.add(mesh2);

    var mesh2 = loadCover(4, currentConsole);
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
}


/*
 mesh.rotation.y += 1.56;
 */


function animate() {
    mesh.rotation.x += .02;

    render();
    requestAnimationFrame(animate);
}

function render() {
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = gallery.offsetWidth / gallery.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(gallery.offsetWidth, gallery.offsetHeight);
    render();
}

var CoverFlow = React.createClass({
    componentDidMount: function () {
        init();
        animate();
    },
    render: function () {
        return (<canvas id="canvasss" />)
    }
});

module.exports = CoverFlow;