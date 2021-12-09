import classes from './Book.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Book = (props) => {
  return (
    <div className={`card ${classes.book} `}>
      <header className={`card-header ${classes.header}`}>
        <p class='card-header-title'>{props.book.title}</p>
        <button class='card-header-icon' aria-label='more options'>
          <span class='icon'>
          <FontAwesomeIcon icon={faAngleDown}  />
          </span>
        </button>
      </header>
      <div  className={`card-content ${classes['content']}`} >
        <div class='has-text-centered'>
          <div className=''>
            <figure className={`image `}>
              <img
                src={`http://localhost:9001/book/${props.book.title.replaceAll(
                  ' ',
                  '_'
                )}/cover`}
              />
            </figure>
          </div>
        </div>
      </div>
      <footer class='card-footer'>
        <a target="_blank" href={`https://www.amazon.com/s?k=${props.book.isbn}`} class='card-footer-item'>
          Amazon
        </a>
        <a target="_blank" href={`https://starwars.fandom.com/${props.book.title}`} class='card-footer-item'>
          Wiki
        </a>
      </footer>
    </div>
  );
};

export default Book;
