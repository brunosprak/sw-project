import React from 'react';
import classes from './DatePage.module.css';

const DatePage = (props) => {
  const monthShort = props.date
    .toLocaleString('en-US', { month: 'short' })
    .toUpperCase();
    const monthLong = props.date
    .toLocaleString('en-US', { month: 'long' })
    .toUpperCase();
  const month = props.date.toLocaleString('en-US', { day: '2-digit' });

  const day = props.date.toLocaleString('en-US', { day: '2-digit' });
  const year = props.date.getFullYear();
  const currentYear = new Date().getFullYear();

  return (
    <time datetime={`${year}-${month}-${day}`} class={classes.icon}>
      {/* <em>Saturday</em> */}
      <strong>{currentYear === year ? monthLong : monthShort + ' / ' + year}</strong>
      <span>{day}</span>
    </time>
  );
};

export default DatePage;
