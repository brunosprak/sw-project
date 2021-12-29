import path from 'path';
import fs from 'fs';
import express from 'express';
import { createEtagFromStats } from '../services/utils';

const router = express.Router();

router.get('/:canonicity/:acronym', (req, res) => {
  if (req.params.canonicity !== 'can' && req.params.canonicity !== 'leg') {
    return res.status(403).end();
  }

  const fileName = `${req.params.acronym}.svg`;
  const filePath = path.resolve('assets', 'eras', req.params.canonicity, fileName);
  let fileSizeInBytes;
  try {
    if (!fs.existsSync(filePath)) {
      return res.status(404).end();
    }

    const stats = fs.statSync(filePath);
    fileSizeInBytes = stats.size;
    const etag = createEtagFromStats(stats);

    res.writeHead(200, {
      'Content-Type': 'image/svg+xml',
      'Content-Length': fileSizeInBytes,
      'Cache-Control': 'public, max-age=86400000, s-max-age=86400000',
      'Content-Disposition': `inline; filename=${fileName}`,
      ETag: etag,
      Expires: new Date(Date.now() + 86400000).toUTCString(),
    });

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
    readStream.unpipe(res);
  } catch (err) {
    return res.status(404).end();
  }
});

export default router;
