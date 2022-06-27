import React, { useState } from 'react';
import { Modal } from '@components/atoms';

export function OnboardModal() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpenModal(!isOpenModal)}>모달버튼</button>
      <Modal isOpen={isOpenModal}>
        <div
          style={{ width: '100px', height: '100px', backgroundColor: '#fff' }}
        >
          온보딩 모달
        </div>
      </Modal>
    </>
  );
}
