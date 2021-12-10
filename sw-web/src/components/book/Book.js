import classes from './Book.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import ImageWithFallback from '../ui/ImageWithFallback';
import DatePage from '../ui/DatePage';
import { getImageUrl } from '../../lib/api';
import AmazonIcon from '../ui/icons/AmazonIcon';
import WookieepediaIcon from '../ui/icons/WookieepediaIcon';

const Book = (props) => {
  const fallbackHandler = () => {
    return '/images/image-not-found-bw.png';
  };

  const subtext = (str) => {
    if (!str) {
      return str;
    }
    return str.replaceAll(': ', ':\n');

    // return str.replace(/(.{35})..+/, "$1…");
  };

  return (
    <div className={`card ${classes.book} `}>
      <header className={`card-header ${classes.header}`}>
        <button className='card-header-icon' aria-label='more options'>
          {/* <span className='icon'> */}
          {/* <FontAwesomeIcon icon={faAngleDown} /> */}
          <DatePage date={new Date(props.book.publish_date)} />
          {/* </span> */}
        </button>
        <p
          className='card-header-title '
          title={props.book.title}
          style={{ whiteSpace: 'pre-wrap' }}
        >
          {subtext(props.book.title)}
        </p>
      </header>
      <div className={`card-content ${classes['content']}`}>
        <div className=''>
          {/* <div className='columns '>
            <div className='column'>
              <DatePage date={new Date(props.book.publish_date)} />
            </div>
            <div className='column aligned-center'>
              <span className="tag is-size-4">CANON</span>
            </div>
          </div> */}
         
          <div className=''>
            <figure className='image'>
              <ImageWithFallback
                src={getImageUrl(props.book.wiki_page)}
                alt='Book cover'
                onFallback={fallbackHandler}
              />
            </figure>
            
          </div>

          <div className='tags mt-2 has-text-centered is-medium is-centered'>
            {props.book.canonicity === 'canon' && (
                <span
                  className={`tag is-info ${classes.tag}`}
                >
                  canon
                </span>
              )}
              {props.book.canonicity !== 'canon' && (
                <span
                  className={`tag is-danger ${classes.tag}`}
                >
                  legends
                </span>
              )}
              <span
                className={`tag is-info is-light ${classes.tag}`}
              >
                {props.book.format}
              </span>
              {props.book.reprint && (
                <span
                  className={`tag is-danger is-light ${classes.tag}`}
                >
                  reprint
                </span>
              )}
              
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
          <AmazonIcon />
        </a>
        <a
          target='_blank'
          rel='noreferrer'
          href={`https://starwars.fandom.com/${props.book.wiki_page}`}
          className='card-footer-item'
        >
         <WookieepediaIcon />
        </a>
      </footer>
    </div>
  );
};

export default Book;
