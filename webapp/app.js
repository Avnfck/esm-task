import path from 'path';
import { fileURLToPath } from 'url';
import express, { json } from 'express';
import { fetchData } from './public/js/parseProduct.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '/public');
const port = 3000;

const app = express();

app.use(json());
app.use(express.static(publicDir));

app.get('/single', (req, res) => {
  if (!req.query.address) {
    res.send({
      error : 'No product URL provided'
    });
  }

  fetchData(req.query.address, (error, data) => {
    if (error) {
      return res.send({ error });
    }

    res.send({
      data
    });

  });
});

app.listen(port, () => {
  console.log(`Server is up on ${port}`)
});