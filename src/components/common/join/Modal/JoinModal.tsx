import React from 'react';
import { Button, Modal } from '@components/atoms';
import './JoinModal.scss';

interface IJoinModalProps {
  isOpen: boolean;
  setIsOpen: (e: boolean) => void;
}

export function JoinModal({ isOpen, setIsOpen }: IJoinModalProps) {
  return (
    <>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="ApplyModalWrapper">
          {/*<section className="ApplyModalWrapper">*/}
          <div className="ApplyTitle">지원 하기</div>
          <div className="SubTitle">지원하실 포지션과 소개를 적어주세요.</div>
          <div>
            <div
              className="ApplyProfile"
              // style={{
              //   backgroundRepeat: 'no-repeat',
              //   backgroundSize: 'cover',
              // }}
            ></div>
            <div className="ApplyName">닉네임</div>
            <div className="ApplyEmail">dlapdlf@gmail.com</div>
            <textarea
              className="ApplyIntro"
              placeholder="본인에 대한 짧은 소개입니다. 본인에 대한 짧은 소개입니다. 본인에 대한 짧은 소개입니다. 본인에 대한 짧은 소개입니다."
            />
            <Button
              text="완료"
              style={{
                color: '#fff',
                width: '210px',
                backgroundColor: '#568A35',
                margin: '30px auto 0 auto',
              }}
            ></Button>
            {/*<a style={{ display: 'none' }}></a>*/}
            {/*<a style={{ display: 'none' }}></a>*/}
          </div>
          {/*</section>*/}
        </div>
      </Modal>
    </>
  );
}
