const jsonServer = require('json-server');
const fs = require('fs');
const path = require('path')

// Paths for databases
const masterPath = path.join('db', 'master.json'); // Versioned
const localPath = path.join('db', 'local.json'); // Not versioned

// Using the proxy point of react-scripts to inject backend stuff
module.exports = function (app) {
    // Creating a local copy of db/master.json when not found
    fs.existsSync(localPath) || fs.copyFileSync(masterPath, localPath);

    // Mount api
    app.use('/api', jsonServer.router(localPath));
};