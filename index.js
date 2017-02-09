'use strict'

const spawnSync = require('child_process').spawnSync;
const nudb = require('nudb');
const fs = require('fs');

const config = require('./config');

async function uploadfile() {
    nudb.connect(config.nudb.url, config.nudb.db);
    let data = fs.readFileSync(config.outPath, 'utf-8');
    try {
        console.log('Uploading file...');
        let result = await nudb.fputJSON(config.outPath);
        console.log(result);
    } catch(err) {
        console.log(err);
    }
}

async function exportFile() {
    const mongoExport = spawnSync(config.mongoPath+'mongoexport', [ 
        '--host', config.mongodb.url,
        '--db', config.mongodb.db,
        '--collection', config.mongodb.collection,
        '-o', config.outPath,
        '-u', config.mongodb.username,
        '-p', config.mongodb.password,
        '--jsonArray'
    ]);
    console.log(mongoExport.stderr);   

    const result = mongoExport.stderr.toString().trim();
    return result;
}

async function main() {
    try {
        console.log('Start to export file.');
        let result = await exportFile();
        console.log(result);
        console.log('Export file finish.');
        await uploadfile();
        console.log('Upload file finish.');
    } catch(err) {
        console.log(err);
    }

}

main();
