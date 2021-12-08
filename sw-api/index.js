import express from 'express';
import path from 'path';
import fs from 'fs';
import filenamify from 'filenamify';

var app = express();
app.get('/', function (req, res) {
  res.status(404).send('Not found');
});

app.get('/book/:wiki_page/cover', function (req, res) {
  const filePath = path.resolve(
    'data',
    'cover',
    filenamify(req.params.wiki_page) + '.jpg'
  );
  let fileSizeInBytes;

  try {
    const stats = fs.statSync(filePath);
    fileSizeInBytes = stats.size;

    res.writeHead(200, {
      'Content-Type': 'image/jpeg',
      'Content-Length': fileSizeInBytes,
    });

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
  } catch (err) {
    const filePath = path.resolve('assets', 'notFound.png');
    const stats = fs.statSync(filePath);
    fileSizeInBytes = stats.size;
    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': 3916,
    });
    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
  }
});

app.get('/books/future', function (req, res) {
  const filePath = path.resolve('data', 'books.json');

  let fileSizeInBytes;

  try {
    var stats = fs.statSync(filePath);
    fileSizeInBytes = stats.size;

    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Content-Length': fileSizeInBytes,
    });

    var readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
  } catch (err) {
    res.contentType('application/json').send('[]');
  }
});
const port = 9001;
app.listen(port, function () {
  console.log('Listening to Port ' + port);
});
