import { useSelector, useDispatch } from 'react-redux';

import ImageWithFallback from '../ui/ImageWithFallback';
import { bookFilterActions } from '../../store/book-filter';

const EraFilterButton = ({ label, id }) => {
  const dispatch = useDispatch();
  const { era } = useSelector((state) => state.bookFilter);
  const active = era === id;

  const linkClickHandler = () => {
    const newActiveValue = !active;
    dispatch(bookFilterActions.filterByEra({ value: newActiveValue ? id : '' }));
  };

  return (
    <button
      onClick={linkClickHandler}
      type="button"
      style={{ fontSize: '80%', margin: '0.2rem' }}
      className={`button is-info  ${active ? ' ' : ' is-light'}`}
    >
      {id.includes('can/') && (
        <>
          <ImageWithFallback
            src={`${process.env.REACT_APP_API_BASE}public/eras/${id}.svg`}
            alt=""
            scale="1.5"
            loadingElement={<div />}
          />
          <span className="mr-2" />
        </>
      )}

      {label}
    </button>
  );
};

export default EraFilterButton;
