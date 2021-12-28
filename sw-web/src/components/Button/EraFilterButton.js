import ImageWithFallback from '../ui/ImageWithFallback';

const EraFilterButton = ({ label, onClick, id, active }) => {
  const linkClickHandler = () => {
    const newActiveValue = !active;
    onClick({ type: 'ERA', value: newActiveValue ? id : '' });
  };

  return (
    <button
      onClick={linkClickHandler}
      type="button"
      style={{ overflowWrap: 'break-word', fontSize: '80%' }}
      className={`button is-info is-flex is-align-items-center is-justify-content-center ${
        active ? ' ' : ' is-light'
      }`}
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
