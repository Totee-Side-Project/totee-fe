import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Input } from '@components/atoms';
import classes from './onboardmodal.module.scss';
import { IModalPropsType } from 'types/modal.types';
import { UserAPI } from '@api/api';
import classNames from 'classnames';
import { useRecoilState } from 'recoil';
import { UserState } from '@store/index';

export default function AddProfileModal({ step, setStep, values, setValues}: IModalPropsType) {
  const [nickname, setNickname] = useState('');
  const [files, setFiles] = useState<any>();
  const [isValidate, setIsValidate]=useState<boolean>(false);
  const [isShowErrorMsg, setIsShowErrorMsg]=useState<boolean>(false);
  const ImgInput = useRef<HTMLInputElement>(null);
  const ImgPlaceholder = useRef<HTMLDivElement>(null);

  const [user, setUser] = useRecoilState(UserState);

  useEffect(() => {
    preview();

    return () => preview();
  });

  useEffect(()=>{
    setValues({
      ...values,
      ["nickname"]:nickname
    })
  },[nickname])

  const preview = (): any => {
    if (!files) return;

    const reader = new FileReader();

    const imgEl = ImgPlaceholder.current as HTMLDivElement;

    if(!imgEl) return;
    reader.onload = () => {
      imgEl.style.backgroundRepeat = 'no-repeat';
      imgEl.style.backgroundSize = 'cover';
      imgEl.style.backgroundImage = `url(${reader.result})`;
    };

    reader.readAsDataURL(files);
  };



  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNickname(value);
    setIsValidate(false);
  };

  const onPhotoBtnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (ImgInput) {
      ImgInput.current!.click();
    }
  };

  const onImgChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    setFiles(file);
    setValues({
      ...values,
      ["profileImage"]:file,
    })
  };

  const onClickValidate=async()=>{

    await UserAPI
    .validateNickname(nickname)
    .then((res)=>{
      if(res.status===200){
        res.data.body.message ==="?????? ????????? ??????????????????." && setIsShowErrorMsg(false);
        setIsValidate(true);
      }
      else{
        setIsShowErrorMsg(true);
        setIsValidate(true);
      }
    })
    .catch((err)=>err)
  }

  return (
    <>
      <h1>
        <span>??????</span> ??? ?????? ???????????????????
      </h1>
      <h2>???????????? ????????? ????????? ???????????? ??????????????????</h2>
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
              value={nickname}
              label="?????????"
              type="text"
              name="nickname"
              id="nickname"
              placeholder="?????? 5??????"
              onChange={onChange}
            />
          </div>
          <Button
            text="????????????"
            style={{
              backgroundColor: '#fff',
              color: 'rgba(137, 137, 137, 1)',
              border: '2px solid #C9C9C9',
            }}
            onClick={onClickValidate}
          />
        </div>
          <div className={classNames(classes.helperText, isValidate? classes.show: "")}>
            {
                !isShowErrorMsg 
                ? <span className={classes.pass}>????????? ??? ?????? ??????????????????.</span>
                : <span className={classes.fail}>?????? ???????????? ????????? ??????????????????.</span>
            }
          </div>
      </div>
      <div>
        {/* <Button
          text="????????????"
          style={{
            width: '210px',
            backgroundColor: '#fff',
            color: 'rgba(137, 137, 137, 1)',
            border: '2px solid #C9C9C9',
          }}
          onClick={() => setStep(step - 1)}
        /> */}
        <Button
          text="????????????"
          style={{
            width: '100%',
            backgroundColor: 'rgba(86, 138, 53, 1)',
            color: '#fff',
          }}
          onClick={() => setStep(step + 1)}
          disable={files && nickname && !isShowErrorMsg && isValidate ? false: true}
        />
      </div>
      <div className={classes.page}>1/2</div>
    </>
  );
}
