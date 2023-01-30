import DetailedMemberModal from '@components/domains/myPage/common/DetailedMemberModal';
import StudyCards from '@components/domains/myPage/common/StudyCards';
import { queryKeys } from '@hooks/query';
import {
  useGetMyStudyPost,
  useGetStudyMembers,
} from '@hooks/query/useGetQuery';
import { useResignateTeam } from '@hooks/query/useMutateQuery';
import { useMemberModal } from '@hooks/useMemberModal';
import { useGetUserActivity } from '@hooks/useGetUserActivity';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import classes from '../../../common/DetailedMemberModal/index.module.scss';

const OpenedStudyAdministration = () => {
  const { data } = useQuery(queryKeys.user);
  const user = data?.data.body.data;

  const { posts, members, currentPostId, setCurrentPostId } =
    useGetUserActivity(useGetMyStudyPost, useGetStudyMembers);

  const { isOpenedModal, setIsOpenedModal, currentMember, onClickMemberCard } =
    useMemberModal();

  const {
    mutate: resignateStudyTeam,
    isSuccess: isSuccessStudyTeamResignation,
  } = useResignateTeam(
    currentPostId,
    currentMember ? currentMember.nickname : '',
  );

  useEffect(() => {
    setIsOpenedModal(false);
  }, [isSuccessStudyTeamResignation]);

  return (
    <>
      <StudyCards
        postSectionTitle="내가 개설한 스터디"
        posts={posts}
        memberSectionTitle="현재 스터디 멤버"
        members={members}
        setCurrentPostId={setCurrentPostId}
        onClickMemberCard={onClickMemberCard}
      />
      <DetailedMemberModal
        title="스터디 멤버"
        subTitle="스터디 멤버와 자기 소개입니다."
        member={currentMember}
        isOpenedModal={isOpenedModal}
        setIsOpenedModal={setIsOpenedModal}
      >
        {user.nickname !== currentMember?.nickname && (
          <button
            className={classes.resignateButton}
            onClick={() => resignateStudyTeam()}
          >
            추방하기
          </button>
        )}
      </DetailedMemberModal>
    </>
  );
};

export default OpenedStudyAdministration;
