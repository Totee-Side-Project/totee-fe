import { atom, selector } from 'recoil';

export interface IApplyForm {
  page: number;
  field: string;
  career: string;
  contact: string;
  portfolioUrl: string;
  comment: string;
  error: string;
}

export const applyForm = atom<IApplyForm>({
  key: 'applyInfo',
  default: {
    page: 1,
    field: '',
    career: '',
    contact: '',
    portfolioUrl: '',
    comment: '',
    error: '',
  },
});
