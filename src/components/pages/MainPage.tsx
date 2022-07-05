import React from 'react';
import { Counter, Modal } from '@components/atoms';
import { Banner, Categories, OnboardModal, Search } from '@components/common';
import Header from '@components/header';
import LoginButton from '@components/login/LoginButton';

export function MainPage() {
  return (
    <div>
      <Banner />
      <Search />
      <Categories />
      {/* <div style={{height:"1000px"}}>
      <h1>리코일 테스트 페이지 입니다.</h1>
      <OnboardModal />
      </div>
      <LoginButton /> */}
    </div>
  );
}
