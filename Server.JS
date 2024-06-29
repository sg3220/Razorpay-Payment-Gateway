const { myServer } = require('./App.JS');

myServer.listen(process.env.PORT, () => {
  console.log(`Server Running On ${process.env.PORT}`);
});
