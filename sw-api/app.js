import express from 'express';
import cors from 'cors';
import booksRoutes from './src/routers/books';
import morgan from 'morgan';
import compression from 'compression';
import helmet from 'helmet';
import path from 'path';
import fs from 'fs';

const app = express();

var accessLogStream = fs.createWriteStream(path.resolve('access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));

app.use(helmet());
app.use(compression());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  app.use(cors());
  next();
});

app.use('/books', booksRoutes);

app.use(
  '/public',
  express.static(path.resolve('public'), {
    maxAge: '86400000',
  })
);

app.get('/', (req, res) => {
  res.status(404).send('Not found');
});

app.listen(process.env.PORT || 9001);
