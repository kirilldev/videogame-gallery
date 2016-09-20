'use strict';

const Constant = require('./Constant');
const ConfigManager = require('./ConfigManager');

let indexedRoms = null;

try {
    indexedRoms = JSON.parse(WINDOW_NODE.fs.readFileSync(Constant.romsCache, 'utf8'));
} catch (e) {
    if (e.code !== 'ENOENT') {
        console.log(e);
    }
}

function indexData(rootPath) {
    const indexedObj = {};

    WINDOW_NODE.fs.readdirSync(rootPath).forEach(filename => {
        if (Constant.platform[filename.toUpperCase()]) {
            const platformPath = rootPath + '/' + filename;
            let gamesFolder = null;
            let coversFolder = null;

            WINDOW_NODE.fs.readdirSync(platformPath).forEach(filename => {
                if (filename.toUpperCase() === 'GAMES') {
                    gamesFolder = platformPath + '/' + filename;
                } else if (filename.toUpperCase() === 'COVERS') {
                    coversFolder = platformPath + '/' + filename;
                }
            });

            if (gamesFolder) {
                indexedObj[filename] = {
                    covers: {path: coversFolder},
                    games: {path: gamesFolder}
                };
            }
        }
    });

    for (let property in indexedObj) {
        let value = indexedObj[property];
        value.games.list = [];
        value.games.alphabet = [];

        WINDOW_NODE.fs.readdirSync(value.games.path).forEach(filename => {
            let c = filename.substring(0, 1);
            let char = Number.isInteger(Number(c)) ? '#' : c.toUpperCase();

            if (value.games.alphabet[value.games.alphabet.length - 1] !== char) {
                value.games.alphabet.push(char);
            }

            value.games.list.push(filename);
        });

        if (value.covers.path) {
            value.covers.list = {};

            WINDOW_NODE.fs.readdirSync(value.covers.path).forEach(filename => {
                var separatorIndex = filename.lastIndexOf('.');
                var name = filename.substring(0, separatorIndex);
                value.covers.list[name] = filename.substring(separatorIndex);
            });
        }
    }

    return indexedObj;
}

const RomsCache = {
    getIndexed: (refresh) => {
        if (refresh) {
            indexedRoms = indexData(ConfigManager.getConfig().romsRoot);
            WINDOW_NODE.fs.writeFileSync(Constant.romsCache, JSON.stringify(indexedRoms), {encoding: 'utf8'});
            console.log("The file was saved!");
        }

        return indexedRoms;
    }
};

module.exports = RomsCache;