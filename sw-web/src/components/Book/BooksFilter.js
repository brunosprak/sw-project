import { useState } from 'react';
import { getEraNamesByCanonicity } from '../../lib/api';
import EraFilterButton from '../Button/EraFilterButton';

const BooksFilter = ({ onChange, canonicity, reprint }) => {
  const [activeEra, setActiveEra] = useState('');
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  const switchChangeHandler = (event) => {
    if (event.target.name === 'onlyCanon') {
      return onChange({ type: 'ONLY_CANONICITY', value: event.target.checked ? 'canon' : '' });
    }

    if (event.target.name === 'onlyLegends') {
      return onChange({ type: 'ONLY_CANONICITY', value: event.target.checked ? 'legends' : '' });
    }

    if (event.target.name === 'onlyOther') {
      return onChange({ type: 'ONLY_CANONICITY', value: event.target.checked ? 'other' : '' });
    }

    if (event.target.name === 'onlyReprints') {
      return onChange({ type: 'ONLY_REPRINT', value: event.target.checked ? 'reprint' : '' });
    }

    if (event.target.name === 'noReprints') {
      return onChange({ type: 'ONLY_REPRINT', value: event.target.checked ? 'noreprint' : '' });
    }

    return false;
  };

  const eraClickHandler = (action) => {
    onChange(action);
    setActiveEra(action.value);
  };

  const CANON_ERAS = getEraNamesByCanonicity('canon');
  const LEGENDS_ERAS = getEraNamesByCanonicity('legends');

  const toggleFiltersHandler = () => {
    setShowFiltersMobile(!showFiltersMobile);
  };

  const closeFiltersHandler = () => {
    setShowFiltersMobile(false);
  };

  return (
    <>
      <div className="box is-hidden-tablet has-text-centered">
        <button
          type="button"
          className="button "
          style={{ border: 'none' }}
          onClick={toggleFiltersHandler}
        >
          <img
            src={`${process.env.PUBLIC_URL}/images/filter.svg`}
            alt="filters"
            className=" "
            style={{ width: '2rem' }}
          />
          <figcaption>Show filters</figcaption>
        </button>
      </div>
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
        {canonicity === 'canon' && (
          <div className="level level-left">
            <div className="mr-4">
              <strong>Canon eras:</strong>
            </div>
            <div className="columns is-vcentered is-multiline ">
              {CANON_ERAS.map((canonEra) => (
                <div key={canonEra.id} className="column  ">
                  <EraFilterButton
                    id={canonEra.id}
                    active={activeEra === canonEra.id}
                    label={canonEra.label}
                    onClick={eraClickHandler}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        {canonicity === 'legends' && (
          <div className="level level-left  ">
            <div className="mr-4" name>
              <strong>Legends eras:</strong>
            </div>
            <div className="columns is-vcentered is-multiline ">
              {LEGENDS_ERAS.map((canonEra) => (
                <div key={canonEra.id} className="column  ">
                  <EraFilterButton
                    id={canonEra.id}
                    active={activeEra === canonEra.id}
                    label={canonEra.label}
                    onClick={eraClickHandler}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BooksFilter;
