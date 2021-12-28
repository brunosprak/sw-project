import { constantCase } from 'constant-case';
import { useState } from 'react';

import EraFilterButton from '../Button/EraFilterButton';

const BooksFilter = ({ onChange, canonicity, reprint }) => {
  const [activeEra, setActiveEra] = useState('');

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

  const CANON_ERAS = [
    { id: 'can/thr', label: 'The High Republic' },
    { id: 'can/fotj', label: 'Fall of the Jedi' },
    { id: 'can/rote', label: 'Reign of the Empire' },
    { id: 'can/aor', label: 'Age of Rebellion' },
    { id: 'can/tnr', label: 'The New Republic' },
    { id: 'can/rotfo', label: 'Rise of The First Order' },
  ];

  const LEGENDS_ERAS = [
    { id: 'leg/pre', label: 'Pre-Republic' },
    { id: 'leg/btr', label: 'Before the Republic' },
    { id: 'leg/old', label: 'Old republic' },
    { id: 'leg/imp', label: 'Rise of the Empire' },
    { id: 'leg/reb', label: 'Rebellion' },
    { id: 'leg/njo', label: 'New Jedi Order' },
    { id: 'leg/lgc', label: 'Legacy' },
  ];

  return (
    <>
      <div className="box mb-5">
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
            <div className="mr-4">
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
