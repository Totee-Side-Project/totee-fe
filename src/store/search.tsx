import { IStudySearchType } from '@api/post/types';
import { atom } from 'recoil';

export const searchState = atom<IStudySearchType>({
  key: 'searchState',
  default: {
    data: [],
    keyword: '',
  },
});
