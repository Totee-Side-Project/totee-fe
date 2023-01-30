import classes from './index.module.scss';
import StudyMemberCard from './StudyMemberCard';
import StudyPostCard from './StudyPostCard';

interface IStudyCardsProps {
  postSectionTitle: string;
  posts: any;
  memberSectionTitle?: string;
  members?: any;
  setCurrentPostId?: React.Dispatch<React.SetStateAction<number>>;
  onClickMemberCard?: any;
}

const StudyCards = ({
  postSectionTitle,
  posts,
  memberSectionTitle,
  members,
  setCurrentPostId,
  onClickMemberCard,
}: IStudyCardsProps) => {
  if (!posts) {
    return <>정보 없음</>;
  }

  return (
    <>
      <p className={classes.title}>{postSectionTitle}</p>
      <StudyPostCard posts={posts} setCurrentPostId={setCurrentPostId} />
      <div className={classes.horizontal} />
      <p className={classes.title}>{memberSectionTitle}</p>
      <StudyMemberCard
        members={members}
        onClickMemberCard={onClickMemberCard}
      />
    </>
  );
};

export default StudyCards;
