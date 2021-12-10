import { useState } from 'react';

const BooksFilter = () => {
  const [isOnlyCanon, setIsOnlyCanon] = useState(false);
  const [isOnlyLegends, setIsOnlyLegends] = useState(false);
  const [isNoReprints, setIsNoReprints] = useState(false);

  const switchChangeHandler = (event) => {
    if (event.target.id === 'onlyCanonSwitch') {
      setIsOnlyCanon(event.target.checked);
    } else if (event.target.id === 'onlyCanonSwitch') {
      setIsOnlyLegends(event.target.checked);
    } else if (event.target.id === 'noReprintsSwitch') {
      setIsNoReprints(event.target.checked);
    }
  };

  return (
    <div class='level'>
      <div class='level-item has-text-centered'>
        <div class='field'>
          <input
            type='checkbox'
            name='onlyCanonSwitch'
            id='onlyCanonSwitch'
            class='switch is-info is-rounded'
            onChange={switchChangeHandler}
          />
          <label for='onlyCanonSwitch'>
            Show only
            <span className='tag is-info is-light  is-medium'>canon</span> books
          </label>
        </div>
      </div>
      <div class='level-item has-text-centered'>
        <div class='field'>
          <input
            type='checkbox'
            name='onlyLegendsSwitch'
            id='onlyLegendsSwitch'
            class='switch is-danger is-rounded'
            onChange={switchChangeHandler}
          />
          <label for='onlyLegendsSwitch'>
            Show only
            <span className='tag is-danger  is-light is-medium'>
              legends
            </span>{' '}
            books
          </label>
        </div>
      </div>
      <div class='level-item has-text-centered'>
        <div class='field'>
          <input
            type='checkbox'
            name='noReprintsSwitch'
            id='noReprintsSwitch'
            class='switch is-default is-rounded'
            onChange={switchChangeHandler}
          />
          <label for='noReprintsSwitch'>
            Don't show
            <span className='tag is-danger is-light is-medium'>reprints</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default BooksFilter;
