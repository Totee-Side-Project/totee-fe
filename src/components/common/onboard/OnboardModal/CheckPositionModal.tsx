import { useEffect, useState } from 'react';
import classNames from 'classnames';

import { Button } from '@components/atoms';
import { IModalPropsType } from 'types/modal.types';
import classes from './onboardmodal.module.scss';
import { POSITION_LIST } from 'constants/position.';

export default function CheckPositionModal({
  step,
  setStep,
  values,
  setValues,
  onClickConfimButton,
}: IModalPropsType) {
  const [selectedPosition, setSelectedPosition] = useState('');

  useEffect(() => {
    setValues({
      ...values,
      ['position']: selectedPosition,
    });
  }, [selectedPosition]);

  return (
    <>
      <h1>
        <span>토티</span> 에 처음 방문하셨군요?
      </h1>
      <h2>희망하시거나 현재 속해있는 포지션을 선택해주세요.</h2>
      <div className={classes.body2}>
        <div className={classes.grid}>
          {Object.keys(POSITION_LIST).map((position: string, _) => (
            <div
              className={classNames(
                classes.tag,
                POSITION_LIST[position] === selectedPosition
                  ? classes.selected
                  : '',
              )}
              key={`position-${position}`}
              onClick={() => setSelectedPosition(POSITION_LIST[position])}
            >
              {position}
            </div>
          ))}
        </div>
      </div>
      <div className={classes.footer}>
        <Button
          center="이전으로"
          style={{
            width: '100%',
            backgroundColor: '#fff',
            color: 'rgba(137, 137, 137, 1)',
            border: '2px solid #C9C9C9',
          }}
          onClick={() => setStep(step - 1)}
        />
        <Button
          center="완료"
          style={{
            width: '100%',
            backgroundColor: 'rgba(86, 138, 53, 1)',
            color: '#fff',
          }}
          onClick={onClickConfimButton}
          disabled={selectedPosition ? false : true}
        />
      </div>
      <div className={classes.page}>2/2</div>
    </>
  );
}
