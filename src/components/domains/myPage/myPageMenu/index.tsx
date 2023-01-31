import OpenedBookIconSrc from '../../../../assets/svg/book-open.svg';
import GraduationHatIconSrc from '../../../../assets/svg/graduation-hat.svg';
import OpenedStudyAdministration from '../contentSection/study/openedStudyAdministration';
import StudyApplicantConfirmation from '../contentSection/study/studyApplicantConfirmation';
import ParticipatingStudy from '../contentSection/study/participatingStudy';
import FavoriteStudyList from '../contentSection/study/FavoriteStudyList';
import OpenedMentoringAdminsitration from '../contentSection/mentoring/openedMentoringAdministration';
import MentoringApplicantConfirmation from '../contentSection/mentoring/mentoringApplicantConfirmation';
import ParticipatingMentoring from '../contentSection/mentoring/participatingMentoring';
import FavoriteMentoringList from '../contentSection/mentoring/favoriteMentoringList';

export interface IDefaultFocusMenuType {
  mainMenuTitle: string;
  subMenuTitle: string;
  component: JSX.Element;
}

const studyMenu = {
  mainMenu: { title: '스터디', iconSrc: OpenedBookIconSrc },
  subMenus: [
    { title: '개설한 스터디 관리', component: <OpenedStudyAdministration /> },
    {
      title: '스터디 지원자 확인',
      component: <StudyApplicantConfirmation />,
    },
    { title: '참여 중인 스터디', component: <ParticipatingStudy /> },
    { title: '관심 목록', component: <FavoriteStudyList /> },
  ],
};

const mentoringMenu = {
  mainMenu: { title: '멘토·멘티', iconSrc: GraduationHatIconSrc },
  subMenus: [
    {
      title: '개설한 멘토링 관리',
      component: <OpenedMentoringAdminsitration />,
    },
    {
      title: '멘토링 지원자 확인',
      component: <MentoringApplicantConfirmation />,
    },
    { title: '수강 중인 멘토링', component: <ParticipatingMentoring /> },
    { title: '관심 목록', component: <FavoriteMentoringList /> },
  ],
};

export const defaultFocusMenu: IDefaultFocusMenuType = {
  mainMenuTitle: studyMenu.mainMenu.title,
  subMenuTitle: studyMenu.subMenus[0].title,
  component: studyMenu.subMenus[0].component,
};

export const myPageMenu = [studyMenu, mentoringMenu];
