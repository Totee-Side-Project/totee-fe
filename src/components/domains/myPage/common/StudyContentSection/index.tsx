import classes from '../../contentSection/index.module.scss';
import StudyMemberCard from './StudyMemberCard';
import StudyPostCard from './StudyPostCard';

interface IStudyContentSectionProps {
  postSectionTitle: string;
  posts: any;
  memberSectionTitle?: string;
  members?: any;
  setCurrentPostId?: React.Dispatch<React.SetStateAction<number>>;
  onClickMemberCard?: any;
}

const StudyContentSection = ({
  postSectionTitle,
  posts,
  memberSectionTitle,
  members,
  setCurrentPostId,
  onClickMemberCard,
}: IStudyContentSectionProps) => {
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

export default StudyContentSection;
