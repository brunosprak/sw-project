import Book from '../components/book/Book';
import useHttp from '../hooks/use-http';
import { getFutureBooks } from '../lib/api';
import { useEffect, useCallback } from 'react';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import BooksFilters from '../components/book/BooksFilter';

const title = 'List of upcoming books';

const FutureBooks = (props) => {
  const {
    sendRequest,
    status,
    data: BOOKS,
    error,
  } = useHttp(getFutureBooks, true);

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

  // const filterHandler = (action) => {
  //   if(){

  //   }
  // };

  return (
    <section className=''>
      <div className='container'>
        <div className='hero is-primary block'>
          <div className='hero-body '>
            <p className='title'>{title}</p>
            <p className='subtitle aurabesh'>{title}</p>
          </div>
        </div>
        {/* <BooksFilters onFilter={filterHandler}/> */}
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
