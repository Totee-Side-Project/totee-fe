import StudyPostCard from '@components/domains/myPage/common/StudyPostCard';
import { useGetMyStudyPost } from '@hooks/query/useGetQuery';
import classes from '../../index.module.scss';

const OpenedStudyAdministration = () => {
  const { data } = useGetMyStudyPost();

  return (
    <>
      <p className={classes.title}>내가 개설한 스터디</p>
      <StudyPostCard data={data} />
      <div className={classes.horizontal} />
      <p className={classes.title}>현재 스터디 멤버</p>
    </>
  );
};

export default OpenedStudyAdministration;
