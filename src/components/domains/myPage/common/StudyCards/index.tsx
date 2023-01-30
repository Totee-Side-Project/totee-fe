import { IMemberType } from 'types/member.types';
import { IPostsType } from 'types/posts.types';
import classes from './index.module.scss';
import StudyMemberCard from './StudyMemberCard';
import StudyPostCard from './StudyPostCard';

interface IStudyCardsProps {
  postSectionTitle: string;
  posts: IPostsType;
  memberSectionTitle?: string;
  members?: IMemberType[];
  setCurrentPostId?: React.Dispatch<React.SetStateAction<number>>;
  onClickMemberCard?: (member: IMemberType) => void;
}

const StudyCards = ({
  postSectionTitle,
  posts,
  memberSectionTitle,
  members,
  setCurrentPostId,
  onClickMemberCard,
}: IStudyCardsProps) => {
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
