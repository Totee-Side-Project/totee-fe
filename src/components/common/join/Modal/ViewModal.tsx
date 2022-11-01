import React from 'react';
import { Button, Modal } from '@components/atoms';
import './JoinerViewModal.scss';

interface IViewModalProps {
  isOpen: boolean;
  setIsOpen: (e: boolean) => void;
}

export function ViewModal({ isOpen, setIsOpen }: IViewModalProps) {
  return (
    <>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="ApplyModalWrapper">
          {/*<section className="ApplyModalWrapper">*/}
          <div className="ApplyTitle">지원자 보기</div>
          <div className="SubTitle">지원자의 승인여부를 결정해주세요.</div>
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
            <div className="BtnWrapper">
              <Button
                text="승인 거부"
                style={{
                  color: '#fff',
                  width: '210px',
                  backgroundColor: '#568A35',
                  margin: '30px auto 0 auto',
                }}
              ></Button>
              <Button
                text="승인 허용"
                style={{
                  color: '#fff',
                  width: '210px',
                  backgroundColor: '#568A35',
                  margin: '30px auto 0 auto',
                }}
              ></Button>
            </div>
            {/*<a style={{ display: 'none' }}></a>*/}
            {/*<a style={{ display: 'none' }}></a>*/}
          </div>
          {/*</section>*/}
        </div>
      </Modal>
    </>
  );
}
