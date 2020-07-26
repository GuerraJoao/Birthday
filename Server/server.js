const express = require('express');
const info = require('./countries');

const app = express();

app.get('/info', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.send(info);
})

app.listen(4000, () => {
  console.log('listening');
});
