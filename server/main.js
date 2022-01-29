const express = require('express');
const app = express();
const port = 8080;
const API = require('./API/index.js');

app.use('/', express.static('./public'));

API.init(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});