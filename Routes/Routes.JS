const { createOrder, successOrder } = require('../Controllers/Payment.JS');

const FileSystem = require('fs');

const PATH = require('path');

const Routes = (Req, Res) => {
  switch (Req.url) {
    case '/':
      Res.writeHead(200, 'OK', { 'Content-type': 'text/html' });
      const PageToBeRendered = FileSystem.readFileSync(
        './Views/Index.HTML',
        'utf-8'
      );
      Res.write(PageToBeRendered);

      Res.end();
      break;

    case '/Payment':
      if (Req.method === 'POST') {
        createOrder(Req, Res);
        break;
      } else {
        Res.writeHead(404, 'NOT OK', { cookieToken: 'NULL' });
        Res.write('Route Not Found');
        Res.end();
        break;
      }
    case '/Success':
      if (Req.method === 'POST') {
        successOrder(Req, Res);
        break;
      } else {
        Res.writeHead(404, 'NOT OK', { cookieToken: 'NULL' });
        Res.write('Route Not Found');
        Res.end();
        break;
      }
    case '/Style.CSS':
      break;

    default:
      Res.writeHead(404, 'NOT OK', { cookieToken: 'NULL' });
      Res.write('Route Not Found');
      Res.end();
      break;
  }
};
module.exports = {
  Routes,
};
