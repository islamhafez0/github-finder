import { useState } from "react";

type ImageAttributesTypes = {
  src: string;
  alt: string;
  className?: string;
};

const LazyLoadImage = ({ src, alt, className }: ImageAttributesTypes) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const handleImageLoaded = () => {
    setImageLoaded(true);
  };
  return (
    <img
      src={src}
      alt={alt}
      onLoad={handleImageLoaded}
      className={`${className} ${imageLoaded ? "" : "imageIsLoading"}`}
    />
  );
};

export default LazyLoadImage;
