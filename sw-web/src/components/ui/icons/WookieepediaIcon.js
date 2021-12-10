import classes from './Wookieepedia.module.css';

const WookieepediaIcon = ({label = 'Wiki', ...props}) => {
  return (
    <>
      <img
        className={classes.icon}
        alt='Wookipedia logo'
        src={`${process.env.PUBLIC_URL}/images/wookieepedia.png`}
      />
      &nbsp;&nbsp;{label}
    </>
  );
};

export default WookieepediaIcon;
