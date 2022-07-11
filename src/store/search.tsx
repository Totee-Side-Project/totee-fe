import {atom, selector} from "recoil";
import {IPostType} from 'types/post.types';

export const searchState = atom<IPostType[] | null>({
    key: 'searchState',
    default: null
  });