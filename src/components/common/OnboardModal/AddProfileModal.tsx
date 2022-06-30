import React, { useCallback, useRef, useState } from 'react';
import { Button, Input } from '@components/atoms';
import classes from './onboardmodal.module.scss';
import { IModalPropsType } from 'types/modal.types';

export default function AddProfileModal({ step, setStep }: IModalPropsType) {
  const [value, setValue] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [attachment, setAttachment] = useState();
  const [fileName, setFileNames] = useState<string>();
  const ImgInput = useRef<HTMLInputElement>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
  };

  const onPhotoBtnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (ImgInput) {
      ImgInput.current!.click();
    }
  };

  const onImgChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const imageLists = e.target.files;
      let attach: any = attachment;
      let imageUrlLists: any = [...photos];
      let names = [];

      // if (imageLists) {
      //   for (let i = 0; i < imageLists.length; i++) {
      //     // 파일이름 저장
      //     names.push(imageLists[i].name);
      //     // 서버에 저장할 인코딩 파일 저장
      //     const reader = new FileReader();
      //     reader.readAsDataURL(imageLists[i]);
      //     reader.onloadend = () => {
      //       let base64data = reader.result;
      //       attach.push(base64data);
      //     };
      //     // 현재 이미지 URL 저장 (프리뷰용)
      //     const currentImageUrl = URL.createObjectURL(imageLists[i]);
      //     imageUrlLists.push(currentImageUrl);
      //   }
      // }
      // setFileNames(names);
      // setAttachment(attach);
      // setPhotos(imageUrlLists);
    },
    [photos],
  );

  return (
    <>
      <h1>
        <span>토티</span> 에 처음 방문하셨군요?
      </h1>
      <h2>사용하실 프로필 사진과 닉네임을 입력해주세요</h2>
      <div className={classes.body}>
        <div className={classes.imagePlaceholder} onClick={onPhotoBtnClick}>
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
