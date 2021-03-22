const express = require('express');
const url = require('url');

const app = express();
const port = 3000;

app.use('/', express.static(`${__dirname}./../dist`));

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: `${__dirname}./../dist` });
});

app.get('*', (req, res) => {
  res.redirect(url.format({ pathname: '/', query: req.query }));
});

app.listen(port);
