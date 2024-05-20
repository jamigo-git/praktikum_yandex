import express from 'express';

const PORT = 3000;
const app = express();
app.use("/*", (req, res) => {
    res.sendFile(`${__dirname}/dist/index.html`);
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
