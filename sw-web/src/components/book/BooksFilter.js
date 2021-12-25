const BooksFilter = ({ numberOfBooks, onChange }) => {
  const switchChangeHandler = (event) => {
    onChange({ type: event.target.name, value: event.target.checked });
  };

  return (
    <div className="level">
      <div className="level-item has-text-centered">
        <div className="field">
          <strong>{numberOfBooks} books</strong>
        </div>
      </div>
      <div className="level-item has-text-centered">
        <div className="field">
          <input
            type="checkbox"
            name="onlyCanon"
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
            type="checkbox"
            name="onlyLegends"
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
            type="checkbox"
            name="onlyOther"
            id="onlyOtherSwitch"
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
            type="checkbox"
            name="noReprints"
            id="noReprintsSwitch"
            className="switch is-default is-rounded"
            onChange={switchChangeHandler}
          />
          <label htmlFor="noReprintsSwitch">
            Don't show
            <span className="tag is-danger is-light is-medium">reprints</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default BooksFilter;
