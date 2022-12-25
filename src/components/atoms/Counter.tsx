import React, { ButtonHTMLAttributes, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { counterState, counterLabelSelector } from '@store/counter';

export function Counter() {
  const [counter, setCounter] = useRecoilState(counterState);
  const counterLabel = useRecoilValue(counterLabelSelector);

  const onClickButtons = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { id } = e.target as HTMLButtonElement;
    id == 'plus' ? setCounter(counter + 1) : setCounter(counter - 1);
  };

  return (
    <div>
      <div>{counter}</div>
      <div>{counterLabel}</div>
      <button onClick={onClickButtons} id="plus">
        +
      </button>
      <button onClick={onClickButtons} id="minus">
        -
      </button>
    </div>
  );
}
