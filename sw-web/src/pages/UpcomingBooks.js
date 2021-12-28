import { useEffect, useState } from 'react';
import Book from '../components/Book/Book';
import useHttp from '../hooks/use-http';
import { getFutureBooks } from '../lib/api';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import BooksFilter from '../components/Book/BooksFilter';

const UpcomingBooks = () => {
  const { sendRequest, status, data: BOOKS, error } = useHttp(getFutureBooks, true);
  const [canonicityFilter, setCanonicityFilter] = useState('');
  const [reprintFilter, setReprintFilter] = useState(false);
  const [eraFilter, setEraFilter] = useState('');

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === 'pending') {
    return (
      <section className="">
        <LoadingSpinner />
      </section>
    );
  }

  if (error) {
    return (
      <section className="">
        <p className="container content">{error} </p>
      </section>
    );
  }
  const filterBooks = (books) => {
    let filteredBooks = books.filter((book) => book !== null);

    filteredBooks = filteredBooks.filter((book) => {
      if (reprintFilter) {
        return (
          (reprintFilter === 'noreprint' && !book.reprint) ||
          (reprintFilter === 'reprint' && book.reprint)
        );
      }
      return true;
    });

    filteredBooks = filteredBooks.filter((book) => {
      if (canonicityFilter) {
        return book.canonicity === canonicityFilter;
      }
      return true;
    });

    filteredBooks = filteredBooks.filter((book) => {
      if (eraFilter) {
        return book.era === eraFilter;
      }
      return true;
    });

    return filteredBooks;
  };

  const filteredBooks = filterBooks(BOOKS);

  const numberOfColumns = 4;
  let booksInColumns = filteredBooks.map((_, i) => {
    const start = 0 + i;
    const end = 0 + i + numberOfColumns;
    if (i % numberOfColumns === 0) {
      return filteredBooks.slice(start, end);
    }
    return null;
  });
  booksInColumns = booksInColumns.filter((book) => book !== null);

  const filterHandler = (action) => {
    if (action.type === 'ONLY_REPRINT') {
      setReprintFilter(action.value);
    } else if (action.type === 'ONLY_CANONICITY') {
      setCanonicityFilter(action.value);
      setEraFilter('');
    } else if (action.type === 'ERA') {
      setEraFilter(action.value);
    }
  };

  const title = 'List of upcoming books';

  return (
    <section className="">
      <div className="container">
        <div className="hero is-primary block mb-0">
          <div className="hero-body " style={{ padding: '2rem 1.5rem' }}>
            <p className="title">
              {title} ({`${filteredBooks.length}`})
            </p>
            <p className="subtitle aurabesh">{title}</p>
          </div>
        </div>
        <BooksFilter
          onChange={filterHandler}
          canonicity={canonicityFilter}
          reprint={reprintFilter}
        />
        {booksInColumns.map((bookColumn, i) => (
          <div
            key={i} // eslint-disable-line react/no-array-index-key -- this is not an entity, but a layout column rendering.
            className="columns"
          >
            {bookColumn.map((book) => (
              <div key={book.title} className="column is-one-quarter">
                <Book book={book} />
              </div>
            ))}
          </div>
        ))}
        {booksInColumns.length === 0 && (
          <div className="box">
            <p>No books found with that criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default UpcomingBooks;
