import React, { useState } from 'react';
import { Button, Input } from '@components/atoms';
import classes from './onboardmodal.module.scss';
import { IModalPropsType } from 'types/modal.types';
import classNames from 'classnames';

export default function CheckPositionModal({ step, setStep }: IModalPropsType) {
  const [selectedPosition, setSelectedPosition] = useState('');

  const positionList = [
    '프론트엔드',
    '백엔드',
    'ML',
    '게임',
    '안드로이드',
    'IOS',
    '디자인',
    '기타',
  ];

  return (
    <>
      <h1>
        <span>토티</span> 에 처음 방문하셨군요?
      </h1>
      <h2>희망하시거나 현재 속해있는 포지션을 선택해주세요.</h2>
      <div className={classes.body2}>
        <div className={classes.grid}>
          {positionList.map((position: string, _) => (
            <div
              className={classNames(
                classes.tag,
                position === selectedPosition ? classes.selected : '',
              )}
              key={`position-${position}`}
              onClick={() => setSelectedPosition(position)}
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
          onClick={() => {}}
        />
      </div>
      <div className={classes.page}>2/2</div>
    </>
  );
}
