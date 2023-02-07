import { IMentoringMemberType, IStudyMemberType } from '@api/team/types';
import { useState } from 'react';

export const useMemberModal = <
  T extends IMentoringMemberType | IStudyMemberType,
>() => {
  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const [currentMember, setCurrentMember] = useState<T>();

  const onClickMemberCard = (member: T) => {
    setIsOpenedModal(true);
    setCurrentMember(member);
  };

  return { isOpenedModal, setIsOpenedModal, currentMember, onClickMemberCard };
};
