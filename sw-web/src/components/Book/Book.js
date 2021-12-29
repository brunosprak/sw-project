import classes from './Book.module.css';
import ImageWithFallback from '../ui/ImageWithFallback';
import DatePage from '../ui/DatePage';
import { getEraNameByAcronym, getImageUrl } from '../../lib/api';
import AmazonIcon from '../ui/icons/AmazonIcon';
import WookieepediaIcon from '../ui/icons/WookieepediaIcon';

const Book = (props) => {
  const fallbackHandler = () => '/images/image-not-found-bw.png';

  return (
    <div className={`card ${classes.book} `}>
      <header className={`card-header ${classes.header}`}>
        <button type="button" className="card-header-icon" aria-label="more options">
          <DatePage date={new Date(props.book.publish_date)} />
        </button>
        <p className={`card-header-title ${classes.title}`} title={props.book.title}>
          {props.book.title}
        </p>
      </header>
      <div className={`card-content ${classes.content}`}>
        <div className="">
          <div className="">
            <figure className="image">
              <ImageWithFallback
                src={props.book.isbn10 ? getImageUrl(props.book.isbn10) : fallbackHandler()}
                alt="Book cover"
                width="500px"
                height="230px"
                onFallback={fallbackHandler}
                lazy
              />
            </figure>
          </div>

          <div className="tags mt-2 has-text-centered is-medium is-centered">
            {props.book.canonicity === 'canon' && (
              <span className={`tag is-info ${classes.tag}`}>{props.book.canonicity}</span>
            )}
            {props.book.canonicity === 'legends' && (
              <span className={`tag is-danger ${classes.tag}`}>{props.book.canonicity}</span>
            )}
            {props.book.canonicity === 'other' && (
              <span className={`tag  ${classes.tag}`}>{props.book.canonicity}</span>
            )}
            <span className={`tag is-info is-light ${classes.tag}`}>{props.book.format}</span>
            {props.book.reprint && (
              <span className={`tag is-danger is-light ${classes.tag}`}>reprint</span>
            )}
            {props.book.era && (
              <span className={`tag is-warning is-light ${classes.tag}`}>
                {getEraNameByAcronym(props.book.era)}
              </span>
            )}
            {props.book.pages && (
              <span className={`tag is-link is-light ${classes.tag}`}>
                {props.book.pages} pages
              </span>
            )}
            {props.book.author && (
              <span className={`tag is-primary is-light ${classes.tag}`}>{props.book.author}</span>
            )}
          </div>
        </div>
      </div>
      <footer className="card-footer">
        {props.book.isbn10 && (
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.amazon.com/dp/${props.book.isbn10}?tag=${process.env.REACT_APP_AMAZON_ID}`}
            className="card-footer-item"
          >
            <AmazonIcon />
          </a>
        )}
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://starwars.fandom.com/${props.book.wiki_page}`}
          className="card-footer-item"
        >
          <WookieepediaIcon />
        </a>
      </footer>
    </div>
  );
};

export default Book;
