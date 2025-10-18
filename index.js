import express from 'express';
import fs from 'fs';

const data = JSON.parse(
  fs.readFileSync(new URL('./data/mock.json', import.meta.url), 'utf8')
);

const app = express();

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
  console.log(data);
});
