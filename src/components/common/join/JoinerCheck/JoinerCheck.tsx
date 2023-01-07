import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { JoinModal } from '@components/common/join/Modal/JoinModal';
import OwnerJoinerCheck from '@components/common/join/OwnerJoinerCheck/OwnerJoinerCheck';
import { SignInModal } from '@components/common/onboard/OnboardModal/SignInModal';
import { useGetApplicant, useGetPostByPostId } from '@hooks/query/useGetQuery';
import { UserState } from '@store/user';
import {
  OverLimitIcons,
  UnOverLimitIcons,
} from '@components/atoms/SkillIcon/SkillIcons';

import './joinerCheck.scss';

function JoinerCheck() {
  const [isOpenJoinModal, setIsOpenJoinModal] = useState(false);
  const [isSignInModal, setIsSignInModal] = useState(false);
  const userState = useRecoilValue(UserState);
  const { id } = useParams();

  // if (!id) return <div>올바른 접속이 아닙니다.</div>;

  const { data: postData, status: postDataStatus } = useGetPostByPostId(
    Number(id),
  );
  const { data: applicantData, status: applicantDataStatus } = useGetApplicant(
    Number(id),
  );

  const onClickWithBeforeLogin = () => {
    if (!userState.nickname) {
      setIsSignInModal(true);
      return;
    }
    setIsOpenJoinModal(true);
  };
  if (postDataStatus === 'loading') return <div>loading...</div>;
  if (postDataStatus === 'success' && applicantDataStatus === 'success')
    return (
      <div className="JoinWrapper">
        {userState.nickname !== postData?.data.body.data.nickname && (
          <div className="Status_Wrapper">
            <div className="Status_Profile">
              <img
                src={postData?.data.body.data.imageUrl}
                alt="post_author_img"
              />
            </div>
            <div className="Status_Box">
              <div className="Status_Title">지원 현황</div>
              <div className="Status_Title_Line" />
              <div className="Status_AllApplicant">현재 지원자수</div>
              <div className="Status_Count">
                {applicantData?.data.body.data.length}명
              </div>
              <div>
                {applicantData?.data.body.data.length >= 4 ? (
                  <OverLimitIcons
                    list={applicantData?.data.body.data.map(
                      ({ profileImg }) => profileImg,
                    )}
                    limit={4}
                  />
                ) : (
                  <UnOverLimitIcons
                    list={applicantData?.data.body.data.map(
                      ({ profileImg }) => profileImg,
                    )}
                  />
                )}
                {/* <ul className="Status_Applicant_imgs">
                  {applicantData?.data.body.data.map(
                    ({ nickname, profileImg }) => (
                      <li key={nickname} className="Status_Applicant_img">
                        <NewIcon src={profileImg} alt="profile_img" />
                      </li>
                    ),
                  )}
                </ul> */}
              </div>
              <div className="Status_Title_Lint_Soft" />
              <div>
                <ul className="Status_Applicant_imgs">
                  {postData?.data?.body.data.skillList.length >= 4 ? (
                    <OverLimitIcons
                      list={postData?.data.body.data.skillList}
                      limit={4}
                    />
                  ) : (
                    <UnOverLimitIcons
                      list={postData?.data.body.data.skillList}
                    />
                  )}
                  {/* {postData?.data.body.data.skillList.map((skill) => (
                    <SkillIcon key={skill} skill={skill} />
                  ))} */}
                </ul>
              </div>
              <button className="Status_Btn" onClick={onClickWithBeforeLogin}>
                지원 하기
              </button>
              <JoinModal
                isOpen={isOpenJoinModal}
                setIsOpen={setIsOpenJoinModal}
                postId={id as string}
              />
            </div>
          </div>
        )}
        {userState.nickname === postData?.data.body.data.nickname && (
          <OwnerJoinerCheck />
        )}
        <SignInModal isOpen={isSignInModal} setIsOpen={setIsSignInModal} />
      </div>
    );

  return null;
}

export default JoinerCheck;
