import { atom, selector } from 'recoil';
import { ISearchType } from 'types/post.types';

export const searchState = atom<ISearchType>({
  key: 'searchState',
  default: {
    data: null,
    keyword: '',
  },
});
