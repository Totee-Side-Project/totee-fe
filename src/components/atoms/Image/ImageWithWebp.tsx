import { ImgHTMLAttributes } from 'react';

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  media?: string;
  src: string;
  alt: string;
  srcSet: string;
}

export const ImageWithWebp = ({ media, src, alt, srcSet, ...props }: Props) => {
  return (
    <picture>
      <source type="image/webp" media={media} srcSet={srcSet} />
      <img src={src} alt={alt} {...props} />
    </picture>
  );
};
