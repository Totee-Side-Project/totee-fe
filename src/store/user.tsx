import { atom, selector } from 'recoil';

export const defaultUserState = {
  email: '',
  nickname: '',
  position: '',
  profileImageUrl: '',
  backgroundImageUrl: '',
  roleType: '',
  intro: '',
};

export const UserState = atom({
  key: 'userState',
  default: { ...defaultUserState },
});

export const UserSelector = selector({
  key: 'userSelector',
  get: ({ get }) => {
    const user = get(UserState);
    return user;
  },
});
