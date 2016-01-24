'use strict';

const fs = require('fs');
const Constant = require('./Constant');

let userConfig = null;

try {
    userConfig = JSON.parse(fs.readFileSync(Constant.userConfig, 'utf8'));
} catch (e) {
    if (e.code !== 'ENOENT') {
        console.log(e);
    } else {
        userConfig = {};
        fs.writeFileSync(Constant.userConfig, JSON.stringify(userConfig), {encoding: 'utf8'});
    }
}


const ConfigManager = {
    getConfig: function () {
        return userConfig;
    }
};

module.exports = ConfigManager;


