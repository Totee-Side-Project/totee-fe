import { PostRequestDto } from '@api/requestType';
import { title } from 'process';

const defaultState: PostRequestDto = {
  title: '',
  content: '',
  contactLink: '',
  contactMethod: '',
  detailedRegion: '',
  onlineOrOffline: '',
  region: '',
  period: '',
  recruitNum: 0,
  skillList: [],
};

export const reducerOfStudyPost = (
  state = defaultState,
  action: {
    payload: any;
    type: keyof PostRequestDto;
  },
) => {
  const { payload, type } = action;
  switch (type) {
    case type:
      return { ...state, ...{ [type]: payload } };
    default:
      throw new Error('not matched action type');
  }
};
