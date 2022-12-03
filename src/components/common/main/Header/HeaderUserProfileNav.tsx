import { useOutsideAlerter } from '@hooks/useOutsideAlerter';
import { UserState } from '@store/user';
import { useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { HeaderDropDown } from '../DropDown/UserDropDown';
import { ToggleIcon } from '../ToggleIcon/ToggleIcon';

export const HeaderUserProfileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef(null);
  const user = useRecoilValue(UserState);
  const toggle = () => setIsOpen((pre) => !pre);
  const close = () => setIsOpen(false);
  useOutsideAlerter(toggleRef, close);

  return (
    <div ref={toggleRef}>
      <ToggleIcon
        imageUrl={user.profileImageUrl}
        style={{ width: '65px', height: '65px' }}
        onClick={toggle}
      />
      <HeaderDropDown isOpen={isOpen} close={close} />
    </div>
  );
};
