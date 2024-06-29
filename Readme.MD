# Razorpay-Payment-Gateway

Hello, Welcome To The Documentation Of My Razorpay-Payment-Gateway.

## Back-End

- **Language/Runtime Used:** Javascript, NodeJS
- **Packages Used**: Razorpay SDK

## Razorpay-Methods Used in Controllers:

> **createOrder Function:** `Creates a new order with Razorpay and sends order details back to the client.`  <BR>
<BR>
'const createOrder = async (Req, Res) => {
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
};'

> **checkOrder Function:** `Verifies the order's authenticity using HMAC.`  <BR>
<BR>

> **successOrder Function:** `Handles the order success response by verifying the order and rendering the appropriate HTML page.`  <BR>
<BR>
