import { atom } from 'recoil';
import { ISearchType } from 'types/api.types';

export const searchState = atom<ISearchType>({
  key: 'searchState',
  default: {
    data: null,
    keyword: '',
  },
});
