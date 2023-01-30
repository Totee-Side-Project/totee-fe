import { useState } from 'react';

export const useMemberModal = () => {
  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const [currentMember, setCurrentMember] = useState({});

  const onClickMemberCard = (member) => {
    setIsOpenedModal(true);
    setCurrentMember(member);
  };

  return { isOpenedModal, setIsOpenedModal, currentMember, onClickMemberCard };
};
