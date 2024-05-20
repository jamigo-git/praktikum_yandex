Server

import express from 'express';
import { fileURLToPath } from 'url';
import { resolve, dirname } from 'path';

const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

// const entryPoint = path.resolve(__dirname, 'dist', 'index.html');
app.use(express.static(resolve(__dirname, 'dist')));
// app.use(history);

app.get("*", (req, res) => {
    res.sendFile(resolve(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});

