import StudyPostCard from '@components/domains/myPage/common/StudyPostCard';
import { useGetPostLikeList } from '@hooks/query/useGetQuery';
import classes from '../../index.module.scss';

const FavoriteStudyList = () => {
  const { data } = useGetPostLikeList();

  return (
    <>
      <p className={classes.title}>내가 관심목록에 추가한 스터디</p>
      <StudyPostCard data={data} />
      <div className={classes.horizontal} />
    </>
  );
};

export default FavoriteStudyList;
