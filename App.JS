const HTTP = require('http');
const FileSystem = require('fs');

const PATH = require('path');

const { Routes } = require('./Routes/Routes.JS');

require('dotenv').config({ path: './.ENV' });

const myServer = HTTP.createServer((Req, Res) => {
  if (Req.url === '/Style.CSS') {
    const filePath = PATH.join(__dirname, 'Public', Req.url);
    console.log(filePath);
    const CSSFile = FileSystem.readFileSync(filePath, 'utf-8');
    Res.writeHead(200, 'OK', { 'Content-type': 'text/css' });
    Res.write(CSSFile);
    Res.end();
  }
  Routes(Req, Res);
});

module.exports = { myServer };
