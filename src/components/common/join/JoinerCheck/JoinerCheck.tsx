import { JoinModal } from '@components/common/join/Modal/JoinModal';
import OwnerJoinerCheck from '@components/common/join/OwnerJoinerCheck/OwnerJoinerCheck';
import { useGetApplicant, useGetPostByPostId } from '@hooks/useGetQuery';
import { UserState } from '@store/user';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import './joinerCheck.scss';

function JoinerCheck() {
  const [isOpenJoinModal, setIsOpenJoinModal] = useState(false);
  const userState = useRecoilValue(UserState);
  const { id } = useParams();

  if (!id) return <div>올바른 접속이 아닙니다.</div>;

  const { data: postData, status: postDataStatus } = useGetPostByPostId(
    Number(id),
  );
  const { data: applicantData, status: applicantDataStatus } = useGetApplicant(
    Number(id),
  );

  if (postDataStatus === 'loading') return <div>loading...</div>;

  return (
    <div className="JoinWrapper">
      {userState.nickname !== postData.data.body.data.nickname && (
        <div className="Status_Wrapper">
          <div className="Status_Profile">
            <div
              style={{
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
              }}
            />
          </div>
          <div className="Status_Box">
            <div className="Status_Title">지원 현황</div>
            <div className="Status_Title_Line" />
            <div className="Status_AllApplicant">전체 지원자수</div>
            <div className="Status_Count">N명</div>
            <button
              className="Status_Btn"
              onClick={() => setIsOpenJoinModal(true)}
            >
              지원 하기
            </button>
            <JoinModal
              isOpen={isOpenJoinModal}
              setIsOpen={setIsOpenJoinModal}
              postId={id}
            />
          </div>
        </div>
      )}
      {userState.nickname === postData.data.body.data.nickname && (
        <OwnerJoinerCheck />
      )}
    </div>
  );
}

export default JoinerCheck;
