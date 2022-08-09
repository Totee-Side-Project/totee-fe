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
  profileImage: any,
  roleType: string;
  keepProfileImage? : "Y" | "N";
  keepBackgroundImage? : "Y" | "N";
};
