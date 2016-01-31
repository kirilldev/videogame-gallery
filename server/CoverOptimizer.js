const fs = require('fs');
const jimp = require('jimp');

const CoverOptimizer = {
    optimize: function (input, output, cb) {
  /*      fs.readFile(input, function (err, data) {
                if (err) throw err;
*/
                jimp.read(input, function (err, img) {
                    if (err) throw err;
                    img.contain(1024, 512)            // resize
                        .quality(60)             // set JPEG quality
                        .write(output, cb);
                });
            }
       // );

};

module.exports = CoverOptimizer;