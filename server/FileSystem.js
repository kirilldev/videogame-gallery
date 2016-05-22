'use strict';

const drivelist = require('drivelist');
const fs = require('fs');

module.exports = {
    getDisks : getDisks,
    getFilesList : getFilesList
};

function getDisks() {
    return new Promise((resolve, reject) => {
        drivelist.list((error, disks) => {
            if (error) {
                reject(error);
            }

            const roots = disks.map(disk => {
                return {
                    name: disk.name,
                    isFolder : true,
                    parent : null,
                    children : [],
                    isExpanded : false
   /*                 mountpoint: disk.mountpoint*/
                }
            });

            resolve(roots);
        });
    });
}

function getFilesList(path) {
    return new Promise((resolve, reject) => {
        fs.readdir(path, function (err, items) {
            if (err) {
                reject(err);
            }

            let total = items.length;
            let out = [];

            for (let i = 0; i < items.length; i++) {
                const filePAth = path + '/' + items[i];

                fs.stat(filePAth, function (err, stats) {
                    total--;

                    if (!err) {
                        const item = {
                            name : items[i],
                            isFolder : stats.isDirectory()
                        };

                        if (item.isFolder) {
                            item.isExpanded = false;
                            item.children = [];
                        }

                        out.push(item);
                    }

                    if (total === 0) {
                        resolve(out);
                    }
                });
            }
        });
    });
}