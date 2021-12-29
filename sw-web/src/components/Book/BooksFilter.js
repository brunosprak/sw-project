import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getEraNamesByCanonicity } from '../../lib/api';
import EraFilterButton from '../Button/EraFilterButton';
import { bookFilterActions } from '../../store/book-filter';

const BooksFilter = () => {
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);
  const { canonicity, era: activeEra, reprint } = useSelector((state) => state.bookFilter);
  const dispatch = useDispatch();

  const switchChangeHandler = (event) => {
    if (event.target.name === 'onlyCanon') {
      return dispatch(
        bookFilterActions.filterByCanonicity({ value: event.target.checked ? 'canon' : '' })
      );
    }

    if (event.target.name === 'onlyLegends') {
      return dispatch(
        bookFilterActions.filterByCanonicity({ value: event.target.checked ? 'legends' : '' })
      );
    }

    if (event.target.name === 'onlyOther') {
      return dispatch(
        bookFilterActions.filterByCanonicity({ value: event.target.checked ? 'other' : '' })
      );
    }

    if (event.target.name === 'onlyReprints') {
      return dispatch(
        bookFilterActions.filterByReprint({ value: event.target.checked ? 'reprint' : '' })
      );
    }

    if (event.target.name === 'noReprints') {
      return dispatch(
        bookFilterActions.filterByReprint({ value: event.target.checked ? 'noreprint' : '' })
      );
    }

    return false;
  };

  const CANON_ERAS = getEraNamesByCanonicity('canon');
  const LEGENDS_ERAS = getEraNamesByCanonicity('legends');

  const ERAS = { legends: LEGENDS_ERAS, canon: CANON_ERAS };

  const toggleFiltersClickHandler = () => {
    setShowFiltersMobile(!showFiltersMobile);
  };

  const toggleFiltersKeydownHandler = (event) => {
    // this prevents this from scrolling down if space is pressed
    if (event.keyCode === 13 || event.keyCode === 32) {
      setShowFiltersMobile(!showFiltersMobile);
    }
  };

  const closeFiltersHandler = () => {
    setShowFiltersMobile(false);
  };

  return (
    <>
      {!showFiltersMobile && (
        <div
          role="button"
          className="box is-hidden-tablet has-text-centered"
          style={{ padding: '0' }}
          onClick={toggleFiltersClickHandler}
          onKeyDown={toggleFiltersKeydownHandler}
          tabIndex={0}
        >
          <button tabIndex={-1} type="button" className="button " style={{ border: 'none' }}>
            <img
              src={`${process.env.PUBLIC_URL}/images/filter.svg`}
              alt="filters"
              className=" "
              style={{ width: '2rem' }}
            />
            <figcaption>Show filters</figcaption>
          </button>
        </div>
      )}
      <div className={`box ${showFiltersMobile ? '' : 'is-hidden-mobile'} mb-5`}>
        <button
          className="delete  is-pulled-right is-medium is-hidden-tablet"
          type="button"
          onClick={closeFiltersHandler}
        >
          Close filters
        </button>
        <div className="level">
          <div className="level-item  level-left has-text-centered">
            <div className="field">
              <strong>Filters</strong>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div className="field">
              <input
                key={Math.random()}
                type="checkbox"
                name="onlyCanon"
                defaultChecked={canonicity === 'canon'}
                id="onlyCanonSwitch"
                className="switch is-info is-rounded"
                onChange={switchChangeHandler}
              />
              <label htmlFor="onlyCanonSwitch">
                Show only
                <span className="tag is-info is-light  is-medium">canon</span>
              </label>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div className="field">
              <input
                key={Math.random()}
                type="checkbox"
                name="onlyLegends"
                defaultChecked={canonicity === 'legends'}
                id="onlyLegendsSwitch"
                className="switch is-danger is-rounded"
                onChange={switchChangeHandler}
              />
              <label htmlFor="onlyLegendsSwitch">
                Show only
                <span className="tag is-danger  is-light is-medium">legends</span>
              </label>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div className="field">
              <input
                key={Math.random()}
                type="checkbox"
                name="onlyOther"
                id="onlyOtherSwitch"
                defaultChecked={canonicity === 'other'}
                className="switch is-rounded"
                onChange={switchChangeHandler}
              />
              <label htmlFor="onlyOtherSwitch">
                Show only
                <span className="tag  is-medium">other</span>
              </label>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div className="field">
              <input
                key={Math.random()}
                type="checkbox"
                name="noReprints"
                id="noReprintsSwitch"
                defaultChecked={reprint === 'noreprint'}
                className="switch is-default is-rounded"
                onChange={switchChangeHandler}
              />
              <label htmlFor="noReprintsSwitch">
                Don't show
                <span className="tag is-danger is-light is-medium">reprints</span>
              </label>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div className="field">
              <input
                key={Math.random()}
                type="checkbox"
                name="onlyReprints"
                id="onlyReprintsSwitch"
                defaultChecked={reprint === 'reprint'}
                className="switch is-default is-rounded"
                onChange={switchChangeHandler}
              />
              <label htmlFor="onlyReprintsSwitch">
                Only
                <span className="tag is-danger is-light is-medium">reprints</span>
              </label>
            </div>
          </div>
        </div>
        {ERAS[canonicity] && (
          <div>
            <strong>Eras:</strong>
            <span className="ml-4" />
            {ERAS[canonicity].map((eraName) => (
              <span key={eraName.id}>
                <EraFilterButton
                  id={eraName.id}
                  active={activeEra === eraName.id}
                  label={eraName.label}
                />
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default BooksFilter;
