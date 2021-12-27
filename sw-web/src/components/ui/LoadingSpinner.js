import classes from './LoadingSpinner.module.css';

const LoadingSpinner = () => (
  <div className="columns is-centered">
    <div className="column has-text-centered">
      <div className={classes.spinner} />
    </div>
  </div>
);

export default LoadingSpinner;
