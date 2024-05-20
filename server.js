const express = require('express');
const path = require('path');
// const history = require('./http-rewrite/history-plugin');

const PORT = 3000;
const app = express();
const entryPoint = path.resolve(__dirname, 'dist', 'index.html');

app.use("*", (req, res) => {
    res.sendFile(`${__dirname}/dist/index.html`);
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
