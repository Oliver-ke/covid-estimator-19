import express from 'express';
import cors from 'cors';

import CovidController from './controller/covidController';
import logController from './controller/logController';
import validator from './middleware/validator';

const app = express();
app.use(cors());

// setup express body-perser for json data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.post('/api/v1/on-covid-19', validator(), CovidController);

app.post('/api/v1/on-covid-19/:resType', validator(), CovidController);

app.get('/api/v1/on-covid-19/logs', logController);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on port ${PORT}`);
});
