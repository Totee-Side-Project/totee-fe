import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Input } from '@components/atoms';
import classes from './onboardmodal.module.scss';

export default function AddProfileModal({ step, setStep }: IModalPropsType) {
  const [value, setValue] = useState('');
  const [files, setFiles] = useState<any>();
  const ImgInput = useRef<HTMLInputElement>(null);
  const ImgPlaceholder = useRef<HTMLDivElement>(null);

  useEffect(() => {
    preview();

    return () => preview();
  });

  const preview = () => {
    if (!files) return false;

    const imgEl = ImgPlaceholder.current as HTMLDivElement;
    const reader = new FileReader();

    reader.onload = () => {
      imgEl.style.backgroundRepeat = 'no-repeat';
      imgEl.style.backgroundSize = 'cover';
      imgEl.style.backgroundImage = `url(${reader.result})`;
    };

    reader.readAsDataURL(files[0]);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
  };

  const onPhotoBtnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (ImgInput) {
      ImgInput.current!.click();
    }
  };

  const onImgChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    setFiles(file);
  };

  return (
    <>
      <h1>
        <span>토티</span> 에 처음 방문하셨군요?
      </h1>
      <h2>사용하실 프로필 사진과 닉네임을 입력해주세요</h2>
      <div className={classes.body}>
        <div
          className={classes.imagePlaceholder}
          onClick={onPhotoBtnClick}
          ref={ImgPlaceholder}
        >
          <div className={classes.imageButton}></div>
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
        <div className={classes.flex}>
          <div style={{ width: '100%' }}>
            <Input
              value={value}
              label="닉네임"
              type="text"
              name="nickname"
              id="nickname"
              placeholder="최대 5글자"
              onChange={onChange}
            />
          </div>
          <Button
            text="중복확인"
            style={{
              backgroundColor: '#fff',
              color: 'rgba(137, 137, 137, 1)',
              border: '2px solid #C9C9C9',
            }}
          />
        </div>
      </div>
      <div className={classes.footer}>
        <Button
          text="이전으로"
          style={{
            width: '210px',
            backgroundColor: '#fff',
            color: 'rgba(137, 137, 137, 1)',
            border: '2px solid #C9C9C9',
          }}
          onClick={() => setStep(step - 1)}
        />
        <Button
          text="다음으로"
          style={{
            width: '210px',
            backgroundColor: 'rgba(86, 138, 53, 1)',
            color: '#fff',
          }}
          onClick={() => setStep(step + 1)}
        />
      </div>
      <div className={classes.page}>1/2</div>
    </>
  );
}
