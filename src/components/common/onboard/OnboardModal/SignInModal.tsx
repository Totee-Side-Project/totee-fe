import { useRef } from 'react';

import { Button, Modal } from '@components/atoms';
import { ReactComponent as KakakoIcon } from '@assets/svg/kakao-logo.svg';
import { ReactComponent as GoogleIcon } from '@assets/svg/google-logo.svg';
import { GOOGLE_AUTH_URL, KAKAO_AUTH_URL } from '@api/api';
import classes from './onboardmodal.module.scss';

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
            <span>토티</span> 에 오신 것을 환영합니다.
          </h1>
          <h2>소셜 아이디로 쉽게 로그인해 보세요!</h2>
          <div className={classes.footer}>
            <Button
              left={<GoogleIcon />}
              center="구글로 로그인하기"
              onClick={() => googleLoginRef.current.click()}
              style={{
                width: '210px',
                backgroundColor: '#fff',
                border: '2px solid #C9C9C9',
                color: '#1f1f1f',
              }}
            ></Button>
            <a
              style={{ display: 'none' }}
              href={GOOGLE_AUTH_URL}
              ref={googleLoginRef}
            ></a>
            <Button
              left={<KakakoIcon />}
              center="카카오로 로그인하기"
              onClick={() => kakaoLoginRef.current.click()}
              style={{
                width: '210px',
                backgroundColor: 'rgba(255, 232, 18, 1)',
                color: '#1f1f1f',
              }}
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
