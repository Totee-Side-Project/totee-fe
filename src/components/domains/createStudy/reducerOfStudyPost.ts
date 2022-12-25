import { PostRequestDto } from 'types/api.types';

export const defaultForm: PostRequestDto = {
  title: '', // 제목
  content: '', // 내용,
  contactLink: '', // 연락 링크,
  contactMethod: '', // 연락 방법,
  detailedRegion: '', // 상세주소,
  onlineOrOffline: '', // 미팅 방식 (온라인 or 오프라인),
  region: '', // 지역,
  period: '', // 예상 기간 (ex 1개월 미만 or 1~3개월 or 3~6개월 or 6개월 이상),
  recruitNum: '', // 모집 인원 수,
  skillList: [], // 기술 스택 리스트 (ex JavaScript, C, Java),
};

export const reducerOfStudyPost = (
  state = defaultForm,
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
