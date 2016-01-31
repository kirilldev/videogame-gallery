'use strict';

const express = require('express');
const fs = require('fs');
const app = express();
const Constant = require('./server/Constant');
const ConfigManager = require('./server/ConfigManager');
const RomsCache = require('./server/RomsCache');
const CoverOptimizer = require('./server/CoverOptimizer');
const APP_PORT = 3001;

/*
 RomsCache.indexAndGet('E:/GoogleDrive/EMULATION/ROMS');
 */

app.use('/assets', express.static('assets'));
app.get('/', (req, res) =>  res.sendfile('./views/index.html'));
app.get('/getRomsInfo', (req, res) => {
    res.json(RomsCache.getIndexed(req.query.refreshCache))
});
app.get('/getCover', function (req, res) {
    const optimizedCoverPath = Constant.coversCache + '/' + req.query.platform + '/' + req.query.game;

    try {
        fs.accessSync(Constant.coversCache, fs.F_OK);
    } catch (e) {
        if (e.code === 'ENOENT') {
            fs.mkdirSync(Constant.coversCache);
        }
    }

    try {
        fs.accessSync(Constant.coversCache + '/' + req.query.platform, fs.F_OK);
    } catch (e) {
        if (e.code === 'ENOENT') {
            fs.mkdirSync(Constant.coversCache + '/' + req.query.platform);
        }
    }

    try {
        fs.accessSync(optimizedCoverPath, fs.F_OK);
        fs.createReadStream(optimizedCoverPath).pipe(res);
    } catch (e) {
        const coverPath = req.query.path + '/' + req.query.game;
        CoverOptimizer.optimize(coverPath, optimizedCoverPath, function (err, buffer) {
            console.log('done');
            fs.createReadStream(optimizedCoverPath).pipe(res);
        });
    }
    /*
     let readStream = fs.createReadStream(req.query.uri);
     readStream.pipe(res);*/
});
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