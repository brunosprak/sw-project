import express from 'express';
import cors from 'cors';
import booksRoutes from './src/routers/books';
import morgan from 'morgan';
import compression from 'compression';
import helmet from 'helmet';

const app = express();

// if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
app.use(morgan('combined'));
// }
app.use(helmet());
app.use(compression());

app.use((req, res, next) => {
  // Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
  res.header('Access-Control-Allow-Origin', '*');
  // Quais são os métodos que a conexão pode realizar na API
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  app.use(cors());
  next();
});

app.use('/books', booksRoutes);

app.get('/', (req, res) => {
  res.status(404).send('Not found');
});

app.listen(process.env.PORT || 9001);
