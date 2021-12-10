import Book from '../components/book/Book';
import useHttp from '../hooks/use-http';
import {getFutureBooks } from '../lib/api';
import { useEffect, useCallback} from 'react';
import LoadingSpinner from '../components/ui/LoadingSpinner';
// const BOOKS = [
//   {
//     title: 'Star Wars: Be More Boba Fett',
//     format: 'Self-help book',
//     author: '',
//     publish_date: '2021-12-21',
//     wiki_page: 'Star_Wars:_Be_More_Boba_Fett',
//     illustrator: '',
//     publisher: 'DK Publishing',
//     isbn: '9780744053166',
//     pages: 64,
//     timeline: '',
//   },
//   {
//     title: 'The High Republic: The Fallen Star',
//     format: 'Novel',
//     author: 'Claudia Gray',
//     publish_date: '2022-01-04',
//     wiki_page: 'The_High_Republic:_The_Fallen_Star',
//     illustrator: '',
//     publisher: 'Del Rey',
//     isbn: '9780593355398',
//     pages: 304,
//     timeline: 'c. 231 BBY',
//   },
//   {
//     title: 'Star Wars: The Mandalorian Season 2 Junior Novel',
//     format: 'Junior novel',
//     author: 'Joe Schreiber',
//     publish_date: '2022-01-04',
//     wiki_page: 'Star_Wars:_The_Mandalorian_Season_2_Junior_Novel',
//     illustrator: '',
//     publisher: 'Disney&ndash;Lucasfilm Press',
//     isbn: '9781368075961',
//     pages: 208,
//     timeline: '9 ABY',
//   },
//   {
//     title: 'The Story of the Faithful Wookiee',
//     format: 'Illustrated storybook',
//     author: '',
//     publish_date: '2022-01-04',
//     wiki_page: 'The_Story_of_the_Faithful_Wookiee_(Little_Golden_Book)',
//     illustrator: '',
//     publisher: 'Golden Books',
//     isbn: '9780736442633',
//     pages: 24,
//     timeline: 'Between 0.5 ABY and 1 ABY',
//   },
//   {
//     title: 'Darth Plagueis',
//     format: 'The Essential Legends Collection reprint',
//     author: 'James Luceno',
//     publish_date: '2022-04-05',
//     wiki_page: 'Darth_Plagueis_(novel)',
//     illustrator: '',
//     publisher: '*Del Rey (US)\n*Arrow (UK)',
//     isbn: '034551128X',
//     pages: 379,
//     timeline: '67-65 BBY \n54-52 BBY \n34-32 BBY',
//   },
//   {
//     title: "The Mandalorian: Grogu's Journey",
//     format: 'Hardcover storybook',
//     author: 'Grace Baranowski',
//     publish_date: '2022-05-03',
//     wiki_page: "The_Mandalorian:_Grogu's_Journey",
//     illustrator: 'TomatoFarm',
//     publisher: "Printer's Row",
//     isbn: '9780794446987',
//     pages: 12,
//     timeline: '9 ABY',
//   },
// ];

// BOOKS.sort((book1, book2) => {
//   if(!book1.publish_date){
//     return +1;
//   }
//   if(!book2.publish_date){
//     return -1;
//   }
//   return book1.publish_date > book2.publish_date;
// });



const title = 'List of upcoming books';

const FutureBooks = (props) => {

  const { sendRequest, status, data: BOOKS, error } = useHttp(
    getFutureBooks,
    true
  );

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === 'pending') {
    return (
      <div className='container content'>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className='content'>{error}</p>;
  }

  const numberOfColumns = 4;
let booksInColumns = BOOKS.map((book, i) => {
  const start = 0 + i;
  const end = 0 + i + numberOfColumns;
  if (i % numberOfColumns === 0) {
    return BOOKS.slice(start, end);
  }
  return null;
});
booksInColumns = booksInColumns.filter((book) => book !== null);


  return (
    <section className=''>
      <div className='container'>
        <div className='hero is-primary block'>
          <div className='hero-body '>
            <p className='title'>{title}</p>
            <p className='subtitle aurabesh'>{title}</p>
          </div>
        </div>
        {booksInColumns.map((bookColumn, i) => (
          <div key={i} className='columns '>
            {bookColumn.map((book) => (
              <div key={book.title} className={`column is-one-quarter`}>
                <Book book={book} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FutureBooks;
