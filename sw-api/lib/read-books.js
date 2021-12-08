import wtf from 'wtf_wikipedia';
import { mergeObjects } from './common/utils';
import { JSDOM } from 'jsdom';

// const fetchTextFn = (titlePage, format = 'wiki') => {};

const fetchBasicInfo = (document) => {
  const tables = document.tables();
  if (!tables || tables.length === 0) {
    return [];
  }
  const booksTable = tables[0].json();

  // wtf has a bug with titled containing two ':'. Skipping them for now.
  const filteredBooks = booksTable.filter(
    (book) => book.Title.text.split(':').length < 3
  );

  return filteredBooks.map((book) => {
    let page = '';

    if (
      book &&
      book.Title &&
      book.Title.links &&
      book.Title.links[0] &&
      book.Title.links[0].page
    ) {
      page = book.Title.links[0].page.split(' ').join('_');
    }
    return {
      title: book['Title'].text,
      format: book['Format'].text,
      author: book['Author'].text,
      // TODO validate if it is a date
      publish_date:
        book['Publish date'] &&
        new Date(book['Publish date'].text).toISOString().slice(0, 10),
      wiki_page: page,
    };
  });
};

const fetchAndMergeWithDetailInfo = async (fetchTextFn, basicBookInfoList) => {
  if (!basicBookInfoList) {
    return [];
  }

  let booksWithDetailList = await Promise.all(
    basicBookInfoList.map(async (basicBookInfo) => {
      const detailText = await fetchTextFn(basicBookInfo.wiki_page);
      const detailDocument = wtf(detailText);

      const template = detailDocument.template('book');
      if (template == null) {
        return null;
      }
      const detail = template.json();
      return mergeObjects(basicBookInfo, {
              illustrator: detail.illustrator || '',
              publisher: detail.publisher || '',
              isbn: detail.isbn || '',
              pages: detail.pages || '',
              timeline: detail.timeline || '',
            });
    })
  );

  booksWithDetailList = booksWithDetailList.filter((book) => book !== null);
  return booksWithDetailList;
};

const fetchAndMergeWithImageUrlInfo = async (fetchTextFn, bookInfoList) => {
  if (!bookInfoList) {
    return [];
  }

  let booksWithImageUrlsList = await Promise.all(
    await bookInfoList.map(async (bookInfo) => {
      const detailText = await fetchTextFn(bookInfo.wiki_page, 'html');

      if (!detailText) {
        return null;
      }

      const dom = new JSDOM(detailText);
      const thumbnail = dom.window.document.querySelector(
        '.image-thumbnail img'
      );

      const url = (thumbnail && thumbnail.src) || '';

      return mergeObjects(bookInfo, { url });
    })
  );

  booksWithImageUrlsList = booksWithImageUrlsList.filter((book) => book !== null);

  return booksWithImageUrlsList;
};

export const readBooks = async (fetchTextFn) => {
  const wikiText = await fetchTextFn('List of future books');
  const document = wtf(wikiText);

  const basicBookInfoList = fetchBasicInfo(document);

  const bookWithDetailedInfoList = await fetchAndMergeWithDetailInfo(
    fetchTextFn,
    basicBookInfoList
  );

  const booksWithImageUrlsList = await fetchAndMergeWithImageUrlInfo(
    fetchTextFn,
    bookWithDetailedInfoList
  );

  return booksWithImageUrlsList;
};
