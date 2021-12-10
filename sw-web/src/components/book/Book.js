import classes from './Book.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import ImageWithFallback from '../ui/ImageWithFallback';

const Book = (props) => {
  const fallbackHandler = () => {
    return '/images/image-not-found-bw.png';
  };

  return (
    <div className={`card ${classes.book} `}>
      <header className={`card-header ${classes.header}`}>
        <p className='card-header-title'>{props.book.title}</p>
        <button className='card-header-icon' aria-label='more options'>
          <span className='icon'>
            <FontAwesomeIcon icon={faAngleDown} />
          </span>
        </button>
      </header>
      <div className={`card-content ${classes['content']}`}>
        <div className='has-text-centered'>
          <div className=''>
            <figure className='image'>
              <ImageWithFallback
                src={`http://localhost:9001/book/${props.book.wiki_page}/cover`}
                alt='Book cover'
                onFallback={fallbackHandler}
              />
            </figure>
            <div class='tags mt-2'>
              <span class={`tag is-medium is-rounded ${classes.tag}`}>
                {props.book.format}
              </span>
            </div>
          </div>
        </div>
      </div>
      <footer className='card-footer'>
        <a
          target='_blank'
          rel='noreferrer'
          href={`https://www.amazon.com/gp/search/?field-isbn=${props.book.isbn}`}
          className='card-footer-item'
        >
          Amazon
        </a>
        <a
          target='_blank'
          rel='noreferrer'
          href={`https://starwars.fandom.com/${props.book.title}`}
          className='card-footer-item'
        >
          Wiki
        </a>
      </footer>
    </div>
  );
};

export default Book;
