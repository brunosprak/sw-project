import React, { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import classes from './ImageWithFallback.module.css';

const ImageWithFallback = ({ src, onFallback, ...props }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const onErrorHandler = () => {
    setImgSrc(onFallback);
    setIsVisible(true);
    setIsLoading(false);
  };
  const onLoadHandler = () => {
    setIsLoading(false);
    setIsVisible(true);
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <img
        className={`image ${isVisible ? classes.visible : classes.invisible}`}
        src={imgSrc ? imgSrc : onFallback}
        onLoad={onLoadHandler}
        onError={onErrorHandler}
        {...props}
      />
    </>
  );
};
export default ImageWithFallback;
