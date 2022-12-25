import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { IApplicantDetail } from 'types/api.types';
import { SkillIcon } from '@components/atoms/SkillIcon/SkillIcon';
import { useGetApplicant, useGetPostByPostId } from '@hooks/query/useGetQuery';
import { ViewModal } from '../Modal/ViewModal';
import './ownerJoinerCheck.scss';

function OwnerJoinerCheck() {
  const { id } = useParams();
  const [isOpenApplyStatusModal, setIsOpenApplyStatusModal] = useState(false);
  const [pickApplicant, setPickApplicant] = useState<IApplicantDetail>({
    nickname: '',
    email: '',
    message: '',
    applicationDate: '',
    profileImg: '',
  });
  const [isFull, setIsFull] = useState(false);

  const { data: postData, status: postDataStatus } = useGetPostByPostId(
    Number(id),
  );
  const { data: applicantData, status: applicantDataStatus } = useGetApplicant(
    Number(id),
  );

  const onClickApplicantBox = (applicant: IApplicantDetail) => {
    setPickApplicant((pre) => ({ ...pre, ...applicant }));
    setIsOpenApplyStatusModal(true);
  };

  if (applicantDataStatus === 'success') {
    return (
      <div className="StatusM_Wrapper">
        <div className={`StatusM_Box ${isFull && 'StatusM_Full'}`}>
          <div className="StatusM_Title">스터디 참여자 수</div>
          <div className="StatusM_Count">
            {applicantData?.data.body.data.length}명 / 10명
          </div>
          <div className="StatusM_Title_Line" />
          <div className={`StatusM_Contents ${isFull && 'StatusM_Full'}`}>
            {applicantData?.data.body.data.map((applicant) => (
              <div
                className="StatusM_NameBox"
                key={applicant.nickname}
                onClick={() => onClickApplicantBox(applicant)}
              >
                <SkillIcon
                  src={applicant.profileImg}
                  className={'StatusM_ProfileImg'}
                />

                <div className="StatusM_Name">{applicant.nickname}</div>
              </div>
            ))}
            <div className="StatusM_NameBox">
              <div className="StatusM_ProfileImg" />
              <div className="StatusM_Name">dummy data</div>
            </div>
            <div className="StatusM_NameBox">
              <div className="StatusM_ProfileImg" />
              <div className="StatusM_Name">dummy data</div>
            </div>
            <div className="StatusM_NameBox">
              <div className="StatusM_ProfileImg" />
              <div className="StatusM_Name">dummy data</div>
            </div>
            <div className="StatusM_NameBox">
              <div className="StatusM_ProfileImg" />
              <div className="StatusM_Name">dummy data</div>
            </div>
            <div className="StatusM_NameBox">
              <div className="StatusM_ProfileImg" />
              <div className="StatusM_Name">dummy data</div>
            </div>
          </div>
          <button
            className="StatusM_Btn"
            onClick={() => setIsFull((pre) => !pre)}
          >
            {isFull ? '접기' : '전체 확인하기'}
          </button>
        </div>
        <ViewModal
          isOpen={isOpenApplyStatusModal}
          setIsOpen={setIsOpenApplyStatusModal}
          applicant={pickApplicant}
        ></ViewModal>
      </div>
    );
  }

  return null;
}

export default OwnerJoinerCheck;
