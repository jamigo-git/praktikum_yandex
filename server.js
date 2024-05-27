import express from 'express';
import { fileURLToPath } from 'url';
import { resolve, dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PORT = process.env.port || 3000;
const app = express();

app.use(express.static(resolve(__dirname, 'dist')));

app.get("*", (req, res) => {
    res.sendFile(resolve(__dirname, 'dist', 'index.html'));
});

// app.listen(PORT, () => {
//     console.log(`Сервер запущен на порту ${PORT}`);
// });

