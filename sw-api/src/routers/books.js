import path from 'path';
import fs from 'fs';
import express from 'express';
import filenamify from 'filenamify';
import { sleep, createEtagFromStats } from '../services/utils';

const router = express.Router();

const allBooks = () => {
  const filePath = path.resolve('data', 'books.json');
  const allBookRaw = fs.readFileSync(filePath);
  const allBooks = JSON.parse(allBookRaw);
  return allBooks;
};

const bookByIsbn = (isbn) => {
  const books = allBooks();
  return books.find((book) => book.isbn === isbn);
};

router.get('/', (req, res) => {
  const books = allBooks();
  res.status(200).json(books);
});

router.get('/:isbn/cover', (req, res) => {
  const book = bookByIsbn(req.params.isbn);
  const fileName = `${filenamify(book.wiki_page)}.jpg`;
  const filePath = path.resolve('data', 'cover', `${fileName}`);
  let fileSizeInBytes;

  try {
    if (!fs.existsSync(filePath)) {
      return res.status(404).end();
    }

    const stats = fs.statSync(filePath);
    fileSizeInBytes = stats.size;
    const etag = createEtagFromStats(stats);

    res.writeHead(200, {
      'Content-Type': 'image/jpeg',
      'Content-Length': fileSizeInBytes,
      'Cache-Control': 'public, max-age=86400000, s-max-age=86400000',
      'Content-Disposition': `inline; filename=${fileName}`,
      ETag: etag,
      Expires: new Date(Date.now() + 86400000).toUTCString(),
    });

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
  } catch (err) {
    return res.status(404).end();
  }
});

export default router;
