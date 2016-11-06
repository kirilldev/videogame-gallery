const jimp = require('jimp');

const CoverOptimizer = {
    optimize: function (input, output, cb) {
        jimp.read(input, function (err, img) {
            if (err) throw err;
            img.contain(2048, 1024)            // resize
                .quality(100)             // set JPEG quality
                .write(output, cb);
        });
    }

};

module.exports = CoverOptimizer;