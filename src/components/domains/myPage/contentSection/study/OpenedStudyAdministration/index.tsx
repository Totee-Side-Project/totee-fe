import DetailedStudyMemberModal from '@components/domains/myPage/common/DetailedStudyMemberModal';
import CardsSection from '@components/domains/myPage/common/CardsSection';
import {
  useGetMyStudyPosts,
  useGetStudyMembers,
} from '@hooks/query/useGetQuery';
import { useResignateStudyMember } from '@hooks/query/useMutateQuery';
import { useMemberModal } from '@hooks/useMemberModal';
import { useGetUserActivity } from '@hooks/useGetUserActivity';
import MemberResignationButton from '@components/domains/myPage/common/MemberResignationButton';
import { IStudyMemberType } from '@api/team/types';
import { useEffect } from 'react';

const OpenedStudyAdministration = () => {
  const { posts, members, currentPostId, setCurrentPostId } =
    useGetUserActivity(useGetMyStudyPosts, useGetStudyMembers);

  const { isOpenedModal, setIsOpenedModal, currentMember, onClickMemberCard } =
    useMemberModal<IStudyMemberType>();

  const { mutate: onClickResignateButton, isSuccess } = useResignateStudyMember(
    currentPostId,
    currentMember ? currentMember.nickname : '',
  );

  useEffect(() => {
    if (isSuccess) {
      setIsOpenedModal(false);
    }
  }, [isSuccess]);

  return (
    <>
      <CardsSection
        postSectionTitle="내가 개설한 스터디"
        studyPosts={posts}
        memberSectionTitle="현재 스터디 멤버"
        members={members}
        setCurrentPostId={setCurrentPostId}
        onClickStudyMemberCard={onClickMemberCard}
      />
      <DetailedStudyMemberModal
        title="스터디 멤버"
        subTitle="스터디 멤버와 자기 소개입니다."
        member={currentMember}
        isOpenedModal={isOpenedModal}
        setIsOpenedModal={setIsOpenedModal}
      >
        <MemberResignationButton
          onClickResignateButton={onClickResignateButton}
          currentMember={currentMember}
        />
      </DetailedStudyMemberModal>
    </>
  );
};

export default OpenedStudyAdministration;
