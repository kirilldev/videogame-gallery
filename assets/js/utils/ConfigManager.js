'use strict';

const Constant = require('./Constant');

let isModuleInited = false;
let userConfig = null;

function init() {
    try {
        WINDOW_NODE.fs.accessSync(Constant.dataDir, WINDOW_NODE.fs.F_OK);
    } catch (e) {
        if (e.code === 'ENOENT') {
            WINDOW_NODE.fs.mkdirSync(Constant.dataDir);
        } else {
            throw e;
        }
    }

    try {
        userConfig = JSON.parse(WINDOW_NODE.fs.readFileSync(Constant.userConfig, 'utf8'));
    } catch (e) {
        if (e.code !== 'ENOENT') {
            console.log(e);
        }
    }

    isModuleInited = true;
}

const ConfigManager = {
    getConfig: function () {
        if (!isModuleInited) {
            init();
        }
        return userConfig;
    },
    createAndGet: function (rootPath) {
        if (!isModuleInited) {
            init();
        }
        WINDOW_NODE.fs.readdirSync(rootPath);
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
        WINDOW_NODE.fs.writeFileSync(Constant.userConfig, JSON.stringify(userConfig), {encoding: 'utf8'});
        console.log("Config file was saved!");
        return userConfig;
    }
};

module.exports = ConfigManager;


