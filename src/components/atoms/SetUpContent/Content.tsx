import { atom, selector } from 'recoil';

export const ContentState = atom({
  key: 'loginState',
  default: {
    state: false,
    token: '',
  },
});
