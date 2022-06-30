import React from 'react';
import { Counter, Modal } from '@components/atoms';
import { OnboardModal } from '@components/common';

export function MainPage() {
  return (
    <div>
      <h1>리코일 테스트 페이지 입니다.</h1>
      <Counter></Counter>
      <OnboardModal />
    </div>
  );
}
