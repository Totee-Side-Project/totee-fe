export const data: Idata = {
  checkboxOptions: ['온라인', '오프라인'],
  defaultFormElements: {
    period: ['진행기간', 'select', '선택'],
    recruitNum: ['모집인원', 'number', '최소 1명 ~ 최대 15명'],
    language: ['모집언어', 'multiSelect'],
    process: ['진행방식', 'checkbox'],
    region: ['진행지역', 'select', '선택'],
    detailedRegion: ['', 'text', '스터디룸의 상세 주소를 입력해주세요.'],
    contactMethod: ['연락방식', 'select', '선택'],
    contactLink: ['', 'text', '사용하실 연락 방식의 링크를 입력해주세요.'],
  },
  selectOptions: {
    period: ['1개월미만', '1~3개월', '3~6개월', '6개월이상'],
    contactMethod: ['카카오톡 오픈채팅', '이메일', '노션', '기타'],
    region: [
      '서울',
      '부산',
      '대구',
      '인천',
      '광주',
      '대전',
      '울산',
      '세종',
      '경기',
      '강원',
      '충북',
      '충남',
      '전북',
      '전남',
      '경북',
      '경남',
      '제주',
    ],
  },
  detailFormElements: {
    title: ['', 'text', '제목을 입력해주세요'],
    content: ['', 'textEditor'],
  },
};

export interface Idata {
  checkboxOptions: string[];
  defaultFormElements: {
    period: string[];
    recruitNum: string[];
    language: string[];
    process: string[];
    region: string[];
    detailedRegion: string[];
    contactMethod: string[];
    contactLink: string[];
  };
  selectOptions: { [key in string]: string[] };
  detailFormElements: {
    title: string[];
    content: string[];
  };
}
