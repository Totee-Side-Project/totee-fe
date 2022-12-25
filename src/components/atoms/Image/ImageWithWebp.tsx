import { ImgHTMLAttributes } from 'react';

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  media?: string;
  srcSet: string;
}

export const ImageWithWebp = ({ media, srcSet, ...props }: Props) => {
  return (
    <picture>
      <source type="image/webp" media={media} srcSet={srcSet} />
      <img {...props} />
    </picture>
  );
};
