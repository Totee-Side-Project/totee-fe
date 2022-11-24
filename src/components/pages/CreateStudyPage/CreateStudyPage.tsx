import Banner from '../../../assets/svg/Study Banner.svg';
import { CreateStudy } from '@components/organism/CreateStudy/CreateStudy';
// 클릭한 값 보여주기

function CreateStudyPage() {
  return (
    <>
      <img src={Banner} alt="스터디 배너" style={{ width: '100%' }} />
      <CreateStudy />
    </>
  );
}

export default CreateStudyPage;
