import PostCard from '@components/post/postCard';
import React from 'react';
import { Counter, Modal } from '@components/atoms';
import { OnboardModal } from '@components/common';
import Header from '@components/header';
import LoginButton from '@components/login/LoginButton';

export function MainPage() {
  return (
    <div>
      <PostCard />
      {/*<h1>리코일 테스트 페이지 입니다.</h1>*/}
      {/*<OnboardModal />*/}
      {/*<LoginButton />*/}
      {/*/!* <Modal>*/}
      {/*  <div>hi</div>*/}
      {/*</Modal> *!/*/}
    </div>
  );
}
