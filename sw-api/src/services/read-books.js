import wtf from 'wtf_wikipedia';
import { JSDOM } from 'jsdom';
import he from 'he';
import { mergeObjects, fetchUrlAsText } from './utils';

const WIKI_BASEURL = 'https://starwars.fandom.com/wiki/';

const fetchBasicInfo = (document) => {
  const tables = document.tables();
  if (!tables || tables.length === 0) {
    return [];
  }
  const booksTable = tables[0].json();

  // TODO FIX wtf has a bug with titled containing two ':'. Skipping them for now.
  const filteredBooks = booksTable.filter((book) => book.Title.text.split(':').length < 3);

  return filteredBooks.map((book) => {
    let page = '';

    if (book && book.Title && book.Title.links && book.Title.links[0] && book.Title.links[0].page) {
      page = book.Title.links[0].page.split(' ').join('_');
    }

    let format = book.Format.text;
    let reprint = false;
    if (format.indexOf('reprint') !== -1) {
      format = format.replace('reprint', '').trim();
      reprint = true;
    }
    return {
      title: book.Title.text,
      format,
      reprint,
      author: book.Author.text,
      // TODO validate if it is a date
      publish_date:
        book['Publish date'] && new Date(book['Publish date'].text).toISOString().slice(0, 10),
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
      const templateTop = detailDocument.template('Top');
      let canonicity = '';
      if (templateTop && templateTop.wiki) {
        canonicity = templateTop.wiki.indexOf('|can|') !== -1 ? 'canon' : 'legends';
      }

      const detail = template.json();
      return mergeObjects(basicBookInfo, {
        illustrator: detail.illustrator || '',
        publisher: detail.publisher || '',
        isbn: detail.isbn || '',
        pages: +detail.pages || '',
        timeline: (detail.timeline && he.decode(detail.timeline)) || '',
        canonicity,
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
      const thumbnail = dom.window.document.querySelector('.image-thumbnail img');

      const url = (thumbnail && thumbnail.src) || '';

      return mergeObjects(bookInfo, { url });
    })
  );

  booksWithImageUrlsList = booksWithImageUrlsList.filter((book) => book !== null);

  return booksWithImageUrlsList;
};

const readBooks = async () => {
  const fetchTextFn = async (titlePage, format = 'wiki') => {
    const url = WIKI_BASEURL + titlePage + (format === 'wiki' ? '?action=raw' : '');
    const pageContent = await fetchUrlAsText(url);
    return pageContent;
  };

  const wikiText = await fetchTextFn('List_of_future_books');

  if (!wikiText) {
    throw Error('Error when obtaining list of books');
  }
  const document = wtf(wikiText);

  let basicBookInfoList;

  try {
    basicBookInfoList = fetchBasicInfo(document);
  } catch (err) {
    throw Error('Error when obtaining details of books');
  }

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

export default readBooks;
