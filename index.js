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

// for Content-Type application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.post('/item', (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

app.get('/download', (req, res) => {
  res.download('images/mountains_2.jpeg');
});

app.get('/', (req, res) => {
  res.json(data);
});

app.get('/redirect', (req, res) => {
  res.redirect('https://www.linkedin.com');
});

app
  .route('/class')
  .get((req, res) => {
    // res.send('This is a GET request at /class endpoint');
    throw new Error();
  })
  .post((req, res) => {
    res.send('This is a POST request at /class endpoint');
  })
  .put((req, res) => {
    res.send('This is a PUT request at /class endpoint');
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

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something is broken!');
});

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
