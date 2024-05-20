Server

import express from 'express';
import path from 'path';
import history from './http-rewrite/history-plugin';

const PORT = 3000;
const app = express();
const entryPoint = path.resolve(__dirname, 'dist', 'index.html');

app.use(express.static(path.resolve(__dirname, 'dist')));
app.use(history);

app.use("*", (req, res) => {
    res.sendFile(`${__dirname}/dist/index.html`);
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});

