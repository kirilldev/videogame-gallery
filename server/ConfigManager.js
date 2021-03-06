'use strict';

const fs = require('fs');
const Constant = require('./Constant');

let userConfig = null;

try {
    fs.accessSync(Constant.dataDir, fs.F_OK);
} catch (e) {
    if (e.code === 'ENOENT') {
        fs.mkdirSync(Constant.dataDir);
    }
}

try {
    userConfig = JSON.parse(fs.readFileSync(Constant.userConfig, 'utf8'));
} catch (e) {
    if (e.code !== 'ENOENT') {
        console.log(e);
    }
}

const ConfigManager = {
    getConfig: function () {
        return userConfig;
    },
    createAndGet: function (rootPath) {
        fs.readdirSync(rootPath);
        userConfig = {
            romsRoot: rootPath,
            coverSetup: {
                padding: 1.75,
                rotation: {
                    "x": 0.3,
                    "y": 0,
                    "z": 0.1
                },
                "selectedCoverZ": 46
            }
        };
        fs.writeFileSync(Constant.userConfig, JSON.stringify(userConfig), {encoding: 'utf8'});
        console.log("Config file was saved!");
        return userConfig;
    }
};

module.exports = ConfigManager;


