import { EditModal } from '@components/atoms/Modal/EditModal';
import { Select } from '../Select/Select';
import React, { useEffect, useState } from 'react';

interface IEditPositionModalProps {
  isOpen: boolean;
  setIsOpen: (e: boolean) => void;
  user: {
    email: string;
    nickname: string;
    position: string;
    profileImageUrl: string;
    roleType: string;
  };
}

export function EditPositionModal({
  isOpen,
  setIsOpen,
  user,
}: IEditPositionModalProps) {
  const [values, setValues] = useState({
    position: '',
  });

  useEffect(() => {
    if (!isOpen) {
      setValues({
        position: '',
      });
    }
  }, [isOpen]);

  const positionList: any = {
    프론트엔드: 'FRONT_END',
    백엔드: 'BACK_END',
    ML: 'ML',
    게임: 'GAME',
    안드로이드: 'ANDROID',
    IOS: ' IOS',
    디자인: 'DESIGN',
    기타: 'OTHERS',
  };

  useEffect(() => {
    let positionKey;
    for (const [key, value] of Object.entries(positionList)) {
      if (value === user.position) {
        positionKey = key;
      }
    }
    setValues({
      position: positionKey as string,
    });
  }, [user]);

  return (
    <>
      <EditModal isOpen={isOpen} setIsOpen={setIsOpen}>
        <section>
          <div className="edit_Position_Wrapper">
            <div className="edit_Position_title">나의 포지션을 수정할까요?</div>
            <div className="edit_Position_subTitle">
              사용하실 프로필 사진과 닉네임을 입력해주세요.
            </div>
            <div className="edit_Position_label">포지션</div>
            <div className="edit_Position_selectBoxWrapper">
              <Select
                variable={'포지션'}
                values={values}
                setValues={setValues}
                optionData={Object.keys(positionList)}
              />
              {/* <select className="edit_Position_select">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select> */}
            </div>
          </div>
          <div className="edit_myBtnWrapper">
            <div className="edit_myEditBtn">수정</div>
            <div
              className="edit_myCancelBtn"
              onClick={() => setIsOpen(!isOpen)}
            >
              취소
            </div>
          </div>
        </section>
      </EditModal>
    </>
  );
}
