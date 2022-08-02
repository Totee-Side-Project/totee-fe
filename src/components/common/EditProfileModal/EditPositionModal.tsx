import { EditModal } from '@components/atoms/Modal/EditModal';
import { Select } from '../Select/Select';
import React, { useEffect, useState } from 'react';
import { positionList } from '@utils/position.const';
type valueType = {
  backgroundImage: string;
  intro: string;
  newNickname: string;
  nickname: string;
  position: string;
  profileImage: string;
};
interface IEditPositionModalProps {
  isOpen: boolean;
  setIsOpen: (e: boolean) => void;
  values: valueType;
  setValues: (e: any) => void;
}

export function EditPositionModal({
  isOpen,
  setIsOpen,
  values,
  setValues,
}: IEditPositionModalProps) {
  const [tempValues, setTempValues] = useState<valueType>();
  // useEffect(() => {
  //   if (!isOpen) {
  //     handleInitialData();
  //   }
  // }, [isOpen]);

  useEffect(() => {
    setTempValues(values);
  }, [values]);

  return (
    <>
      <EditModal isOpen={isOpen} setIsOpen={setIsOpen}>
        <section>
          <div className="edit_Position_Wrapper">
            <div className="edit_Position_title">나의 포지션을 수정할까요?</div>
            <div className="edit_Position_subTitle">
              변경할 포지션을 선택해주세요.
            </div>
            <div className="edit_Position_label">포지션</div>
            <div className="edit_Position_selectBoxWrapper">
              <Select
                variable={'포지션'}
                values={tempValues}
                setValues={setTempValues}
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
            <div
              className="edit_myEditBtn"
              onClick={() => {
                setValues(tempValues);
                setIsOpen(!isOpen);
              }}
            >
              수정
            </div>
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
