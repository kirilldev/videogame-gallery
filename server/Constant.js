'use strict';

const Constants = Object.create(null);
Constants.dataDir = __dirname + '/data';
Constants.romsCache = Constants.dataDir + '/cache.json';
Constants.coversCache = Constants.dataDir + '/covers';
Constants.userConfig = Constants.dataDir + '/config.json';

Constants.platform = {
    "GENESIS": {
        marketingName: "Sega Genesis",
        boxSize: {width: 5.25, length: 7.25, height: 7 / 8},
        textureRegion: {fold1: 0.465, fold2: 0.536},
        minTextureRegion: {offsetLeft: 0.1, fold1: 0.472, fold2: 0.536, offsetRight: 0.9}
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
        textureRegion: {fold1: 0.455, fold2: 0.546}
    },
    "NES": {
        marketingName: "Nintendo Entertainment System",
        boxSize: {width: 6, length: 7.5, height: 1.5},
        textureRegion: {fold1: 0.455, fold2: 0.546},
    },

    "SNES": {
        marketingName: "Super Nintendo Entertainment System",
        boxSize: {width: 11, length: 5, height: 2},
        textureRegion: {fold1: 0.465, fold2: 0.536}
    },
    "NGC": {
        marketingName: "Nintendo Game Cube",
        boxSize: {width: 11, length: 5, height: 2},
        textureRegion: {fold1: 0.465, fold2: 0.536}
    }
};

module.exports = Constants;