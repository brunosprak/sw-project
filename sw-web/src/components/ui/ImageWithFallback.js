import React, { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import classes from './ImageWithFallback.module.css';

const ImageWithFallback = ({ src, onFallback, alt, width = '200px', height = '200px' }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [imageWidth, setImageWidth] = useState(width);
  const [imageHeight, setImageHeight] = useState(height);

  const onErrorHandler = () => {
    setImgSrc(onFallback);
    setIsVisible(true);
    setIsLoading(false);
  };
  const onLoadHandler = () => {
    setIsLoading(false);
    setIsVisible(true);

    // we need an initial value for the image so that lazy loading works
    // here we restore them to their original size.
    setImageHeight('100%');
    setImageWidth('100%');
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <img
        loading="lazy"
        className={`image ${isVisible ? classes.visible : classes.invisible}`}
        src={imgSrc || onFallback}
        alt={alt}
        style={{ width: imageWidth, height: imageHeight }}
        onLoad={onLoadHandler}
        onError={onErrorHandler}
      />
    </>
  );
};
export default ImageWithFallback;
