import { readBooks } from './read-books';
import { fetchUrlAsText, saveToFile, downloadUrl } from './common/utils';
import path from 'path';
import filenamify from 'filenamify';
import  { existsSync } from 'fs';


const WIKI_BASEURL = 'https://starwars.fandom.com/wiki/';

const books = await readBooks(async (titlePage, format = 'wiki') => {
  const url =
    WIKI_BASEURL + titlePage + (format === 'wiki' ? '?action=raw' : '');
  const pageContent = await fetchUrlAsText(url);
  return pageContent;
});

saveToFile(JSON.stringify(books),  path.resolve('data', 'books.json'));

books.forEach(async (book) => {
  if (!book.wiki_page) {
    return;
  }
  const imageURL = book.url;
  if (imageURL) {
    const filePath = path.resolve(
      'data',
      'cover',
      filenamify(book.wiki_page) + '.jpg'
    );
    // TODO if file size is zero, execute as well
    //  if the file has a new content (url?), too
    if (!existsSync(filePath)) {
      await downloadUrl(imageURL, filePath, () => {});
    }
  }
});
