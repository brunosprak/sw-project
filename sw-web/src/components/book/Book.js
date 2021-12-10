import classes from './Book.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
// import { useCallback, useRef } from 'react';
// import { ImageNotFound} from '../ui/icons/ImageNotFound';
// import imageNotFound from './images/image-not-found.svg';
// import ImageNotFound from '../ui/icons/ImageNotFound';
import ImageWithFallback from '../ui/ImageWithFallback';
const Book = (props) => {
  //   const imageRef = useRef();
  //   const handleImageError = useCallback((event, err) => {
  //     // imageRef.current.src = 'http://www.simpleimageresizer.com/static/images/simple-image-resizer-128x128.png';
  //     // imageRef.current.src  = <ImageNotFound/>;
  //     console.log(event);

  //   }, []);

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
            <figure className={`image `}>
              <ImageWithFallback
                src={`http://localhost:9001/book/${props.book.title.replaceAll(
                  ' ',
                  '_'
                )}/cover`}
                alt='Book cover'
                onFallback={fallbackHandler}
              />
              {/* <img ref={imageRef} alt="Book cover"
                onError={handleImageError}
                src={`http://localhost:9001/book/${props.book.title.replaceAll(
                  ' ',
                  '_'
                )}/cover`}
              /> */}
            </figure>
          </div>
        </div>
      </div>
      <footer className='card-footer'>
        <a
          target='_blank'
          rel='noreferrer'
          href={`https://www.amazon.com/s?k=${props.book.isbn}`}
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
