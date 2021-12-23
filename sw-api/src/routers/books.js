import path from 'path';
import fs from 'fs';
import express from 'express';
import filenamify from 'filenamify';
import { createEtagFromStats } from '../services/utils';

const router = express.Router();

router.get('/', (req, res) => {
  const filePath = path.resolve('data', 'books.json');

  const allBookRaw = fs.readFileSync(filePath);
  const allBooks = JSON.parse(allBookRaw);

  res.status(200).json(allBooks);
});

router.get('/:wiki_page/cover', (req, res) => {
  const fileName = `${filenamify(req.params.wiki_page)}.jpg`;
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
