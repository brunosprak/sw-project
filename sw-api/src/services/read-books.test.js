import { fetchMock } from './__mock__/utils';
import readBooks from './read-books';

describe('Reading books', () => {
  let books;
  global.fetch = jest.fn(fetchMock);

  beforeAll(async () => {
    books = await readBooks();
  });

  it('should have this length', async () => {
    expect(books).toHaveLength(3);
  });

  it('should contain these novels', async () => {
    const novels = books.filter((book) => book.format === 'Novel');
    expect(novels).toHaveLength(0);

    const youngReaders = books.filter((book) => book.format === 'Young readers book');
    expect(youngReaders).toHaveLength(1);

    const bb8Book = books.find((book) => book.title === 'BB-8 and the Snow Monster');

    expect(bb8Book).toBeTruthy();
    expect(bb8Book.author).toBe('Caitlin Kennedy');
    expect(bb8Book.publish_date).toBe('2023-02-07');
    expect(bb8Book.pages).toBe(64);
    expect(bb8Book.timeline).toBe('34 ABY-35 ABY');
    expect(bb8Book.publisher).toBe('Disney–Lucasfilm Press');
    expect(bb8Book.illustrator).toBe('Brian Kesinger');
    expect(bb8Book.canonicity).toBe('canon');

    const plagueisBook = books.find((book) => book.title === 'Darth Plagueis');
    expect(plagueisBook.wiki_page).toBe('Darth_Plagueis_(novel)');
    expect(plagueisBook.canonicity).toBe('legends');
  });

  it('should calculate the canon eras', async () => {
    const bb8Book = books.find((book) => book.title === 'BB-8 and the Snow Monster');
    expect(bb8Book.canonicity).toBe('canon');
    expect(bb8Book.era).toBe('can/rotfo');
  });
});
