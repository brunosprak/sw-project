import {
  BOOKS_WIKI_TEXT,
  BB8_WIKI_TEXT,
  BOBA_FETT_WIKI_TEXT,
  DARK_PLAGUES_TEXT
} from './__test__/test-texts';
import { readBooks } from './read-books';

const fetchText = async (titlePage, format = 'wiki') => {
  if (titlePage === 'List_of_future_books' && format === 'wiki') {
    return BOOKS_WIKI_TEXT;
  }

  if (titlePage === 'BB-8_and_the_Snow_Monster') {
    if (format === 'wiki') {
      return BB8_WIKI_TEXT;
    } else {
      return '<html>No images in this html</html>';
    }
  }

  if (titlePage === 'Darth_Plagueis_(novel)') {
    if (format === 'wiki') {
      return DARK_PLAGUES_TEXT;
    } else {
      return '<html>No images in this html</html>';
    }
  }

  if (titlePage === 'Star_Wars:_Be_More_Boba_Fett') {
    if (format === 'wiki') {
      return BOBA_FETT_WIKI_TEXT;
    } else {
      return `<a href="https://static.wikia.nocookie.net/starwars/images/c/c0/Be_More_Boba_Fett_cover.jpg/revision/latest?cb=20210723182158" class="image image-thumbnail"
            title="">
             <img src="https://static.wikia.nocookie.net/starwars/images/c/c0/Be_More_Boba_Fett_cover.jpg/revision/latest/scale-to-width-down/500?cb=20210723182158" srcset="https://static.wikia.nocookie.net/starwars/images/c/c0/Be_More_Boba_Fett_cover.jpg/revision/latest/scale-to-width-down/500?cb=20210723182158 1x, https://static.wikia.nocookie.net/starwars/images/c/c0/Be_More_Boba_Fett_cover.jpg/revision/latest/scale-to-width-down/1000?cb=20210723182158 2x" class="pi-image-thumbnail" alt="" width="270" height="368"
                  data-image-key="Be_More_Boba_Fett_cover.jpg" data-image-name="Be More Boba Fett cover.jpg"/>
         </a>`;
    }
  }

  throw Error('Page not found: ' + titlePage);
};

describe('Reading books', () => {
  let books;

  beforeAll(async () => {
    books = await readBooks(fetchText);
  });
  test('Future books page', async () => {
    console.log(books);
    expect(books).toHaveLength(3);
  });
  test('novels are correctly retrieved', async () => {
    const novels = books.filter((book) => book.format === 'Novel');
    expect(novels).toHaveLength(0);

    const youngReaders = books.filter((book) => book.format === 'Young readers book');
    expect(youngReaders).toHaveLength(1);

    const bb8Book = books.find(
      (book) => book.title === 'BB-8 and the Snow Monster'
    ); 
    
    expect(bb8Book).toBeTruthy();
    expect(bb8Book.author).toBe('Caitlin Kennedy');
    expect(bb8Book.publish_date).toBe('2023-02-07');
    expect(bb8Book.pages).toBe(64);
    expect(bb8Book.timeline).toBe('34 ABY–35 ABY');
    expect(bb8Book.publisher).toBe('Disney–Lucasfilm Press');
    expect(bb8Book.illustrator).toBe('Brian Kesinger');

    const plagueisBook = books.find(
      (book) => book.title === 'Darth Plagueis'
    ); 
    expect(plagueisBook.wiki_page).toBe('Darth_Plagueis_(novel)');


  });
});
