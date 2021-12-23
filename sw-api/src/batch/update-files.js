import path from 'path';
import filenamify from 'filenamify';
import { existsSync } from 'fs';

import readBooks from '../services/read-books';
import { saveToFile, downloadUrl } from '../services/utils';

const books = await readBooks();

books.forEach(async (book) => {
  if (!book.wiki_page) {
    return;
  }
  const imageURL = book.url;
  if (imageURL) {
    const filePath = path.resolve('data', 'cover', `${filenamify(book.wiki_page)}.jpg`);
    // TODO implement: if file size is zero, execute as well
    //  and also when the file has a new content (or url)
    if (!existsSync(filePath)) {
      await downloadUrl(imageURL, filePath, () => {});
    }
  }
});

books.forEach((book) => {
  delete book.url; // eslint-disable-line no-param-reassign
});

saveToFile(JSON.stringify(books), path.resolve('data', 'books.json'));
