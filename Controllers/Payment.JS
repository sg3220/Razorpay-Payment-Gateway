require('dotenv').config({ path: './.ENV' });
const FileSystem = require('fs');
const RAZORPAY = require('razorpay');
const crypto = require('crypto');

let ORDER_ID = '';

const RazorpayInstance = new RAZORPAY({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrder = async (Req, Res) => {
  let Body = '';
  Req.on('data', (dataChunk) => {
    Body = Body + dataChunk;
  });
  Req.on('end', async () => {
    const parsedBody = JSON.parse(Body);
    console.log(parsedBody);

    const orderOptions = {
      amount: Number(parsedBody['amount'] * 100),
      currency: 'INR',
    };
    const currentOrder = await RazorpayInstance.orders.create(orderOptions);
    ORDER_ID = currentOrder['id'];
    const fullName = parsedBody['firstName'] + ' ' + parsedBody['lastName'];
    Res.writeHead(200, 'OK', { 'Content-type': 'application/json' });
    Res.write(
      JSON.stringify({
        RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
        id: currentOrder['id'],
        amount: currentOrder['amount'],
        currency: currentOrder['currency'],
        name: fullName,
        email: parsedBody['email'],
        contact: Number(parsedBody['contact']),
      })
    );
    Res.end();
  });
};

const checkOrder = (Body) => {
  const arrayOfStrings = Body.split(/[=&]/);
  console.log(arrayOfStrings);
  const finalString = ORDER_ID + '|' + arrayOfStrings[1];
  const HMACObject = crypto.createHmac(
    'sha256',
    process.env.RAZORPAY_KEY_SECRET
  );
  HMACObject.update(finalString);
  const finalResult = HMACObject.digest('hex');
  console.log(finalResult);

  if (finalResult === arrayOfStrings[5]) {
    return true;
  } else {
    return false;
  }
};

const successOrder = (Req, Res) => {
  let Body = '';
  Req.on('data', (dataChunk) => {
    Body = Body + dataChunk;
  });
  Req.on('end', async () => {
    if (checkOrder(Body)) {
      Res.writeHead(200, 'OK', { 'Content-type': 'text/html' });
      const PageToBeRendered = FileSystem.readFileSync(
        './Views/Index02.HTML',
        'utf-8'
      );
      Res.write(PageToBeRendered);
      Res.end();
    } else {
      Res.writeHead(200, 'OK', { 'Content-type': 'text/html' });
      const PageToBeRendered = FileSystem.readFileSync(
        './Views/Index03.HTML',
        'utf-8'
      );
      Res.write(PageToBeRendered);
      Res.end();
    }
  });
};

module.exports = { createOrder, successOrder };
