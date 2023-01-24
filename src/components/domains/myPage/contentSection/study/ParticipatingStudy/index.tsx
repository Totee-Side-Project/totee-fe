import StudyPostCard from '@components/domains/myPage/common/StudyPostCard';
import { useGetParticipatingStudyPost } from '@hooks/query/useGetQuery';
import classes from '../../index.module.scss';

const ParticipatingStudy = () => {
  const { data } = useGetParticipatingStudyPost();

  return (
    <>
      <p className={classes.title}>내가 참여 중인 스터디</p>
      <StudyPostCard data={data} />
      <div className={classes.horizontal} />
      <p className={classes.title}>현재 스터디 멤버</p>
    </>
  );
};

export default ParticipatingStudy;
