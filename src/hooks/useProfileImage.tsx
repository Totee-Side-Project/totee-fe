import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { UserState } from '@store/user';

import removeImg from '../assets/removeImg.svg';
import changeImg from '../assets/changeImg.svg';

export default function useUploadImage(props: any) {
  const [user, setUser] = useRecoilState(UserState);
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

  const resetFiles = () => {
    setFiles(undefined);
  };

  const handleInitialImage = () => {
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

  const UploadImage = () => {
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
          id="profile"
          multiple
          accept="image/*"
          onChange={onImgChange}
          style={{ display: 'none' }}
        ></input>
      </div>
    );
  };

  const UploadBackgroundImage = () => {
    return (
      <div className="edit_myImgBtnWrapper">
        <img
          className="edit_myChangeImg"
          src={changeImg}
          onClick={onPhotoBtnClick}
        />
        <img
          className="edit_myRemoveImg"
          src={removeImg}
          onClick={() => {
            handleInitialImage();
          }}
        />
        <input
          ref={ImgInput}
          type="file"
          id="background"
          multiple
          accept="image/*"
          onChange={onImgChange}
          style={{ display: 'none' }}
        ></input>
      </div>
    );
  };

  return {
    UploadImage,
    UploadBackgroundImage,
    ImgPlaceholder,
    files,
    setFiles,
    handleInitialImage,
    onPhotoBtnClick,
    resetFiles,
  };
}
