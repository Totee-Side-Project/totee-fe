import {atom, selector} from "recoil";

export const defaultLoginState={
  state:false,
  token:""
}


export const loginState = atom({
  key: 'loginState',
  default: {...defaultLoginState}
});

export const modalState:any = atom({
  key: 'modalState',
  default: {
    modal:false
  }
});


export const LoginLabelSelector = selector({
  key: 'loginLabelSelector',
  get: ({ get }) => {
      const login = get(loginState);
      return `현재 로그인 상태는 ${login.state} 입니다.`;
  }
});