'use strict';

const Constants = Object.create(null);
Constants.dataDir = WINDOW_NODE.__dirname + '/data';
Constants.romsCache = Constants.dataDir + '/cache.json';
Constants.coversCache = Constants.dataDir + '/covers';
Constants.userConfig = Constants.dataDir + '/config.json';

Constants.platform = {
    "GENESIS": {
        marketingName: "Sega Genesis",
        boxSize: {width: 5.25, length: 7.25, height: 7 / 8},
        vTextureRegion: {fold1: 0, fold2: 1},
        minTextureRegion: {offsetLeft: 0.1, fold1: 0.465, fold2: 0.536, offsetRight: 0.9}
        //0.199
    },
    "DREAMCAST": {
        marketingName: "Sega Dreamcast",
        boxSize: null,
        textureRegion: null
    },
    "GBA": {
        marketingName: "Game Boy Advance",
        boxSize: null,
        textureRegion: null
    },
    "N64": {
        marketingName: "Nintendo 64",
        boxSize: {width: 5.5, length: 7.5, height: 1.15},
        vTextureRegion: {fold1: 0, fold2: 1},
        minTextureRegion: {offsetLeft: 0.1, fold1: 0.455, fold2: 0.546, offsetRight: 0.9}
    },
    "NES": {
        marketingName: "Nintendo Entertainment System",
        boxSize: {width: 6, length: 7.5, height: 1.5},
        textureRegion: {fold1: 0.455, fold2: 0.546}
    },

    "SNES": {
        marketingName: "Super Nintendo Entertainment System",
        boxSize: {width: 5, length: 7, height: 2},
        textureRegion: {fold1: 0.465, fold2: 0.536},
        minTextureRegion: {offsetLeft: 0.15, fold1: 0.472, fold2: 0.536, offsetRight: 0.89}
    },
    "NGC": {
        marketingName: "Nintendo Game Cube",
        boxSize: {width: 11, length: 5, height: 2},
        textureRegion: {fold1: 0.465, fold2: 0.536}
    },
    "NDS": {
        marketingName: "Nintendo DS",
        boxSize: {width: 6, length: 6, height: 1},
        vTextureRegion: {fold1: 0.08, fold2: 0.92},
        minTextureRegion: {offsetLeft: 0, fold1: 0.4, fold2: 0.6, offsetRight: 1}
    }
};

module.exports = Constants;