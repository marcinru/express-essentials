import express from 'express';
import fs from 'fs';

const data = JSON.parse(
  fs.readFileSync(new URL('./data/mock.json', import.meta.url), 'utf8')
);

const app = express();

const PORT = 3000;

// http://localhost:3000/mountains_1.jpeg
app.use(express.static('public'));

// http://localhost:3000/images/mountains_2.jpeg
app.use('/images', express.static('images'));

app.get('/download', (req, res) => {
  res.download('images/mountains_2.jpeg');
});

app.get('/', (req, res) => {
  res.json(data);
});

app.get('/redirect', (req, res) => {
  res.redirect('https://www.linkedin.com');
});

app.get(
  '/next',
  (req, res, next) => {
    console.log('The response will be sent by the next function.');
    next();
  },
  (req, res) => {
    res.send('I just set up a route with a second callback.');
  }
);

app.get('/class/:id', (req, res) => {
  const studentId = Number(req.params.id);
  const student = data.filter((stu) => stu.id === studentId);
  res.send(student);
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
});
