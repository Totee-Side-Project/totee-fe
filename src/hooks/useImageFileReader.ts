import { useState } from 'react';

const useImageFileReader = (url: any) => {
  const [imageUrl, setImageUrl] = useState(url);
  const fileReader = new FileReader();

  const previewImage = (file: any) => {
    fileReader.onload = () => {
      setImageUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };

  return { imageUrl, previewImage };
};

export default useImageFileReader;
