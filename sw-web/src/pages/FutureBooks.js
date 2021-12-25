import { useEffect, useState } from 'react';
import Book from '../components/book/Book';
import useHttp from '../hooks/use-http';
import { getFutureBooks } from '../lib/api';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import BooksFilter from '../components/book/BooksFilter';

const title = 'List of upcoming books';

const FutureBooks = () => {
  const { sendRequest, status, data: BOOKS, error } = useHttp(getFutureBooks, true);
  const [isNoReprints, setIsNoReprints] = useState(false);
  const [isOnlyCanon, setIsOnlyCanon] = useState(false);
  const [isOnlyLegends, setIsOnlyLegends] = useState(false);
  const [isOnlyOther, setIsOnlyOther] = useState(false);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === 'pending') {
    return (
      <div className="container content">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="content">{error}</p>;
  }

  let filteredBooks = BOOKS.filter((book) => book !== null);

  filteredBooks = filteredBooks.filter((book) => {
    if (isNoReprints) {
      return !book.reprint;
    }
    return true;
  });

  filteredBooks = filteredBooks.filter((book) => {
    if (isOnlyCanon) {
      return book.canonicity === 'canon';
    }
    return true;
  });

  filteredBooks = filteredBooks.filter((book) => {
    if (isOnlyLegends) {
      return book.canonicity === 'legends';
    }
    return true;
  });
  filteredBooks = filteredBooks.filter((book) => {
    if (isOnlyOther) {
      return book.canonicity === 'other';
    }
    return true;
  });

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
    if (action.type === 'noReprints') {
      setIsNoReprints(action.value);
    } else if (action.type === 'onlyCanon') {
      setIsOnlyCanon(action.value);
    } else if (action.type === 'onlyLegends') {
      setIsOnlyLegends(action.value);
    } else if (action.type === 'onlyOther') {
      setIsOnlyOther(action.value);
    }
  };

  return (
    <section className="">
      <div className="container">
        <div className="hero is-primary block">
          <div className="hero-body " style={{ padding: '2rem 1.5rem' }}>
            <p className="title">{title}</p>
            <p className="subtitle aurabesh">{title}</p>
          </div>
        </div>
        <BooksFilter numberOfBooks={filteredBooks.length} onChange={filterHandler} />
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
      </div>
    </section>
  );
};

export default FutureBooks;
