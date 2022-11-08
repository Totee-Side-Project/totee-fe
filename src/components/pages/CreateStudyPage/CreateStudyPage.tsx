// import { EditStudyPage } from '@components/organism';
// import { Banner } from '@components/common';
import Banner from '../../../assets/svg/Study Banner.svg';
import { CreateStudy } from '@components/organism/CreateStudy/CreateStudy';
// 클릭한 값 보여주기

function CreateStudyPage() {
  return (
    <>
      {/*<Banner />*/}
      <img src={Banner} alt="스터디 배너" />
      <CreateStudy />
    </>
  );
}

export default CreateStudyPage;
