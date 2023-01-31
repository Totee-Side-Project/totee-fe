import { ISearchType } from '@api/post/types';
import { atom } from 'recoil';

export const searchState = atom<ISearchType>({
  key: 'searchState',
  default: {
    data: null,
    keyword: '',
  },
});
