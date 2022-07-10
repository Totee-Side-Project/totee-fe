import React, { useRef } from 'react';
import { Button, Modal } from '@components/atoms';
import { ReactComponent as KakakoIcon } from '@assets/kakao-logo.svg';
import { ReactComponent as GoogleIcon } from '@assets/google-logo.svg';
import classes from './onboardmodal.module.scss';
import { GOOGLE_AUTH_URL, KAKAO_AUTH_URL } from '@api/api';

interface ISignInModalProps {
  isOpen: boolean;
  setIsOpen: (e: boolean) => void;
}

export function SignInModal({ isOpen, setIsOpen }: ISignInModalProps) {
  const googleLoginRef = useRef(null as any);
  const kakaoLoginRef = useRef(null as any);

  return (
    <>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <section className={classes.onboardModal}>
          <h1>
            <span>토티</span> 에 오신 것을 환경합니다.
          </h1>
          <h2>소셜 아이디로 쉽게 로그인해 보세요!</h2>
          <div className={classes.footer}>
            <Button
              text="구글로 로그인하기"
              style={{
                width: '210px',
                backgroundColor: '#fff',
                border: '2px solid #C9C9C9',
              }}
              icon={<GoogleIcon />}
              onClick={() => googleLoginRef.current.click()}
            ></Button>
            <a
              style={{ display: 'none' }}
              href={GOOGLE_AUTH_URL}
              ref={googleLoginRef}
            ></a>
            <Button
              text="카카오로 로그인하기"
              style={{
                width: '210px',
                backgroundColor: 'rgba(255, 232, 18, 1)',
              }}
              icon={<KakakoIcon />}
              onClick={() => kakaoLoginRef.current.click()}
            ></Button>
            <a
              style={{ display: 'none' }}
              href={KAKAO_AUTH_URL}
              ref={kakaoLoginRef}
            ></a>
          </div>
        </section>
      </Modal>
    </>
  );
}
