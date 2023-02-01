export type PostsSortOptionNameType =
  | 'recent'
  | 'commentNum'
  | 'likeNum'
  | 'view';
export type MentoringSortOptionsType = 'recent' | 'likeNum';

export type IPostsSortOptions = Record<PostsSortOptionNameType, string>;
export type IMentoringSortOptions = Record<MentoringSortOptionsType, string>;
