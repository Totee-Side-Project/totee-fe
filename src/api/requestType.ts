export interface IPostRequestDto {
  title: string; // 제목
  content: string; // 내용,
  contactLink: string; // 연락 링크,
  contactMethod: string; // 연락 방법,
  detailedRegion: string; // 상세주소,
  onlineOrOffline: string; // 미팅 방식 (온라인 or 오프라인),
  region: string; // 지역,
  period: string; // 예상 기간 (ex 1개월 미만 or 1~3개월 or 3~6개월 or 6개월 이상),
  recruitNum: string; // 모집 인원 수,
  skillList: string[]; // 기술 스택 리스트 (ex JavaScript, C, Java),
}

export interface PostRequestDto extends IPostRequestDto {
  [key: string]: string | string[];
}

export interface IPostTeamRequestFormData {
  accept: boolean;
  nickname: string;
}
