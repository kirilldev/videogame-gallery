'use strict';

const express = require('express');
const fs = require('fs');
const fs2json = require('fs2json');
const app = express();
const Constant = require('./server/Constant');
const ConfigManager = require('./server/ConfigManager');
const RomsCache = require('./server/RomsCache');
const APP_PORT = 3001;

try {
    fs.accessSync(Constant.dataDir, fs.F_OK);
} catch (e) {
    if (e.code === 'ENOENT') {
        fs.mkdirSync(Constant.dataDir);
    }
}

RomsCache.indexAndGet('E:/GoogleDrive/EMULATION/ROMS');

app.use('/assets', express.static('assets'));
app.get('/', (req, res) =>  res.sendfile('./views/index.html'));
app.get('/getRomsInfo', (req, res) => res.json(RomsCache.getIndexed()));
app.get('/saveRomsFolder', (req, res) => {
    console.log(req.query.url);
    res.json(RomsCache.indexAndGet(req.query.url))
});
app.get('/getUserConfig', (req, res) => {
    const response = {
        config: ConfigManager.getConfig(),
        isFirstRun: Object.keys(ConfigManager.getConfig()).length === 0
    };
    res.json(response);
});

app.listen(APP_PORT, () => console.log('App listening on ' + APP_PORT + ' port!'));