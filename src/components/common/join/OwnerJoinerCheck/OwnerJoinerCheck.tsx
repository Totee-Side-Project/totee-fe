import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { SkillIcon } from '@components/atoms/SkillIcon/SkillIcon';
import { useGetApplicant } from '@hooks/query/useGetQuery';
import { STUDY_MAX_LIMIT } from 'constants/studyLimit';

import { ViewModal } from '../Modal/ViewModal';
import './ownerJoinerCheck.scss';
import { IStudyMemberType } from '@api/team/types';

const VIEW_LIMIT_APPLICANT = 4;

function OwnerJoinerCheck() {
  const { id } = useParams();
  const [isOpenApplyStatusModal, setIsOpenApplyStatusModal] = useState(false);
  const [pickApplicant, setPickApplicant] = useState<IStudyMemberType>({
    applicationDate: '',
    email: '',
    message: '',
    nickname: '',
    position: '',
    profileImg: '',
  });
  const [isFull, setIsFull] = useState(false);
  const { data: applicantData, status: applicantDataStatus } = useGetApplicant(
    Number(id),
  );
  const onClickApplicantBox = (applicant: IStudyMemberType) => {
    setPickApplicant((pre) => ({ ...pre, ...applicant }));
    setIsOpenApplyStatusModal(true);
  };

  if (applicantDataStatus === 'success') {
    const applicants = applicantData;

    return (
      <>
        <div className="StatusM_Wrapper">
          <div className={`StatusM_Box ${isFull && 'StatusM_Full'}`}>
            <div className="StatusM_Title">스터디 참여자 수</div>
            <div className="StatusM_Count">
              {applicants.length}명 / {STUDY_MAX_LIMIT}명
            </div>
            <div className="StatusM_Title_Line" />
            <div className={`StatusM_Contents ${isFull && 'StatusM_Full'}`}>
              {applicants.map((applicant) => (
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
            </div>
            {applicants.length > VIEW_LIMIT_APPLICANT && (
              <button
                className="StatusM_Btn"
                onClick={() => setIsFull((pre) => !pre)}
              >
                {isFull ? '접기' : '전체 확인하기'}
              </button>
            )}
          </div>
        </div>
        <ViewModal
          isOpen={isOpenApplyStatusModal}
          setIsOpen={setIsOpenApplyStatusModal}
          applicant={pickApplicant}
        ></ViewModal>
      </>
    );
  }

  return null;
}

export default OwnerJoinerCheck;
