var Constant = require('../../../server/Constant');
var THREE = require('three');

var ThreeCoverLoader = {
    load: function (path, platform) {
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
};

module.exports = ThreeCoverLoader;