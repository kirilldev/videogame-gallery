'use strict';

const express = require('express');
const fs = require('fs');
const app = express();
const Constant = require('./server/Constant');
const ConfigManager = require('./server/ConfigManager');
const RomsCache = require('./server/RomsCache');
const APP_PORT = 3001;

/*
 RomsCache.indexAndGet('E:/GoogleDrive/EMULATION/ROMS');
 */

app.use('/assets', express.static('assets'));
app.get('/', (req, res) =>  res.sendfile('./views/index.html'));
app.get('/getRomsInfo', (req, res) => res.json(RomsCache.getIndexed()));
app.get('/saveRomsFolder', (req, res) => {
    console.log(req.query.path);
    res.json(ConfigManager.createAndGet(req.query.path));
});
app.get('/getUserConfig', (req, res) => {
    const response = {
        config: ConfigManager.getConfig(),
        isFirstRun: ConfigManager.getConfig() == null
    };
    res.json(response);
});
app.listen(APP_PORT, () => console.log('App listening on ' + APP_PORT + ' port!'));