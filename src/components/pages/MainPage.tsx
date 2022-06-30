import React from 'react';
import { Counter, Modal } from '@components/atoms';
import LoginButton from "@components/login/LoginButton";

export function MainPage() {
  return (
    <div>
      <h1>리코일 테스트 페이지 입니다.</h1>
      <LoginButton/>
      <Counter></Counter>
      {/* <Modal>
        <div>hi</div>
      </Modal> */}
    </div>
  );
}
