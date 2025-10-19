import express from 'express';
import fs from 'fs';

const data = JSON.parse(
  fs.readFileSync(new URL('./data/mock.json', import.meta.url), 'utf8')
);

const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
  res.json(data);
});

app.post('/create', (req, res) => {
  res.send('This is a POST request at /create endpoint');
});

app.put('/edit', (req, res) => {
  res.send('This is a PUT request at /edit endpoint');
});

app.delete('/delete', (req, res) => {
  res.send('This is a DELETE request at /delete endpoint');
});

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
  console.log(data);
});
