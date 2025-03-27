import express from 'express';

const app = express();

app.use(express.json());

const PORT = 8000;

app.post('/', (req, res) => {
  res.send({message: 'Hello World'});
}); 

app.post('/name', (req, res) => {
  res.send({message: 'Hello Nakorn'});
}); 

app.post('/api/v1/:hospitalname/:hospcode', (req, res) => {
  res.send({
    hospitalname: `${req.params.hospitalname}`,
    hospcode: `${req.params.hospcode}`
  });
});


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

