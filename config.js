'use strict';

module.exports = {
    nudb: {
        url: 'http://nuweb.ddns.net:5803/nudb/',
        db: 'dcard'
    },
    mongodb: {
        url: 'localhost:27017',
        db: 'crawl',
        collection: 'dcard_travel',
        username: 'username',
        password: 'pwd'
    },
    mongoPath: '~/mongodb-3.4.1/bin/',
    outPath: './output/' + new Date().toISOString() + '.json'
};
