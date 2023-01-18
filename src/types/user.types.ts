export type User = {
  backgroundImageUrl: string;
  email: string;
  intro: string;
  nickname: string;
  position: string;
  profileImageUrl: string;
  roleType: string;
};

export type UpdateUser = {
  backgroundImage: any;
  email: string;
  intro: string;
  nickname: string;
  position: string;
  profileImage: any;
  roleType: string;
  keepProfileImage?: 'Y' | 'N';
  keepBackgroundImage?: 'Y' | 'N';
};

// 서버에서 User 정보 받아오는 값 아래와 같이 변경되었음
// 위에 코드들은 다른 곳에서 사용중인 것 같아서 일단 기존 코드 수정 안함, 추후 수정 필요한 부분
export type UserType = {
  email: string;
  intro: string;
  nickname: string;
  position: string;
  profileImageUrl: string;
  roleType: string;
  mentoringNum: number;
  studyNum: number;
};
