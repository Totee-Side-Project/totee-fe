import React, { useEffect, useRef, useState } from 'react';

export default function useProfileImage(props: any) {
  const [files, setFiles] = useState<any>();

  const ImgInput = useRef<HTMLInputElement>(null);
  const ImgPlaceholder = useRef<HTMLDivElement>(null);

  const onImgChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    setFiles(file);
  };

  useEffect(() => {
    handleInitialImage();
  }, [props]);

  useEffect(() => {
    preview();

    return () => preview();
  });

  const handleInitialImage = () => {
    if (!props?.initialImage) return;
    const imgEl = ImgPlaceholder.current as HTMLDivElement;
    if (!imgEl) return;
    imgEl.style.backgroundRepeat = 'no-repeat';
    imgEl.style.backgroundSize = 'cover';
    imgEl.style.backgroundImage = `url(${props.initialImage})`;
  };

  const preview = (): any => {
    if (!files) return;

    const reader = new FileReader();

    const imgEl = ImgPlaceholder.current as HTMLDivElement;

    if (!imgEl) return;

    reader.onload = () => {
      imgEl.style.backgroundRepeat = 'no-repeat';
      imgEl.style.backgroundSize = 'cover';
      imgEl.style.backgroundImage = `url(${reader.result})`;
    };

    reader.readAsDataURL(files);
  };

  const onPhotoBtnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (ImgInput) {
      ImgInput.current!.click();
    }
  };
  const ProfileImage = () => {
    return (
      <div
        style={{
          width: '135px',
          height: '135px',
          background: '#EBEBEB',
          borderRadius: '100%',
          margin: '0 auto',
          cursor: 'pointer',
        }}
        onClick={onPhotoBtnClick}
        ref={ImgPlaceholder}
      >
        <div></div>
        <input
          ref={ImgInput}
          type="file"
          id="photo"
          multiple
          accept="image/*"
          onChange={onImgChange}
          style={{ display: 'none' }}
        ></input>
      </div>
    );
  };

  return {
    ProfileImage,
    files,
    setFiles,
    handleInitialImage,
    onPhotoBtnClick,
  };
}
