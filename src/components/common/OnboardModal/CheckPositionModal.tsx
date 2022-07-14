import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

import { Button } from '@components/atoms';

import classes from './onboardmodal.module.scss';
import { IModalPropsType } from 'types/modal.types';

export default function CheckPositionModal({ step, setStep,values, setValues, setIsOpenModal, onClickConfimButton }: IModalPropsType) {
  const [selectedPosition, setSelectedPosition] = useState('');

  const positionList:any = {
    '프론트엔드': "FRONT_END",
    '백엔드' : "BACK_END",
    'ML': "ML",
    '게임': "GAME",
    '안드로이드': "ANDROID",
    'IOS':" IOS",
    '디자인' :"DESIGN",
    '기타':"OTHERS",
  };


  useEffect(()=>{
    setValues({
      ...values,
      ["position"]:selectedPosition
    })
  },[selectedPosition])


  return (
    <>
      <h1>
        <span>토티</span> 에 처음 방문하셨군요?
      </h1>
      <h2>희망하시거나 현재 속해있는 포지션을 선택해주세요.</h2>
      <div className={classes.body2}>
        <div className={classes.grid}>
          {Object.keys(positionList).map((position: string, _) => (
            <div
              className={classNames(
                classes.tag,
                positionList[position] === selectedPosition ? classes.selected : '',
              )}
              key={`position-${position}`}
              onClick={() => setSelectedPosition(positionList[position])}
            >
              {position}
            </div>
          ))}
        </div>
      </div>
      <div className={classes.footer}>
        <Button
          text="이전으로"
          style={{
            width: '100%',
            backgroundColor: '#fff',
            color: 'rgba(137, 137, 137, 1)',
            border: '2px solid #C9C9C9',
          }}
          onClick={() => setStep(step - 1)}
        />
        <Button
          text="완료"
          style={{
            width: '100%',
            backgroundColor: 'rgba(86, 138, 53, 1)',
            color: '#fff',
          }}
          onClick={onClickConfimButton}
          disable={selectedPosition? false: true}
        />
      </div>
      <div className={classes.page}>2/2</div>
    </>
  );
}
