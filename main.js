'use strict';

const express = require('express');
const fs = require('fs');
const app = express();
const Constant = require('./assets/js/utils/Constant');
const FileSystem = require('./server/FileSystem');
const ConfigManager = require('./assets/js/utils/ConfigManager');
const RomsCache = require('./assets/js/utils/RomsCache');
const CoverOptimizer = require('./server/CoverOptimizer');
const APP_PORT = 3001;

/*
 RomsCache.indexAndGet('E:/GoogleDrive/EMULATION/ROMS');
 */


app.listen(APP_PORT, () => console.log('App listening on ' + APP_PORT + ' port!'));
