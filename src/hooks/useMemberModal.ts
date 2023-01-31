import { IMemberType } from '@api/team/types';
import { useState } from 'react';

export const useMemberModal = () => {
  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const [currentMember, setCurrentMember] = useState<IMemberType>();

  const onClickMemberCard = (member: IMemberType) => {
    setIsOpenedModal(true);
    setCurrentMember(member);
  };

  return { isOpenedModal, setIsOpenedModal, currentMember, onClickMemberCard };
};
