import { Dispatch, ReactNode, SetStateAction } from 'react';

export interface IApplyMentorModal {
  isShow: boolean;
  setIsShow: Dispatch<SetStateAction<boolean>>;
}

export interface ICommonForm {
  children: ReactNode;
  setIsShow: Dispatch<SetStateAction<boolean>>;
}
