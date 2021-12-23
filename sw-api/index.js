import express from 'express';
import path from 'path';
import fs from 'fs';
import filenamify from 'filenamify';
import cors from 'cors';

const app = express();

app.use((req, res, next) => {
  // Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
  res.header('Access-Control-Allow-Origin', '*');
  // Quais são os métodos que a conexão pode realizar na API
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  app.use(cors());
  next();
});

app.get('/', (req, res) => {
  res.status(404).send('Not found');
});

app.get('/book/:wiki_page/cover', (req, res) => {
  const filePath = path.resolve('data', 'cover', `${filenamify(req.params.wiki_page)}.jpg`);
  let fileSizeInBytes;

  try {
    // app.use(express.static('/book', { maxAge: 86400000 /* 1d */ }));

    const stats = fs.statSync(filePath);
    fileSizeInBytes = stats.size;

    res.writeHead(200, {
      'Content-Type': 'image/jpeg',
      'Content-Length': fileSizeInBytes,
      // "Expires": new Date(Date.now() + 86400000).toUTCString(),
      // "Cache-Control": "public, max-age=86400",
    });

    //       res.set({
    //     "Cache-Control": "public, max-age=86400",
    //     "Expires": new Date(Date.now() + 86400000).toUTCString()
    //  })

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
  } catch (err) {
    res.status(404);
    // const filePath = path.resolve('assets', 'notFound.png');
    // const stats = fs.statSync(filePath);
    // fileSizeInBytes = stats.size;
    // res.writeHead(200, {
    //   'Content-Type': 'image/png',
    //   'Content-Length': 83057,
    // });
    // const readStream = fs.createReadStream(filePath);
    // readStream.pipe(res);
  }
});

app.get('/books/future', (req, res) => {
  const filePath = path.resolve('data', 'books.json');
  // await sleep(3000);
  let fileSizeInBytes;

  try {
    const stats = fs.statSync(filePath);
    fileSizeInBytes = stats.size;

    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Content-Length': fileSizeInBytes,
      // "Expires": new Date(Date.now() + 86400000).toUTCString(),
      'Cache-Control': 'no-transform,public,max-age=300,s-maxage=900',
    });

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
  } catch (err) {
    res.contentType('application/json').send('[]');
  }
});
const port = 9001;
app.listen(port);
